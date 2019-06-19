module.exports = {
    meta: {
        name: 'URLEncoded Form POST requests'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'post form data as body',
            request: {
                path: '/posts',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/x-www-form-urlencoded'
                    }
                ],
                payload: {
                    form: {
                        title: 'post title',
                        body: 'post body',
                        userId: 1
                    }
                }
            },
            response: {
                status_code: 201,
                json_data: [
                    {
                        path: '$.title',
                        value: 'post title'
                    },
                    {
                        path: '$.body',
                        value: 'post body'
                    },
                    {
                        path: '$.userId',
                        value: '1'
                    }
                ]
            }
        },
        {
            name: 'post form data as body without header - should fail',
            request: {
                path: '/posts',
                method: 'post',
                payload: {
                    form: {
                        title: 'post title',
                        body: 'post body',
                        userId: 1
                    }
                }
            },
            response: {
                status_code: 201
            }
        },
        {
            name: 'post form data as body with wrong header - should fail',
            request: {
                path: '/posts',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/wrongheadertype'
                    }
                ],
                payload: {
                    form: {
                        title: 'post title',
                        body: 'post body',
                        userId: 1
                    }
                }
            },
            response: {
                status_code: 201
            }
        }
    ]
};