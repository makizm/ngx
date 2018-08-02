const LISTEN_PORT = 4001;
const UI_PORT = 4200;

const express = require('express');
const app = express();

const server = require('http').createServer(app);

const io = require('socket.io')(server);

const proxy = require('express-http-proxy');


const { Subject } = require('rxjs');

var sensors = {
    a1: 0,
    a2: 0,
    a3: 0,
    a4: 0
};

// Create subject to emit proxy events
var ioEventSubj = new Subject();

io.on('connection', function(socket) {  
    console.log('Socket.io client connected...');

    var routine;

    // Create proxy event emitter
    let subscription = ioEventSubj.subscribe({
        next: (data) => {
            console.log(data);

            socket.emit("sensors", data);
        }
    });

    // socket.on('join', function(data) {
    //     console.log(data);

        routine = setInterval(function() {
            sensors.a1 = getValue();
            sensors.a2 = getValue();
            sensors.a3 = getValue();
            sensors.a4 = getValue();

            ioEventSubj.next(sensors);
        }, 3000);

    // });

    // Unsubscribe on disconnect
    socket.on('disconnect', function(){
        clearInterval(routine);

        subscription.unsubscribe();
    });

});

function getValue(callback) {

    let min = 15;
    let max = 99;

    let value = Math.floor(Math.random() * (max - min + 1)) + min;

    if(callback) { 
        callback(value);
    } else {
        return value;
    }
}

app.route('/api').get((req, res) => {

    getValue(function(value) {
        if(value) {
            sensors.a1 = value;
            
            res.send(sensors);
        } else {
            res.sendStatus(204);
        }
    });

});

app.use(express.static(__dirname + '/node_modules'));

//app.get('/', function(req, res,next) {  
    //res.sendFile(__dirname + '/index.html');
//});

app.use('/valve/:id/:state', (req, res) => {
    let id = Number(req.params["id"]) || 0;
    let state = req.params["state"] || null;

    runWater(id, 15, () => {
        console.log("OK")

        res.sendStatus(200);
    })

});

app.use('/', proxy('localhost:' + UI_PORT));

server.listen(LISTEN_PORT, () => {
    console.log('Server started on port ' + LISTEN_PORT);
});

function SetValveState(valve, state, callback) {
    console.log("Setting valve " + valve + " state to " + state);

    callback(null);
}

function runWater(valve, seconds, result) {
    SetValveState(valve, "on", (err => {
        if(!err) {
            VALVE_OPEN_TIME = seconds;

            let _valveOffTimer = setInterval(() => {
                --VALVE_OPEN_TIME
                console.log("Valve timer is now " + VALVE_OPEN_TIME)
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
        
        result(err);
    }))
}
