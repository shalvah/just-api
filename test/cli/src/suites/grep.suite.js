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
            name: 'grep matches get index html',
            request: {
                path: '/',
                method: 'get'
            },
            response: {
                status_code: 200
            }
        },
        {
            name: 'grep doesnotmatch get index html',
            request: {
                path: '/',
                method: 'get'
            },
            response: {
                status_code: 200
            }
        },
        {
            name: 'grep matches get index html 1',
            request: {
                path: '/',
                method: 'get'
            },
            response: {
                status_code: 200
            }
        },
        {
            name: 'grep doesnotmatch get index html 1',
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