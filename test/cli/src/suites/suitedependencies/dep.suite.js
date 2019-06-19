module.exports = {
    meta: {
        name: 'dependency suite',
        locate_files_relative: true
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'dep disabled',
            enabled: false,
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'q',
                        value: 'interdepvalue'
                    }
                ]
            },
            response: {
                status_code: 400
            }
        },
        {
            name: 'dep enabled',
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'q',
                        value: 'interdepvalue_from_enabled'
                    }
                ]
            },
            response: {
                status_code: 200
            }
        },
        {
            name: 'post binary data file',
            request: {
                path: '/echoBinaryBodyResponseStats',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'image/png'
                    }
                ],
                payload: {
                    body: {
                        type: 'binary',
                        content: './../../static/assets/logo.png'
                    }
                }
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$.request_content_size',
                        value: 12371
                    }
                ]
            }
        }
    ]
};