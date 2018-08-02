const LISTEN_PORT = 4000;
const UI_PORT = 4200;

const I2C_ADDRESS = 0x04;
const CMD_READ = 0x00;

const I2C_SENSOR_A1 = 0xa1;

// Interval in seconds between data samples from I2C
// and updating Socket.io subscribers
const INTERVAL_SEC = 3;

const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const proxy = require('express-http-proxy');

var async = require('async');

const { Subject } = require('rxjs');

const os = require('os');

// Check if running on Raspberry PI
// otherwise I2C will throw error
if(os.arch() != 'arm') {
    // throw new Error('I2C is not available. You\'re not a Raspberry PI');  
    var i2c;  
} else {
    const i2c = require('i2c-bus');
}

var i2c1;

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

    let interval = INTERVAL_SEC * 1000;

    routine = setInterval(function() {
        sensors.a1 = getValue();
        // sensors.a2 = getValue();
        // sensors.a3 = getValue();
        // sensors.a4 = getValue();

        ioEventSubj.next(sensors);
    }, INTERVAL_SEC);

    // Unsubscribe on disconnect
    socket.on('disconnect', function(){
        clearInterval(routine);

        subscription.unsubscribe();
    });

});

function getValue(callback) {

    i2c1 = i2c.open(1, function (err) {
        if (err) throw err;
      
        (function readValue() {
          i2c1.readWord(I2C_ADDRESS, I2C_SENSOR_A1, function (err, value) {
            if (err) throw err;
            
            console.log(value);

            readValue();
          });
        }());

    });
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

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

// app.use('/', proxy('localhost:' + UI_PORT));

server.listen(LISTEN_PORT, () => {
    console.log('Server started on port ' + LISTEN_PORT);
});

//(function () {

    // async.series([
    //     function (cb) {
    //         console.log("Opening i2c");
    //         i2c1 = i2c.open(1, cb);
    //     },
    //     function (cb) {
    //         // Wait while non volatile memory busy
    //         (function read() {
    //             console.log("Reading byte");

    //             i2c1.readByte(I2C_ADDRESS, CMD_READ, function (err, config) {
    //                 console.log(config);
    //                 if (err) return cb(err);
    //                 if (config & 0x10) return read();
    //                 cb(null);
    //             });
    //         }());
    //     },
    //     function (cb) {
    //         i2c1.close(cb);
    //     }
    // ], function (err) {
    //     if (err) throw err;
    // })

    // var rawVal;

    // rawVal = i2c1.readWordSync(I2C_ADDRESS, CMD_READ);
    // rawVal = i2c1.readByteSync(I2C_ADDRESS, CMD_READ);
    // i2c1.readByte
    // i2c1.readByteSync

    // i2c1.readByte(I2C_ADDRESS, CMD_READ, function(err, conf) {
    //     console.log("readByte")
    // })

    // console.log("Raw value " + rawVal);

    // i2c1.closeSync();
// }());
