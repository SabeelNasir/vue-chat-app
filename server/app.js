'use strict';

const session = require('express-session');
const express = require('express');
const http = require('http');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')

//
// We need the same instance of the session parser in express and
// WebSocket server.
//
const sessionParser = session({
    saveUninitialized: false,
    secret: '$eCuRiTy',
    resave: false
});

//
// Serve static files from the 'public' folder.
//
app.use(bodyParser.json({ type: 'application/json' }))
app.use(express.static('public'));
app.use(sessionParser);
app.use(cors({
    origin: 'http://localhost:8080'
}))

const router = require('./router')(app)
const server = http.createServer(app);
const wss = require('./websocket')(server, sessionParser)

server.listen(8081, function () {
    console.log('Listening on http://localhost:8081');
});