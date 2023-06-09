const Config    = require('./config.js');
const Commands  = require('./commands.js');
const Functions = require('./modules/functions.js');
const Notify    = require('./modules/notify.js');
const Jobs      = require('./modules/cronjobs.js');
const Watchdog  = require('./modules/watchdog.js');
const Hooks     = require('./modules/webhooks.js');
const Mail      = require('./modules/mail.js');
const Telegram  = require('./modules/telegram.js');
const nomctrl   = require('./modules/nomctrl.js');

const express    = require('express');
const bodyParser = require('body-parser');

class Nomatic {

    constructor() {
        this.jobs   = new Jobs(this);
        this.dog    = new Watchdog(this);
        this.hooks  = new Hooks(this);
        this.mail   = new Mail(this);
        this.bot    = new Telegram(this);
        this.nc     = new nomctrl(this);
        this.funcs  = new Functions(this);
        this.cmds   = new Commands(this);
        this.notify = new Notify(this);
    }
    
    configure(config) {
        this.config = config;
        
        this.funcs.configure(config.functions);
        this.jobs .configure(config.cronjobs);
        this.dog  .configure(config.watchdog);
        this.hooks.configure(config.webhooks);
        this.mail .configure(config.email   );
        this.bot  .configure(config.telegram);
        this.nc   .configure(config.nomctrl );
        
        this.cmds.configure([this.funcs, this.bot, this.mail, this.nc]);    
        this.notify.configure(config.notify, [this.mail, this.bot, this.nc])
    }

    async start() {
        await this.jobs.start();
    }

    routes() {
        var routes = express.Router();

        routes.get('/', async (req, res) => {
            res.send('nomatic up');
        });

        routes.use((req, res, next) => {

            // disabled
            if (!Config.get().api.enabled) {
                res.status(404).send();
                return;

            // check auth
            } else {
                const auth = req.headers.authoriation;
                if (auth) {
                    if (auth === Config.api().token ||
                        auth === 'Basic ' + Config.api().token)
                    {
                        // access granted
                        return next()
                    }
                }
            }

            // access denied
            res.set('WWW-Authenticate', "Basic realm='401'")
            res.status(401).send('No.') 
        });

        routes.post('/cmd', 
                bodyParser.text({type:'*/*'}), 
                async (req, res) => 
        {
            console.log(`cmd: ${req.body}`);
            res.send(await Commands.exec(req.body));
        });

        routes.get('/cmd/:cmd', async (req, res) => {
            console.log(`cmd: ${req.params.cmd}`)
            res.send(await Commands.exec(req.params.cmd));
        });

        return routes;
    }
}

module.exports = Nomatic;