const Config = require('./config.js');
const Parser = require('cron-parser');

class CronJob {

    constructor(config) {
        this.cronexpr  = config.when;
        this.start     = config.start;
        this.end       = config.end;
        this.cmd       = config.cmd;
        
        if (this.start !== undefined && this.end !== undefined) {
            var opts = {
                currentDate: this.start,
                endDate:     this.end,
                iterator:    true
            };
        }
        this.interval = Parser.parseExpression(this.cronexpr, opts);

        this.next();
    }

    getNextDate() {
        return this.next;
    }

    isActive() {
        const now = new Date().getTime();
        if (this.next === undefined)
            return false;

        if (this.next.value !== undefined )
            return (this.next.value.getTime() <= now-100) && !this.next.done;

        return this.next.getTime() <= now+100;
    }

    next() {
        this.next = this.interval.next();
        return this.next;
    }

    run() {
        this.execute();
        this.next();
    }

    execute () { throw new Error('Not Implemented.') }
}


class CronJobs
{
    static jobs = new Map();

    static init(config) {
        console.log ('Loading cronjobs ...');

        this.jobs.clear();
        for (const cfg of config) {
            const job = new CronJob(cfg);
            this.jobs.set(cfg.id, job);
        }
    }

    static async start() {
        console.log ('Starting jobs');
        this.run();
    }

    static async run() {

        const now = new Date();
        let dates = [];
        for (const [id,job] of this.jobs) {
            if (now > job.getNextDate()) {
                job.run();
            }

            if (job.isActive()) {
                dates.push(job.getNextDate());
            }
        }

        // determine next time to fire
        if (dates.length > 0) {
            dates.sort((date1, date2) => date1 - date2);
            const next = dates[0];
            const ms = next.getTime() - now.getTime();

            console.log("Scheduling next action for " + next);
            setTimeout(this.run.bind(this), ms);
        }
    }
}

module.exports = CronJobs;