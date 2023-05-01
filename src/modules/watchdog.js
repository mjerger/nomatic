const Module = require('./module.js');

class WatchdogTimer 
{
    constructor(config, callback) {
        this.id = config.id;
        this.seconds = config.seconds;
        this.cmd = config.cmd;
        this.callback = callback;
    }

    start() {
        this.reset();
        this.timer = setTimeout(this.timerElapsed.bind(this), this.seconds * 1000);
    }

    timerElapsed() {
        this.callback(this.id, this.cmd);
        this.start();
    }

    reset() {
        if (this.timer)
            clearTimeout(this.timer);
    }
}


class Watchdog extends Module
{
    constructor(nomatic) {
        super();
        this.nomatic = nomatic;
    }

    canStart() { return true; }
    timers = new Map();

    configure(config) { 
        this.enabled = false;
        if (config.enabled) {
            console.log('Configuring watchdog ...');

            this.timers.clear();
            for (const cfg of config.timers) {
                const timer = new WatchdogTimer(cfg, this._callback);
                this.timers.set(cfg.id, timer);
            }

            if (this.timers.size > 0) {
                console.log (`Loaded ${this.timers.size} watchdog timers.`);    
                this.enabled = true;
            } else {
                console.log ('No watchdog timers to load, disabling.');    
            }
        } else {
            console.log ('Watchdog is disabled.');
        }
    }

    async start() {
        console.log('Starting watchdogs ...');
        for (const [id, timer] of this.timers) {
            timer.start();
        }

        this.running = (this.timers.size > 0);
    }

    async stop() {
        console.log('Stopping watchdogs ...');
        this.running = false;
        for (const [id, timer] of this.timers) {
            timer.reset();
        }
    }

    _callback(id, cmd) {
        // TODO exec cmd
    }
}

module.exports = Watchdog;