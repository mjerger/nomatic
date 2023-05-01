class Module 
{

    init(config)  { throw new Error('Not Implemented: init()');  }
    async start() { throw new Error('Not Implemented: start()'); }

    cmds() { throw new Error('Not Implemented: cmds()'); }
    man()  { throw new Error('Not Implemented: man()');  }

    async exec(cmd, ...args) { 
        this[cmd](...args);
    }

    canSend() { return false; }
    async send(contact, message) { throw new Error('Not Implemented: send()');  }

    hasTrigger() { return false; }
    async trigger(id, value)    { throw new Error('Not Implemented: trigger()');  }
}

module.exports = Module