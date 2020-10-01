module.exports = class Clients {
    constructor() {
        this.clientList = {};
        this.saveClient = this.saveClient.bind(this)
    }

    saveClient(username, client) {
        this.clientList[username] = client;
    }
}