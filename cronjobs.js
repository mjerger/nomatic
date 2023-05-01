const Module = require('./module.js');
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
        return this.nextDate;
    }

    isActive() {
        if (this.nextDate === undefined)
            return false;

        if (this.nextDate.value !== undefined )
            return  !this.nextDate.done;

        return true;
    }

    next() {
        this.nextDate = this.interval.next();
    }
}


class CronJobs extends Module
{
    constructor(nomatic) {
        super();
        this.nomatic = nomatic;
    }

    jobs = new Map();

    init(config) {
        this.enabled = false;
            if (config.enabled) {
            console.log ('Loading cronjobs ...');

            this.jobs.clear();
            for (const cfg of config.jobs) {
                const job = new CronJob(cfg);
                this.jobs.set(cfg.id, job);
            }
        }
    }

    async start() {
        console.log ('Starting cronjobs ...');
        return this.run();
    }

    async run() {
        const now = new Date();
        let dates = [];
        for (const [id,job] of this.jobs) {
            const nextTime = job.getNextDate();
            if (now.getTime() > nextTime.getTime()) {
                await this.nomatic.cmds.exec(job.cmd);
                job.next();
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

            console.log('Cronjobs: Scheduling next action for ' + next);
            setTimeout(this.run.bind(this), ms);
        }
    }
}

module.exports = CronJobs;