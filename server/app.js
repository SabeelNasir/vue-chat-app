'use strict';

const session = require('express-session');
const express = require('express');
const http = require('http');
const uuid = require('uuid');
const cors = require('cors')
// import { Clients } from './models/Clients.js'
const Clients = require('./models/Clients')
const WebSocket = require('ws');

const app = express();
const map = new Map();

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
app.use(express.static('public'));
app.use(sessionParser);
app.use(cors({
    origin: 'http://localhost:8080'
}))

app.post('/login', function (req, res) {
    const id = uuid.v4();
    console.log(`Updating session for user ${id}`);
    req.session.userId = id;
    res.send({
        result: 'OK', message: 'Session updated', data: {
            userId: id
        }
    });
});
app.delete('/logout', function (request, response) {
    const ws = map.get(request.session.userId);

    console.log('Destroying session');
    request.session.destroy(function () {
        if (ws) ws.close();

        response.send({ result: 'OK', message: 'Session destroyed' });
    });
});
app.get('/session', (req, res) => {
    res.send({
        session: req.session,
        result: 'OK'
    })
})
app.get('/clients', (req, res) => {
    res.send({
        data: clients.clientList,
    })
})

const server = http.createServer(app);
const clients = new Clients();
const wss = new WebSocket.Server({ clientTracking: true, noServer: true });

server.on('upgrade', function (request, socket, head) {
    console.log('Parsing session from request...');

    sessionParser(request, {}, () => {
        if (!request.session.userId) {
            // socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            // socket.destroy();
            // return;
        }
        console.log('Session is parsed!');
        wss.handleUpgrade(request, socket, head, function (ws) {
            wss.emit('connection', ws, request);
        });
    });
});

wss.on('connection', function (ws, request) {
    const userId = request.session.userId;
    map.set(userId, ws);
    ws.on('message', function (message) {
        console.log(message)
        const msgBody = JSON.parse(message)
        clients.saveClient(msgBody.username, ws)
        console.log(`Received message ${msgBody.message} from user ${userId}`);
        wss.clients.forEach(function each(client) {
            if (client != ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(
                    {
                        username: msgBody.username,
                        message: msgBody.message
                    }
                ));
            }
        });
    });

    ws.on('close', function () {
        map.delete(userId);
    });
});

server.listen(8081, function () {
    console.log('Listening on http://localhost:8081');
});