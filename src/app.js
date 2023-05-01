
const Nomatic = require('./nomatic.js');
const Config  = require('./config.js');

const express    = require('express');
const bodyParser = require('body-parser');

// STARTUP
console.log ('nomatic starting up ...');

const port = Config.get().app.port;
const app = express();

// instance
const nomatic = new Nomatic();
nomatic.init(Config.get());
nomatic.start();

app.use('/', nomatic.routes())

app.listen(port, function () {
    app.use(bodyParser.json());
    app.use(express.urlencoded())
    console.log(`nomatic listening on port ${port}!`);
});


