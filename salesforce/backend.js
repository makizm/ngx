const LISTEN_PORT = 4000;
const UI_PORT = 4200;

const debug = require('debug')('salesforce');

const express = require('express');
const app = express();

// Middleware JSON body parser for express
const bodyParser = require('body-parser');

const server = require('http').createServer(app);

const proxy = require('express-http-proxy');

var https = require('https');

let URL = require('url').URL;

// const { Subject } = require('rxjs');

let DATA = "";

// Express Server common settings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route('/api').get((req, res) => {
    res.send({ message: "Welcome to API" });
})

app.route('/api/proxy').get((req, res) => {
    res.send({ message: "Welcome to API Proxy" });
})

app.post('/api/proxy/:url', ProxyHandler);
app.get('/api/proxy/:url', ProxyHandler);

app.post('/api/token', (req, res) => {

    // must containt value in message body
    if(req.headers['content-length'] == null) {
        console.log(logPrefix + id + " Content-Length can't be null");
        res.sendStatus(400);
        return false;
    }

    let body = req.body || null;

    let code = body['code'] || null;

    if(!code) {
        res.sendStatus(400);
        return false;
    }

    let ops = new ReqOptions(body['reqUrl'], 'POST');
        ops.searchAdd("grant_type", "authorization_code");
        // grant_type=refresh_token
        ops.searchAdd("format", "json");
        ops.searchAdd("client_id", body['client_id']);
        ops.searchAdd("client_secret", body['client_secret']);
        ops.searchAdd("redirect_uri", body['redirect_uri']);
        ops.searchAdd("code", code);
        ops.headers = { "content-type": "application/x-www-form-urlencoded" }

    Request(ops, req, (data, msg) => {
        res.status(msg.code).send(data)
    })
})

// TO DO
// ws handshare error when proxied
// WebSocket connection to 'ws://localhost:4000/sockjs-node/916/tho0ckfj/websocket' 
// failed: Error during WebSocket handshake: Unexpected response code: 400
// app.use('/sockjs-node', proxy('localhost:' + UI_PORT));

app.use('/', proxy('localhost:' + UI_PORT));

server.listen(LISTEN_PORT, () => {
    debug('Salesforce backend service')

    console.log('Server started on port ' + LISTEN_PORT);
});

/**
 * Request Options
 * @param {string} u URL string
 * @param {string} m HTTP request method (GET|POST|..)
 */
function ReqOptions(u, m) {
    /** Request URL Object */
    this.url = new URL(u);

    /** HTTP request method (GET|POST|..) */
    this.method = m;

    /** HTTP headers as JSON */
    this.headers = null;

    /** Post data */
    this.data = null;
}

/** Append search parameter to url
 * @param {string} key
 * @param {string} value
*/
ReqOptions.prototype.searchAdd = function(key, value) {
    this.url.searchParams.append(key, value);
}
 
/**
 * Send a request to external url
 * @param {ReqOptions} options Request Options
 * @param {Function} callback callback function (data, error, response)
 */
function Request(options, req, callback) {

    // bare minimum
    if(!options.url || !options.method) {
        throw "Invalid use use Request(options, callback). ReqOptions must provide url and method at the minimum";
    }

    // validate callback
    if(typeof callback != "function") {
        throw "Invalid use use Request(options, callback). callback must be a function"
    }

    // validate headers when present
    if(options.headers) {
        if(typeof options.headers != "object") {
            throw "Invalid use use Request(options, callback). headers arg must be an object of http header entries"
        }
    }

    // validate url search parameters when present
    if(options.search) {
        if(typeof options.search != "object") {
            throw "Invalid use use Request(options, callback). search arg must be an object of url search parameters"
        }
    }

    let reqUrl = options.url;

    let reqOptions = {
        hostname: reqUrl.hostname,
        port: reqUrl.port || 443,
        path: reqUrl.pathname + reqUrl.search || '/',
        method: options.method,
        headers: options.headers || { 'content-type': 'application/json' }
    }

    // Passthrough auth bearer
    // this will overwrite cookie token value
    if(req.headers['authorization']) {
        reqOptions.headers['authorization'] = req.headers['authorization'];
    }

    // Passthrough cache-control
    if(req.headers['cache-control']) {
        reqOptions.headers['cache-control'] = req.headers['cache-control'];
    }

    // Passthrough user-agent
    if(req.headers['user-agent']) {
        reqOptions.headers['user-agent'] = req.headers['user-agent'];
    }

    // POST Data stuff
    DATA = JSON.stringify(options.data)

    if(options.method == "POST") reqOptions.headers['content-length'] = DATA.length;

    debug(reqOptions);

    let request = https.request(reqOptions, (_response) => {

        // Response message
        let msg = {
            code: _response.statusCode,
            message: _response.statusMessage
        }

        // Response data will be stored here
        let data = '';

        // Process response data stream
        _response.on('data', function (chunk) {
            data += chunk;
        });

        // Setup callback once finished
        _response.on('end', () => {
            debug("Data receive completed!");

            if(data) {
                callback(data, msg, _response);
            } else {
                callback(msg, msg, _response);
            }
        })
    });

    // during POST request
    // send data to target server
    if(options.method == "POST") {
        request.write(DATA)
    }
    
    // the end
    // request.end() will completed before
    // the entire message response is received
    request.end();
}

function ProxyHandler(req, res) {

    // Get requesting client address
    let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    let logPrefix = "ProxyHandler - ";

    debug("% Processing request from %s", logPrefix, clientIp);

    // must containt value in message body
    // if(req.headers['Authorization'] == null) {
    //     debug("Authorization header is not provided. Returning 401")
    //     res.sendStatus(401);
    //     return false;
    // }

    // Extract and validate url parameter
    let reqUrl = req.params.url;
    
    if(!reqUrl) {
        let msg = "Invalid request URL";
        debug("%s Returning 400 %s", logPrefix, msg);

        res.status(400).send({
            code: 400,
            message: msg
        });

        return false;
    }

    debug("%s %s", logPrefix, reqUrl)

    let ops = new ReqOptions(reqUrl, req.method);

    if(req.method == "POST") ops.data = req.body || null;

    Request(ops,req, (data, msg, response) => {
        // Pass server response header into proxy response to the client
        res = headSwap(response, res, ops.url.hostname);

        debug("%s Relaying the response to client %s %o", logPrefix, clientIp, msg);

        res.status(msg.code).send(data)
    })
}

/**
 * headSwap replaces proxy response header with 
 * provided, src/souce header
 * @param {*} src Source response i.e. API Server response
 * @param {*} res Proxy response to the client
 * @param {string} server Server address that will be used as X-Forwarded-Host value 
 * @return {*} Resulting header
 */
function headSwap(src, res, server) {
    debug("headSwap - Replacing proxy with server response header");

    // Exceptions list (case sensitive but always lower case)
    // defined entries will be excluded from replacement
    let ex = [
        "date",
        "transfer-encoding"
    ]

    let sH = {};

    if(src.headers) {
        // get header from server response
        sH = src.headers;
    }

    if(sH && res) {
        Object.keys(sH).map(key => {
            if(!ex.includes(key)) {
                res.set(key, sH[key]);
                // debug("%s - %s", key, sH[key])
            }
        });
    }

    // tell the client from where response originated
    if(server) res.set("X-Forwarded-Host", server);

    // disable browser’s default login prompt on 401 response
    if(src.statusCode == 401) {
        res.removeHeader("www-authenticate");
    }

    return res;
}