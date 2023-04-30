const Module = require('./module.js');

class nomctrl extends Module
{
    static canSend() { return true; }

    static init(config) {
        this.enabled = false;
        if (config.enabled) {
            console.log ('Loading nomctrl API ...');
            this.enabled = true;
            this.api = config.url;
            this.token = config.token;
        }
    }

    static cmds() {
        return [ 'nomctrl' ]
    }


    static async exec(...argss) {

    }

    static async send(contact, message) {
        // TODO send message to apartment
    }

}

module.exports = nomctrl;