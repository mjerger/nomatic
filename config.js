const Utils          = require('./utils.js');
const public_config  = require('./config.json');
const secret_config  = require('./config.secret.json');

class Config 
{
    static app()            { return this.get().app;      }
    static api()            { return this.get().api;      }
    static nomctrl()        { return this.get().nomctrl;  }
    static telegram()       { return this.get().telegram; }
    static email()          { return this.get().email;    }
    static cronjobs()       { return this.get().cronjobs; }
    static watchdog()       { return this.get().watchdog; }
    static webhooks()       { return this.get().webhooks; }

    static get() {
        if (this.config === undefined)
            this.config = Utils.mergeDeep(public_config, secret_config); 

        return this.config;
    }
}

module.exports = Config;