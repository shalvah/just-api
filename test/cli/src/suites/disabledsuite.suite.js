module.exports = {
    meta: {
        name: 'dependency suite',
        enabled: false
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'get query params',
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'q',
                        value: 'v'
                    }
                ]
            },
            response: {
                status_code: 200
            }
        }
    ]
};