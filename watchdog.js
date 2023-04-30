
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


class Watchdog
{
    static timers = new Map();
    
    static init(config) { 
        console.log('Loading watchdogs ...');

        this.timers.clear();
        for (const cfg of config) {
            const timer = new WatchdogTimer(cfg, this.callback);
            this.timers.set(cfg.id, timer);
        }
    }

    static start() {
        console.log('Starting watchdogs ...');
        for (const [id, timer] of this.timers) {
            timer.start();
        }
    }

    static callback(id, cmd) {
        // TODO exec cmd
    }
}

module.exports = Watchdog;