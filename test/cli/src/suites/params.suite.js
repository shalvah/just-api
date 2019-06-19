module.exports = {
    meta: {
        name: 'Params suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'static query params in request',
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'param1',
                        value: 'value1'
                    }
                ]
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$',
                        value: {
                            param1: 'value1'
                        }
                    }
                ]
            }
        },
        {
            name: 'multiple static query params in request',
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'param1',
                        value: 'value1'
                    },
                    {
                        name: 'param2',
                        value: 'value2'
                    }
                ]
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$',
                        value: {
                            param1: 'value1',
                            param2: 'value2'
                        }
                    }
                ]
            }
        },
        {
            name: 'query params added to test context',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        function() {
                            this.test.query_params = { param2: 'value2' };
                        }
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get'
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$',
                        value: {
                            param2: 'value2'
                        }
                    }
                ]
            }
        },
        {
            name: 'query params overidden in test context',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        function() {
                            this.test.query_params = { param1: 'value2' };
                        }
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'param1',
                        value: 'value1'
                    }
                ]
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$',
                        value: {
                            param1: 'value2'
                        }
                    }
                ]
            }
        },
        {
            name: 'static path params in request',
            request: {
                path: '/echoPathParams/{id1}',
                method: 'get',
                path_params: [
                    {
                        name: 'id1',
                        value: 'value1'
                    }
                ]
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$',
                        value: [
                            'value1'
                        ]
                    }
                ]
            }
        },
        {
            name: 'multiple static path params in request',
            request: {
                path: '/echoPathParams/{id1}/{id2}',
                method: 'get',
                path_params: [
                    {
                        name: 'id1',
                        value: 'value1'
                    },
                    {
                        name: 'id2',
                        value: 'value2'
                    }
                ]
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$',
                        value: [
                            'value1',
                            'value2'
                        ]
                    }
                ]
            }
        },
        {
            name: 'path params added to test context',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        function() {
                            this.test.path_params = { id1: 'value2' };
                        }
                }
            },
            request: {
                path: '/echoPathParams/{id1}',
                method: 'get'
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$',
                        value: [
                            'value2'
                        ]
                    }
                ]
            }
        },
        {
            name: 'path params overidden in test context',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        function() {
                            this.test.path_params = { id1: 'value2' };
                        }
                }
            },
            request: {
                path: '/echoPathParams/{id1}',
                method: 'get',
                path_params: [
                    {
                        name: 'id1',
                        value: 'value1'
                    }
                ]
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$',
                        value: [
                            'value2'
                        ]
                    }
                ]
            }
        }
    ]
};