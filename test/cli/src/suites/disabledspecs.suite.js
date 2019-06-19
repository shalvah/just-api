module.exports = {
    meta: {
        name: 'grep suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'disabled',
            enabled: false,
            request: {
                path: '/',
                method: 'get'
            },
            response: {
                status_code: 200
            }
        },
        {
            name: 'enabled default',
            request: {
                path: '/',
                method: 'get'
            },
            response: {
                status_code: 200
            }
        },
        {
            name: 'enabled with spec',
            enabled: true,
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