const Module = require('./module.js');

class Function {

    constructor(config) {
        this.id  = config.id;
        this.js  = config.js;
    }

    async exec(...args) {
        // TODO exec this.js
    }
}


class Functions extends Module
{
    constructor(nomatic) {
        super();
        this.nomatic = nomatic;
    }

    funcs = new Map();

    configure(config) {
        this.enabled = false;
        if (config.enabled) {
            console.log ('Configuring Functions ...');

            this.funcs.clear();
            for (const cfg of config.definitions) {
                const func = new Function(cfg);
                this.funcs.set(cfg.id, func);
            }

            if (this.funcs.size > 0) {
                console.log(`Loaded ${this.funcs.size} user-defined functions.`);
                this.enabled = true;
            } else {
                console.log('No functions to load, disabling.')
            }

        } else {
            console.log ('Functions are disabled.');
        }
    }

    cmds() {
        return Array.from(this.funcs.keys());
    }

    async exec(cmd, ...args) { 
        return this.funcs.get(cmd)(...args);
    }
}

module.exports = Functions;