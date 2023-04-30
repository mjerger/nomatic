
class Commands 
{
    static commands = new Map();

    static init(...providers) {
        console.log ('Loading commands ...', );

        this.commands.clear();
        for (const prov of providers) {
            for (const args of prov.getCommands()) {
                this.commands.set(args, args.slice(1))
            }
        }
    }

    static exec(id, ...args) {
        var cmd = this.commands.get(id);
        if (cmd !== undefined) {
            cmd(...args);
        }
        else {
            console.log(`Command Error: Could not execute ${id} with argument ${args.join(' ')}`);
        }
    }

}