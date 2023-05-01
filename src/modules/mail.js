const Module = require('./module.js');

class Mail extends Module
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
            console.log ('Configuring email service ...');
            this.enabled  = true;
            this.sender   = config.sender;
            this.smtp     = config.smtp;
            this.contacts = { ...config.contacts };
            this.sender   = config.sender;
        } else {
            console.log ('Email service is disabled.');
        }
    }

    async start() {
        this.running = true;
    }

    async stop() {
        this.running = false;
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