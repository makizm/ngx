const I2C_ADDRESS = 0x04;
const CMD_READ = 0x00;

const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

var async = require('async');

const { Subject } = require('rxjs');

// var i2c = require('i2c-bus'),
//     i2c1;

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

    socket.on('join', function(data) {
        console.log(data);

        routine = setInterval(function() {
            getValue(function(value) {
                sensors.a1 = value;

                ioEventSubj.next(sensors);
            })
        }, 3000);

    });

    // Unsubscribe on disconnect
    socket.on('disconnect', function(){
        clearInterval(routine);

        subscription.unsubscribe();
    });

    // socket.emit('sensors', sensors);
    // socket.broadcast.emit('sensors',data);
});

function getValue(callback) {

    // async.series([
    //     function (cb) {
    //       i2c1 = i2c.open(1, cb);
    //     },
    //     function (cb) {
    //         i2c1.readByte(I2C_ADDRESS, CMD_READ, function (err, rawValue) {
    //             if (err) return cb(err);
    //             return callback(rawValue);
    //             cb(null);
    //         });
    //     },
    //     function (cb) {
    //         i2c1.close(cb);
    //     }
    // ], function (err) {
    //     // do error stuff
    //     // console.log(err);
    //     if(err) return false;
    // })
    callback(0);
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

server.listen(3000, () => {
    console.log('Server started on port 3000');
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
