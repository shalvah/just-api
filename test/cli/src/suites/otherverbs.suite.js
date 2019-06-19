module.exports = {
    meta: {
        name: 'POST raw body requests (json , text, binary )'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'put json data as body',
            request: {
                path: '/echoJSONBodyResponsePut',
                method: 'put',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json'
                    }
                ],
                payload: {
                    body: {
                        type: 'json',
                        content: {
                            key1: 'value1',
                            key2: 'value2'
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$',
                        value: {
                            key1: 'value1',
                            key2: 'value2'
                        }
                    }
                ]
            }
        },
        {
            name: 'patch json data as  body',
            request: {
                path: '/echoJSONBodyResponsePatch',
                method: 'patch',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json'
                    }
                ],
                payload: {
                    body: {
                        type: 'json',
                        content: {
                            key1: 'value1',
                            key2: 'value2'
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$',
                        value: {
                            key1: 'value1',
                            key2: 'value2'
                        }
                    }
                ]
            }
        },
        {
            name: 'delete item',
            request: {
                path: '/echoDeleteQueryParams',
                method: 'delete',
                query_params: [
                    {
                        name: 'p1',
                        value: 'v1'
                    }
                ]
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$',
                        value: {
                            p1: 'v1'
                        }
                    }
                ]
            }
        },
        {
            name: 'HEAD method',
            request: {
                path: '/posts',
                method: 'head'
            },
            response: {
                status_code: 200,
                headers: [
                    {
                        name: 'content-type',
                        value: /application\/json/
                    }
                ]
            }
        },
        {
            name: 'options method',
            request: {
                path: '/posts',
                method: 'options'
            },
            response: {
                status_code: 204,
                headers: [
                    {
                        name: 'Access-Control-Allow-Methods',
                        value: 'GET,HEAD,PUT,PATCH,POST,DELETE'
                    }
                ]
            }
        }
    ]
};