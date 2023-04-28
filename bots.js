const Config  = require('./config.js');

class Bot 
{
    values = new Map();

    constructor(config) {
        this.id     = config.id;
        this.type   = config.type;
    }

    async send(msg) { return this._send(msg); }
}


const bots = {
    'telegram' : class TelegramBot extends Bot
    {
        constructor(config) { 
            super(config);
            this.token = config.token
        }

        async _send(msg) {
            // TODO send msg to all channels
        }

    },


    'mail' : class MailBot extends Bot
    {
        constructor(config) { 
            super(config);
            this.email = config.email;
        }

        async _send(msg) {
            // TODO send email
        }

    }
}

class Bots
{
    static bots = new Map();

    static init(cfg_bots) {
        console.log ('Loading Bots...');

        let error = false;
        
        // load bots
        this.bots.clear();
        for (const cfg of cfg_bots) {

            // bot must exist
            let bot = bots[cfg.type];
            if (bot) {
                this.bots.set(cfg.id, new bot(cfg));
            }
            else
            {
            }
        }

    }

    static start() {
         // TODO
    }
}

module.exports = Bots;