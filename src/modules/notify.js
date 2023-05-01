const Module = require('./module.js');

class Notify extends Module
{
    constructor(nomatic) {
        super();
        this.nomatic = nomatic;
    }

    canSend() { return true; }

    receivers = new Map();

    configure(config, senderModules) {
        this.enabled = false;
        if (config.enabled) { 
            console.log ('Configuring notifications ...');

            this.channels = { ...config };
            
            this.receivers.clear();
            for (const module in senderModules) {
                const id = module.constructor.name.toLowerCase();
                this.receivers.set(id, module);
            }

            if (this.receivers.size > 0) {
                console.log(`Loaded ${this.receivers.size} notification receivers.`);
                this.enabled = true;
            } else {
                console.log('No receivers to load, disabling.');
            }
        } else {
            console.log('Notifications disabled.');
        }
    }

    cmds() {
        const channels = Object.keys(this.channels);
        return { 'notify' : channels};
    }

    async notify(level, message) {
        return this.send(level, message);
    }

    async send(level, message) {
        for (const channel in Object.keys(this.channels[level])) {
            const contacts = this.channels.get(level)[channel];
            if (this.receivers.has(channel)) {
                var rec = this.receivers.get(channel)
                for (const contact in contacts) {
                    rec.send(contact, message);
                }
            } else {
                console.log(`Notify Error: Unknown channel '${channel}'`);
            }
        }
    }

}

module.exports = Notify;