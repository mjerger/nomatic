const Module = require('./module.js');
const Nomatic = require('./nomatic.js');

class Functions extends Module
{
    constructor(nomatic) {
        super();
        this.nomatic = nomatic;
    }

    cmds() {
        return ['test']
    }

    test() {
        Nomatic.bot.start()
    }
}

module.exports = Functions;