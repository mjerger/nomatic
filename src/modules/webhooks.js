const Module = require('./module.js');

class Webhook
{
    constructor(config) { 
        this.id    = config.id;
        this.token = config.token;
        this.cmd   = config.cmd;
    }
}

class Webhooks extends Module
{
    constructor(nomatic) {
        super();
        this.nomatic = nomatic;
    }

    hooks = new Map();
    
    init (config) {
        this.enabled = false;
        if (config.enabled) {
            console.log ('Loading webhooks ...');

            this.hooks.clear();
            for (const cfg of config.hooks) {
                const hook = new Webhook(cfg);
                this.hooks.set(cfg.id, hook);
            }

            this.enabled = true;
        }
    }

    async start() {
        console.log ('Starting webhooks ...');
    }

    hasTrigger() {
        return true;
    }

    async trigger(id, token, value) {
        if (this.hooks.has(id)) {
            var hook = this.hooks[id];
            if (hook.token === token) {
                const cmd = hook.cmd.replace('{value}', value);
                await Commands.exec(cmd.split(/\s/));
            } else {
                console.log (`Webhooks Error: invalid token for hook '${id}'.`);
            }
        } else {
            console.log (`Webhooks Error: invalid hook '${id}'.`);
        }
    }

}

module.exports = Webhooks;