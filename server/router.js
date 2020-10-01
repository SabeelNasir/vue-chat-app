const uuid = require('uuid');

module.exports = (app) => {
    app.post('/login', function (req, res) {
        const id = uuid.v4();
        console.log(req.body);
        req.session.userId = id;
        res.send({
            result: 'OK', message: 'Session updated', data: {
                userId: id,
                username: req.body.username,
                token: id
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

}