
class nomctrl {

    static init(config) {
        console.log ('Loading nomctrl API ...');
        this.api = config.url;
        this.token = config.token;
    }

    static commands() {
        return [ ['nomctrl', this.exec, 'Executes a command on nomctrl']]
    }

    static man(...args) {
        return [ ['nomctrl', this.exec, 'Execute a command on nomctrl']]
    }


    static async exec(...argss) {

    }

}

module.exports = nomctrl;