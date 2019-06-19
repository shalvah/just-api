module.exports = {
    meta: {
        name: 'Additional request options'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'post redirect is followed by default',
            request: {
                path: '/redirect302',
                method: 'get'
            },
            response: {
                status_code: 200
            }
        },
        {
            name: 'redirect is not followed - should fail',
            request: {
                path: '/redirect302',
                method: 'get',
                additional_options: {
                    followRedirect: false
                }
            },
            response: {
                status_code: 200
            }
        }
    ]
};