const config  = require('./config.json');

class Config {

    static app()      { return config.app;      }
    static bots()     { return config.bots;     }
    static hooks()    { return config.hooks;    }
}

module.exports = Config;