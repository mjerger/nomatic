const Module = require('./module.js');

class Notify extends Module
{
    static canSend() { return true; }

    static receivers = new Map();

    static init(config, senderModules) {
        console.log ('Loading notification settings ...');
        this.channels = { ...config };
        
        this.receivers.clear();
        for (const module in senderModules) {
            const id = module.constructor.name.toLowerCase();
            this.receivers.set(id, module);
        }
    }

    static cmds() {
        const channels = Object.keys(this.channels);
        return { 'notify' : channels};
    }

    static async notify(level, message) {
        return this.send(level, message);
    }

    static async send(level, message) {
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

module.exports = nomctrl;