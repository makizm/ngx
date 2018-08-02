const LISTEN_PORT = 4000;
const GPIO_WAIT = 3000;
const AUTH_SECRET = "secret";

/**
 * Water valve pins on Raspberry PI board
 * These are physical pin #s on the header and
 * not GPIO name
 * Example: GPIO 23 is pin 16 so enter 16 for pin and 23 for gpio
 */
let VALVES = [ 
    { id: 1, pin: 16, gpio: 23, enabled: true }
]

const os = require('os');

// Check if running on Raspberry PI
// otherwise I2C and GPIO will throw error
if(os.arch() != 'arm') {
    throw new Error('GPIO is not available. You\'re not a Raspberry PI');   
}

const express = require('express');
const app = express();

// Middleware JSON body parser for express
const jBodyParser = require('body-parser').json();

const server = require('http').createServer(app);

const io = require('socket.io')(server);

const gpio = require('rpi-gpio');

const { Subject } = require('rxjs');

const GpioWatcher = require('./gpio-watcher').Watcher;

// subject consumed by Socket.io to notify subscribers
// with pin state changes
let PinStateUpdater = new Subject();

// global variable for GPIO waiting
let GpioWaitTimer = 0;

io.on('connection', function(socket) {  
    Trace('Socket.io client connected...');

    // Create event emitter for pin state change
    let subscription = PinStateUpdater.subscribe({
        next: (data) => {
            Trace("Notifying subscribers via subject, data follows")
            Trace(data);

            socket.emit("valvestate", data);
        }
    });

    // Unsubscribe on disconnect
    socket.on('disconnect', function(){
        subscription.unsubscribe();

        Trace('Socket.io client disconnected...');
    });
});

app.route('/').get((req, res) => {
    res.send({ message: "Welcome to API" });
});

app.get('/valve/:id', (req, res) => {
    // create log prefix
    let client = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let logPrefix = "GET request from " + client + " Pin, ";

    // get id parameter
    let id = Number(req.params["id"]) || 0;

    // check if valve is defined
    let valve = getValveById(id);

    // invalid pin value
    if(!valve) {
        Trace(logPrefix + "Invalid valve id");
        res.sendStatus(404);
        return false;
    }

    // check if GPIO is ready
    // otherwise return HTTP 429 Too many requests
    if(!gpioReady()) {
        res.sendStatus(429);
        Trace(logPrefix + "Too many requests");
        return false;
    }

    GetValveState(valve, (err, value) => {
        if(err) {
            res.sendStatus(500);
            Trace(err);
            return false;
        }

        Trace(logPrefix + id + " state is: " + value);
        res.send({ value: value.toString() });
    })
})

app.post('/valve/:id', jBodyParser, (req, res) => {
    // create loggin prefix
    let client = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let logPrefix = "POST request from " + client + " for Valve ";

    // must be authenticated
    if(req.headers['authorization'] != AUTH_SECRET) {
        Trace(logPrefix + id + " invalid Authorization header");
        res.sendStatus(401);
        return false;
    }

    // get id parameter
    let id = Number(req.params["id"]) || 0;

    // check if valve is defined
    let valve = getValveById(id);

    // invalid pin value
    if(!valve) {
        Trace(logPrefix + "Invalid valve id");
        res.sendStatus(404);
        return false;
    }

    // must containt value in message body
    if(req.headers['content-length'] == null) {
        Trace(logPrefix + id + " Content-Length can't be null");
        res.sendStatus(400);
        return false;
    }

    // content must be JSON
    if(req.headers['content-type'] != 'application/json') {
        Trace(logPrefix + id + " Content-Type must be JSON");
        res.sendStatus(400);
        return false;
    }

    let value = req.body['value'] || null;

    // value must be valid
    if(value != "on" && value != "off") {
        Trace(logPrefix + id + " Value is not valid. must be on/off: " + value);
        res.sendStatus(400);
        return false;
    }

    // only used for on action
    // run for specified amount of seconds then shut it off
    let runTime = Number(req.body['seconds']) || null;

    if(value == "on" && runTime > 10000) {
        // open water valve for provided amount of seconds
        runWater(valve, runTime, (err) => {
            if(err) {
                Trace(err);
                res.sendStatus(500);
                return false;
            }
    
            Trace(logPrefix + id + " opened for: " + runTime + " seconds");
            res.sendStatus(200);
        });
    } else {
        SetValveState(valve, value, (err) => {
            if(err) {
                Trace(err);
                res.sendStatus(500);
                return false;
            }
    
            Trace(logPrefix + id + " Value set to: " + value);
            res.sendStatus(200);
        });
    }
});

app.use(express.static(__dirname + '/node_modules'));

//app.get('/', function(req, res,next) {  
    //res.sendFile(__dirname + '/index.html');
//});

server.listen(LISTEN_PORT, () => {
    Trace('Server started on port ' + LISTEN_PORT);
});

/**
 * GetPinState callback function definition
 * @param {Error} error 
 * @param {Function} value on/off
 */
function GetPinStateCallback(error, value) {}

/**
 * Get Raspberry Pi GPIO value by supplied pin number
 * @param {number} pin GPIO pin number
 * @param {GetPinStateCallback} result callback function
 */
function GetValveState(valve, result) {
    gpioWait(() => {
        gpio.setup(valve.pin, (err) => {
            if(err) return result(err, null);
    
            gpio.read(valve.pin, (err, value) => {
                if(err) return result(err, null);
    
                // channel active state
                // true = on
                // false = off
                let out = value ? "on" : "off";
    
                return result(null, out);
            });
        });
    });
}

/**
 * SetPinState callback function definition
 * @param {Error} error 
 */
function SetPinStateCallback(error) {}

/**
 * Write to Raspberry Pi GPIO by supplied pin number
 * @param {*} valve valve
 * @param {string} state on/off
 * @param {SetPinStateCallback} result callback function
 */
function SetValveState(valve, state, result) {
    let value = (state === 'on');

    Trace("Change valve state pin " + valve.pin + " GPIO " + valve.gpio);

    gpioWait(() => {
        gpio.setup(valve.pin, gpio.DIR_OUT, (err) => {
            if(err) return result(err);

            gpio.write(valve.pin, value, (err) => {
                if(err) return result(err);

                return result(null);
            });
        });
    });
}

/**
 * Waiter used between each triggered gpio.setup() 
 * Too many client subsequent requests can cause "binding" error
 * @param {Function} execute
 */
function gpioWait(execute) {
    let timeout = GpioWaitTimer;

    Trace("Waiting " + timeout + " milliseconds");

    // wait until next gpio request can be issued
    // then run callback function and restart time
    setTimeout(() => {
        // run callback function
        execute();

        // start next timer
        gpioWaitTimerStart();
    }, timeout);
}

/**
 * Helper function to check when is safe to execute next
 * GPIO request
 * @returns {boolean}
 */
function gpioReady() {
    return (GpioWaitTimer <= 0);
}

/**
 * Countdown interval for GPIO wait timer
 */
function gpioWaitTimerStart() {
    let time = GPIO_WAIT;

    let runms = 100;

    let timer = setInterval(() => {
        time = time - runms;

        if(time <= 0) {
            // reset timer
            time = 0;
            clearInterval(timer);
        }

        // update global timer
        GpioWaitTimer = time;
    }, runms);
}

/**
 * Log server errors and messages
 * @param {any} error JavaScript Error or message
 * @param {string} level Logging level info, error (default info)
 */
function Trace(error, level) {
    let lvl = level ? level : "info";

    let prefix = "[ " + lvl + " ]";

    let msg = "";

    if(error['message']) {
        msg = error['message'];
        level = "error";
    } else {
        msg = error;
    }

    console.log(prefix + " - " + msg);
}

/**
 * Search configured valves by id
 * @param {string} id Valve id
 */
function getValveById(id) {
    return VALVES.find((valve) => valve.id == id)
}

// used to store timer in seconds how long the valve has been opened for
// this value will be used to close the valve when timeout exceeded
var VALVE_OPEN_TIME = 0;

/**
 * Open water valve for specified amound time in seconds
 * @param {*} valve 
 * @param {*} seconds 
 * @param {*} result 
 */
function runWater(valve, seconds, result) {
    SetValveState(valve, "on", (err => {
        if(!err) {
            VALVE_OPEN_TIME = seconds;

            let _valveOffTimer = setInterval(() => {
                --VALVE_OPEN_TIME
                Trace("Valve timer is now " + VALVE_OPEN_TIME)
            }, 1000);

            // create timer to close the valve
            setTimeout(() => {
                // turn off water valve
                SetValveState(valve, "off", (err2) => {
                    if(!err2) {
                        // reset timer
                        VALVE_OPEN_TIME = 0;

                        // stop the counter
                        clearInterval(_valveOffTimer);
                    }
                })
            }, seconds * 1000)

        }
    }))
}

function Setup() {
    VALVES.forEach(valve => {
        if(valve.enabled) {
            Trace("Setting up valve #" + valve.id);
            Trace("Valve pin " + valve.pin);
            Trace("Trace valve GPIO " + valve.gpio);
            // read config file
            // TBD

            // export pin
            gpio.setup(valve.pin, gpio.DIR_OUT, (err) => {
                if(err) throw err;
                Trace("Registering state listener for valve " + valve.id);

                // register value change listener
                let pinWatcher = new GpioWatcher(valve.gpio);

                pinWatcher.start((err, value) => {
                    // listener callback function
                    // this will be executed when state change is triggered
                    if(value) {
                        let newValue = { valve: valve.id, value: value }

                        // update subscribers with new value
                        PinStateUpdater.next(newValue);
                    }
                });
            });
        }
    })
}

// run setup on start
Setup();
