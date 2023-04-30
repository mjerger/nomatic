const Module = require('./module.js');

class Telegram extends Module
{
    static init(config) {
        console.log ('Loading Telegram config ...');
        this.enabled = config.enabled;
        this.token = config.token;
    }

    static async start() {
        console.log ('Starting Telegram bot ...');
    }

    static cmds() {
        return ['send_telegram_alert', 'send_telegram_message'];
    }

    static async send_telegram_alert(args) {

    }

    static async send_telegram_message(args) {
        
    }
}

module.exports = Telegram;