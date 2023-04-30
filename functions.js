const Module = require('./module.js');

class Functions extends Module
{

    static cmds() {
        return ['test']
    }

    static test() {

    }
}

module.exports = Functions;