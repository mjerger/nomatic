const Module = require('./module.js');

class Telegram extends Module
{
    constructor(nomatic) {
        super();
        this.nomatic = nomatic;
    }

    canStart() { return true; }
    canSend()  { return true; }

    configure(config) {
        this.enabled = false;
        if (config.enabled) {
            console.log ('Configuring Telegram bot ...');
            this.enabled = true;
            this.token = config.token;
        } else {
            console.log ('Telegram bot is disabled.');
        }
    }

    async start() {
        console.log ('Starting Telegram bot ...');
        this.running = true;
    }

    async stop() {
        this.running = false;
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