module.exports = {
    meta: {
        name: 'Status code suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'correct response code',
            request: {
                path: '/',
                method: 'get'
            },
            response: {
                status_code: 200
            }
        },
        {
            name: 'incorrect response code - should fail',
            request: {
                path: '/',
                method: 'get'
            },
            response: {
                status_code: 400
            }
        }
    ]
};