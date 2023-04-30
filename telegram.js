
class Telegram
{
    static init(config) {
        console.log ('Loading Telegram Bot...');
        this.enabled = config.enabled;
        this.token = config.token;
    }

    static start() {
        console.log ('Starting Telegram...');
    }
}

module.exports = Telegram;