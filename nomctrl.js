const Module = require('./module.js');

class nomctrl extends Module
{
    static init(config) {
        console.log ('Loading nomctrl API ...');
        this.api = config.url;
        this.token = config.token;
    }

    static cmds() {
        return [ 'nomctrl' ]
    }


    static async exec(...argss) {

    }

}

module.exports = nomctrl;