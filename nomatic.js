const Config    = require('./config.js');
const Commands  = require('./commands.js');
const Functions = require('./functions.js');
const Jobs      = require('./cronjobs.js');
const Watchdog  = require('./watchdog.js');
const Hooks     = require('./webhooks.js');
const Mail      = require('./mail.js');
const Telegram  = require('./telegram.js');
const nomctrl   = require('./nomctrl.js');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// STARTUP

app.listen(Config.app().port, function () {
    app.use(bodyParser.json());
    app.use(express.urlencoded())

    console.log ('Starting up ...');

    Jobs    .init(Config.cronjobs());
    Watchdog.init(Config.watchdog());
    Hooks   .init(Config.webhooks());
    Mail    .init(Config.email()   );
    Telegram.init(Config.telegram());
    nomctrl .init(Config.nomctrl() );

    Commands.init([Functions, 
                   Telegram, 
                   Mail, 
                   nomctrl]);

    Jobs    .start();
    Telegram.start();

    console.log(`nomatic listening on port ${Config.app().port}!`);
});

app.get('/', async (req, res) => {
    res.send('nomatic up');
});

app.use((req, res, next) => {

    // disabled
    if (!Config.api().enabled) {
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
