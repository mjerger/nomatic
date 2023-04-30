const Module = require('./module.js');

class WatchdogTimer 
{
    constructor(config, callback) {
        this.id = config.id;
        this.seconds = config.seconds;
        this.cmd = config.cmd;
        this.callback = callback;
    }

    static start() {
        this.reset();
        this.timer = setTimeout(this.timerElapsed.bind(this), this.seconds * 1000);
    }

    static timerElapsed() {
        this.callback(this.id, this.cmd);
        this.start();
    }

    static reset() {
        if (this.timer)
            clearTimeout(this.timer);
    }
}


class Watchdog extends Module
{
    static timers = new Map();
    
    static init(config) { 
        this.enabled = false;
        if (config.enabled) {
            console.log('Loading watchdogs ...');

            this.timers.clear();
            for (const cfg of config.timers) {
                const timer = new WatchdogTimer(cfg, this._callback);
                this.timers.set(cfg.id, timer);
            }

            this.enabled = true;
        }
    }

    static start() {
        console.log('Starting watchdogs ...');
        for (const [id, timer] of this.timers) {
            timer.start();
        }
    }

    static _callback(id, cmd) {
        // TODO exec cmd
    }
}

module.exports = Watchdog;