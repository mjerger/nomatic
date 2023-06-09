
class Commands 
{
    constructor(nomatic) {
        this.nomatic = nomatic;
    }

    cmds = new Map();

    configure(modules) {
        console.log ('Loading commands ...', );

        this.cmds.clear();

        // modules
        for (const module of modules) {
            if (module.enabled) {
                for (const cmd of module.cmds()) {
                    this.cmds.set(cmd, module);
                }
            }
        }

        // built-in
        // TODO

        console.log(`There are ${this.cmds.size} commands: ${Array.from(this.cmds.keys())}`);
    }

    async exec(cmd, ...args) {
        var module = this.cmds.get(cmd);
        if (module !== undefined) {
            await module.exec(...args);
        }
        else {
            console.log(`Command Error: Could not execute ${cmd} with argument ${args.join(' ')}`);
        }
    }
}

module.exports = Commands;