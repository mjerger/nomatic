const Utils          = require('./utils.js');
const public_config  = require('./config.json');
const secret_config  = require('./config.secret.json');

class Config 
{
    static get() {
        if (this.config === undefined)
            this.config = Utils.mergeDeep(public_config, secret_config); 

        return this.config;
    }
}

module.exports = Config;