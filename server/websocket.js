const Clients = require('./models/Clients')
const WebSocket = require('ws');

const clients = new Clients();
const map = new Map();

module.exports = (server, sessionParser) => {

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
        ws.isAlive = true
        const userId = request.session.userId;
        map.set(userId, ws);
        ws.on('message', function (message) {
            console.log(message)
            const msgBody = JSON.parse(message)
            clients.saveClient(msgBody.username, ws)
            if (msgBody.sendTo == null) {
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
            } else {
                const toUserWebSocket = clients.clientList[msgBody.sendTo]
                if (toUserWebSocket && ws != toUserWebSocket) {
                    toUserWebSocket.send(JSON.stringify({
                        username: msgBody.username,
                        message: msgBody.message
                    }))
                }
            }
        });

        ws.on('close', function () {
            map.delete(userId);
        });

        ws.on('pong', heartBeat)
    });

    const heartBeat = () => {
        this.isAlive = true
    }

    const noop = () => { }
    // const interval = setInterval(function ping() {
    //     console.log('pinging')
    //     wss.clients.forEach(function each(ws) {
    //         if (ws.isAlive === false) return ws.terminate();

    //         ws.isAlive = false;
    //         ws.ping(noop);
    //     });
    // }, 5000);

    wss.on('close', () => {
        clearInterval(interval)
    })

}