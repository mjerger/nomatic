const Utils   = require('./utils.js');

class Hook
{
    constructor(name, token, cmds) { 
        this.name = name;
        this.token = token;
        this.cmds = cmds;
    }
}

class Hooks 
{
    static hooks = [];
    
    static init () {
        console.log ('Loading hooks...');
        this.hooks = [];

    }

    static start() {
    }

    static async start() {
        console.log ('Setting up hooks...');
    }

}

module.exports = Hooks;