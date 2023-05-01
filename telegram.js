const Module = require('./module.js');

class Telegram extends Module
{
    constructor(nomatic) {
        super();
        this.nomatic = nomatic;
    }

    canSend() { return true; }

    init(config) {
        this.enabled = false;
        if (config.enabled) {
            console.log ('Loading Telegram config ...');
            this.enabled = config.enabled;
            this.token = config.token;
        }
    }

    async start() {
        console.log ('Starting Telegram bot ...');
    }

    cmds() {
        return ['send_telegram'];
    }

    async send_telegram(contact, message) {
        return this.send(contact, message);
    }

    async send(contact, message) {
        // TODO        
    }

}

module.exports = Telegram;