module.exports = {
    meta: {
        name: 'Invalid spec schema suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'get index html',
            requestdoesnotexist: {
                path: '/',
                method: 'get'
            },
            response: {
                status_code: 200
            }
        }
    ]
};