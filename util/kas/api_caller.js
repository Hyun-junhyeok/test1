const request = require('request')

class ApiCaller {
    constructor(endpoint) {
        this.endpoint = endpoint
    }

    async call(options) {
        options.url = this.endpoint + options.url
        options.json = true

        if (!options.headers)
            options.headers = {}
        
        options.headers['x-chain-id'] = '8217'
        options.headers['content-type'] = 'application/json'
        options.headers['Authorization'] = 'Basic S0FTSzkxU0dSQkVGVlhBQ1JYQ0w0NVpMOmlfN01qS1VPSTdlVWctbVdUWHZGcVdfaF9KeEk2' +
                'eTUwdU4tVEVLUW8='

        return new Promise((resolve, reject) => {
            request(options, (error, _response, body) => {
                if (error) 
                    reject(error)
                else 
                    resolve(body)
            })
        })
    }
}

module.exports = ApiCaller