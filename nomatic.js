const Config   = require('./config.js');
const Telegram = require('./telegram.js');
const Commands = require('./commands.js');
const Jobs     = require('./cronjobs.js');
const Watchdog = require('./watchdog.js');
const Hooks    = require('./webhooks.js');

const express = require("express");
const bodyParser = require('body-parser');
const app = express();

// STARTUP

app.listen(Config.app().port, function () {
    app.use(bodyParser.json());
    app.use(express.urlencoded())

    console.log ("Loading config...");

    Jobs    .init(Config.cronjobs());
    Watchdog.init(Config.watchdog());
    Hooks   .init(Config.webhooks());
    Telegram.init(Config.telegram());

    Jobs    .start();
    Telegram.start();

    console.log(`nomatic listening on port ${Config.app().port}!`);
});

// ROUTES

app.get("/", async (req, res) => {
    res.send("nomatic up");
});

app.bind("/api", async (req, res) => {

    //TODO status page
    res.send("nomatic up");
});
/*
app.post("/cmd", bodyParser.text({type:"*//*"}), async (req, res) => {
    console.log(`cmd: ${req.body}`);
    res.send(await execute(req.body));
});

app.get("/cmd/:cmd", async (req, res) => {
    console.log(`cmd: ${req.params.cmd}`)
    res.send(await execute(req.params.cmd));
});*/
