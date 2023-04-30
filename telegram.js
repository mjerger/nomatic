const Module = require('./module.js');

class Telegram extends Module
{
    static canSend() { return true; }

    static init(config) {
        this.enabled = false;
        if (config.enabled) {
            console.log ('Loading Telegram config ...');
            this.enabled = config.enabled;
            this.token = config.token;
        }
    }

    static async start() {
        console.log ('Starting Telegram bot ...');
    }

    static cmds() {
        return ['send_telegram'];
    }

    static async send_telegram(contact, message) {
        return this.send(contact, message);
    }

    static async send(contact, message) {
        // TODO        
    }

}

module.exports = Telegram;