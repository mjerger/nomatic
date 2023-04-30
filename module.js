
class Module {

    constructor() {
        if (this.constructor == Module) {
          throw new Error('Abstract classe Module can\'t be instantiated.');
        }
    }

    static init(config)  { throw new Error('Not Implemented: init()');  }
    static async start() { throw new Error('Not Implemented: start()'); }

    static cmds() { throw new Error('Not Implemented: cmds()'); }
    static man()  { throw new Error('Not Implemented: man()');  }

    static async exec(cmd, ...args) { 
        this[cmd](...args);
    }
}

module.exports = Module