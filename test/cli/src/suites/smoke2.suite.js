module.exports = {
    meta: {
        name: 'Smoke suite 2'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'get index html',
            request: {
                path: '/',
                method: 'get'
            },
            response: {
                status_code: 200
            }
        }
    ]
};