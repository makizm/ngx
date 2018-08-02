const LISTEN_PORT = 4000;
const UI_PORT = 4200;

const BACKEND_SRV_ADDRESS = "192.168.2.20:4000";

const express = require('express');
const app = express();

const server = require('http').createServer(app);

const io = require('socket.io')(server);
const ioc = require('socket.io-client')("http://" + BACKEND_SRV_ADDRESS);

const proxy = require('express-http-proxy');

const { Subject } = require('rxjs');

let ValveState = new Subject();

io.on('connection', function(socket) {  
    console.log('Socket.io client connected...');

    // Create proxy event emitter
    let subscription = ValveState.subscribe({
        next: (data) => {
            socket.emit("valvestate", data);
        }
    });

    // Unsubscribe on disconnect
    socket.on('disconnect', function(){
        console.log('Socket.io client disconnected...');
        subscription.unsubscribe();
    });
});

ioc.on('valvestate', (msg) => {
    console.log(msg);
    ValveState.next(msg);
})


// app.route('/api').get((req, res) => {
//     res.send({ message: "Welcome to API"});
// });

// app.use(express.static(__dirname + '/node_modules'));

//app.get('/', function(req, res,next) {  
    //res.sendFile(__dirname + '/index.html');
//});
app.use('/api', proxy(BACKEND_SRV_ADDRESS));

app.use('/', proxy('localhost:' + UI_PORT));

server.listen(LISTEN_PORT, () => {
    console.log('Server started on port ' + LISTEN_PORT);
});
