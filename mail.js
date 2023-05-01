const Module = require('./module.js');

class Mail extends Module
{
    constructor(nomatic) {
        super();
        this.nomatic = nomatic;
    }

    canSend() { return true; }

    init(config) {
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

    cmds() {
        return [ 'send_mail' ]
    }

    async send_mail(contact, subject, message) {
        // TODO send mail
    }

    async send(contact, message) {
        // TODO send mail
    }

}

module.exports = Mail;