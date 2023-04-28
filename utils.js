const Axios   = require('axios')

class Utils {
    static async get(host, path) {
        const url = `http://${host}${path}`;
        const response = await Axios.get(url).catch(e => console.error("GET: " + e));
        if (response)
            return response.data;
    }

    static async post(host, path, json = {}) {
        const url = `http://${host}${path}`;
        const response = await Axios.post(url, json).catch(e => console.error("POST: " + e));
        if (response) 
            return response.data;
    }
}

module.exports = Utils;