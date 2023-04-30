const Module = require('./module.js');

class Mail extends Module
{
    static init(config) {
        console.log ('Loading email service ...');
        this.enabled  = config.enabled;
        this.sender   = config.sender;
        this.smtp     = config.smtp;
        this.contacts = { ...config.contacts };
        this.sender   = config.sender;
    }

    static cmds() {
        return [ 'send_mail' ]
    }

    static async exec(cmd, ...args) {
        switch(cmd) {
            case 'send_mail' :
                // TODO send mail
                break;
        }
    }

    static getContacts(category) {
        if (category in this.contacts) 
            return this.contacts[category];

        return [];
    }

    static async send(subject, message, mails) {
        // TODO send mail
    }
}

module.exports = Mail;