const Utils    = require('./utils.js');
const Config   = require('./config.js');
const Bots     = require('./bots.js');
const Jobs     = require('./jobs.js');
const Hooks    = require('./hooks.js');

const express = require("express");
const bodyParser = require('body-parser');
const app = express();

// STARTUP

app.listen(Config.app().port, function () {
    app.use(bodyParser.json());
    app.use(express.urlencoded())

    console.log ("Loading config...");

    Bots.init(Config.bots());
    Jobs.init();
    Hooks.init(Config.hooks());

    Bots.start();
    Jobs.start();
    Hooks.start();

    console.log(`nomatic listening on port ${Config.app().port}!`);
});

// ROUTES

app.get("/", async (req, res) => {
    res.send("nomatic up");
});

app.get("/status", async (req, res) => {
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
