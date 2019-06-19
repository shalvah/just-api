module.exports = {
    meta: {
        name: 'HTTPS suite'
    },
    configuration: {
        scheme: 'https',
        host: 'google.com'
    },
    specs: [
        {
            name: 'get google https',
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