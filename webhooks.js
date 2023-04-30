const Utils   = require('./utils.js');

class Webhook
{
    constructor(config) { 
        this.id    = config.id;
        this.token = config.token;
        this.cmd   = config.cmd;
    }
}

class Webhooks
{
    static hooks = new Map();
    
    static init (config) {
        console.log ('Loading webhooks ...');

        this.hooks.clear();
        for (const cfg of config) {
            const hook = new Webhook(cfg);
            this.hooks.set(cfg.id, hook);
        }
    }

    static async start() {
        console.log ('Starting webhooks ...');
    }

}

module.exports = Webhooks;