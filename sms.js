const Module = require('./module.js');

class SMS extends Module
{
    static canSend() { return true; }

    static init(config) {
        this.enabled = false;
        if (config.enabled) {
            console.log ('Loading SMS service ...');
            this.enabled  = true;
            this.sender   = config.sender;
            this.smtp     = config.smtp;
            this.contacts = { ...config.contacts };
        }
    }

    static cmds() {
        return [ 'send_sms' ]
    }

    static async send_sms(phonenumber, message) {
        // TODO send sms
    }

    static async send(contact, message) {
        // TODO send sms
    }
}

module.exports = Mail;