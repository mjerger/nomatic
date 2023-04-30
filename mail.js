const Module = require('./module.js');

class Mail extends Module
{
    static canSend() { return true; }

    static init(config) {
        this.enabled = false;
        if (config.enabled) {
            console.log ('Loading email service ...');
            this.enabled  = true;
            this.sender   = config.sender;
            this.smtp     = config.smtp;
            this.contacts = { ...config.contacts };
            this.sender   = config.sender;
        }
    }

    static cmds() {
        return [ 'send_mail' ]
    }

    static async send_mail(contact, subject, message) {
        // TODO send mail
    }

    static async send(contact, message) {
        // TODO send mail
    }

}

module.exports = Mail;