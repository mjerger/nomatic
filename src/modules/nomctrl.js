const Module = require('./module.js');

class nomctrl extends Module
{
    constructor(nomatic) {
        super();
        this.nomatic = nomatic;
    }

    canSend() { return true; }

    configure(config) {
        this.enabled = false;
        if (config.enabled) {
            console.log ('Configuring nomctrl API ...');
            this.enabled = true;
            this.api = config.url;
            this.token = config.token;
        } else {
            console.log ('nomctrl API is disabled.');
        }
    }

    cmds() {
        return [ 'nomctrl' ]
    }

    async exec(...argss) {

    }

    async send(contact, message) {
        // TODO send message to apartment
    }

}

module.exports = nomctrl;