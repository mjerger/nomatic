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

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

class Nomatic {

    constructor(app) {
        this.app = app;
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
    
    init(config) {
        this.config = config;

        this.jobs .init(config.cronjobs);
        this.dog  .init(config.watchdog);
        this.hooks.init(config.webhooks);
        this.mail .init(config.email   );
        this.bot  .init(config.telegram);
        this.nc   .init(config.nomctrl );
    
        this.cmds.init([this.funcs, this.bot, this.mail, this.nc]);    
        this.notify.init(config.notify, [this.mail, this.bot, this.nc])
    }

    async start() {
        const port = this.config.app.port;

        this.app.listen(port, function () {
            app.use(bodyParser.json());
            app.use(express.urlencoded())
            console.log(`nomatic listening on port ${port}!`);
        });

        await this.jobs.start();
    }
}

module.exports = Nomatic;

// STARTUP
console.log ('nomatic starting up ...');
var nomatic = new Nomatic(app);
nomatic.init(Config.get());
nomatic.start();

app.get('/', async (req, res) => {
    res.send('nomatic up');
});

app.use((req, res, next) => {

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

app.post('/cmd', 
        bodyParser.text({type:'*/*'}), 
        async (req, res) => 
{
    console.log(`cmd: ${req.body}`);
    res.send(await Commands.exec(req.body));
});

app.get('/cmd/:cmd', async (req, res) => {
    console.log(`cmd: ${req.params.cmd}`)
    res.send(await Commands.exec(req.params.cmd));
});
