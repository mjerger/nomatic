const Module = require('./module.js');

class nomctrl extends Module
{
    constructor(nomatic) {
        super();
        this.nomatic = nomatic;
    }

    canSend() { return true; }

    init(config) {
        this.enabled = false;
        if (config.enabled) {
            console.log ('Loading nomctrl API ...');
            this.enabled = true;
            this.api = config.url;
            this.token = config.token;
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