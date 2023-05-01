class Module 
{
    configure(config)  { throw new Error('Not Implemented: configure()');  }

    canStart()    { return false; }
    async start() { }
    async stop()  { }
    
    async reconfigure(config) {
        await this.stop();
        this.configure(config);
        await this.start();
    }

    async restart() { 
        await this.stop();
        await this.start();
    }

    cmds() { throw new Error('Not Implemented: cmds()'); }
    man()  { throw new Error('Not Implemented: man()');  }

    async exec(cmd, ...args) { 
        return this[cmd](...args);
    }

    canSend() { return false; }
    async send(contact, message) { throw new Error('Not Implemented: send()');  }

    hasTrigger() { return false; }
    async trigger(id, value)    { throw new Error('Not Implemented: trigger()');  }
}

module.exports = Module