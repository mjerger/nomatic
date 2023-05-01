const Module = require('./module.js');

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
    }
}

module.exports = Functions;