const Config = require('./config.js');
const Parser = require('cron-parser');

class CronJob {

    constructor(cronexpr, start, end) {
        this.cron  = cronexpr;
        this.start = start;
        this.end   = end;
        
        if (start !== undefined && end !== undefined) {
            var opts = {
                currentDate: start,
                endDate:     end,
                iterator:    true
            };
        }

        this.interval = Parser.parseExpression(cronexpr, opts);

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
    

class MonitorJob extends CronJob {
    constructor(cronexpr, start, end) {
        super(cronexpr, start, end);
    }

    check () { throw new Error('Not Implemented.') }
}


const MonitorJobs = {
    'sane' : class MonitorSane extends MonitorJob 
    {
        constructor() {
            super("*/15 * * * * *");
        }
        async check() {
            console.log("TEST MONITOR JOB");
            // TODO check code here
            return false;
        }

    }                
}

const CronJobs = {
    'test' : class CronJobTest extends CronJob 
    {
        constructor() {
            super("*/15 * * * * *");
        }
        async execute() {
            console.log("TEST CRON JOB");
            // TODO code here
            return false;
        }

    }                
}

class Jobs
{
    static monitorJobs = new Map();
    static cronJobs = new Map();

    static init() {
        console.log ('Loading jobs...');
        this.monitorJobs.clear();
        this.cronJobs.clear();

        for (const [id,clazz] of Object.entries(MonitorJobs)) {
            this.monitorJobs.set(id, new clazz());
        }

        for (const [id,clazz] of Object.entries(CronJobs)) {
            this.monitorJobs.set(id, new clazz());
        }
    }

    static async start() {
        console.log ('Starting jobs');
        this.monitor();
    }

    static async monitor() {

        const now = new Date();
        let dates = [];
        for (const [id,job] of this.monitorJobs) {
            if (now > job.getNextDate()) {
                job.run();
            }

            if (job.isActive()) {
                dates.push(job.getNextDate());
            }
        }

        console.log(dates);

        // determine next time to fire
        if (dates.length > 0) {
            dates.sort((date1, date2) => date1 - date2);
            const next = dates[0];
            const ms = next.getTime() - now.getTime();

            console.log("Scheduling next action for " + next);
            setTimeout(this.monitor.bind(this), ms);
        }
    }
}

module.exports = Jobs;