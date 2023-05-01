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

    canStart() { return true; }
    hooks = new Map();
    
    configure (config) {
        this.enabled = false;
        if (config.enabled) {
            console.log ('Loading webhooks ...');

            this.hooks.clear();
            for (const cfg of config.hooks) {
                const hook = new Webhook(cfg);
                this.hooks.set(cfg.id, hook);
            }

            if (this.hooks.size > 0) {
                console.log(`Loaded ${this.hooks.size} webhooks.`)
                this.enabled = true;
            } else {
                console.log ('No webhooks to load, disabling.');    
            }

        }
    }

    async start() {
        console.log ('Starting webhooks ...');
        this.running = (this.hooks.size > 0);
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