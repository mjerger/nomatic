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

    static isObject(item) {
        return (item && 
                typeof item === 'object' && 
                !Array.isArray(item));
    }

    static mergeDeep(target, ...sources) {
        if (!sources.length) 
            return target;
        
        const source = sources.shift();
        if (Utils.isObject(target) && Utils.isObject(source)) {
            for (const key in source) {
                if (Utils.isObject(source[key])) {
                    if (!target[key]) {
                        Object.assign(target, { [key]: {} });
                    }
                    Utils.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }
    
        return Utils.mergeDeep(target, ...sources);
    }
}

module.exports = Utils;