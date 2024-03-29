module.exports = {
    meta: {
        name: 'Testing headers',
        enabled: true,
        version: '1.0'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027,
        common_headers: [
            {
                name: 'customsuiteheader',
                value: 'custom-suite-header-value'
            }
        ]
    },
    specs: [
        {
            name: 'add suite headers to request headers',
            request: {
                path: '/echoHeaders',
                method: 'get'
            },
            response: {
                json_data: [
                    {
                        path: '$.customsuiteheader',
                        value: 'custom-suite-header-value'
                    }
                ]
            }
        },
        {
            name: 'ignore suite headers',
            ignore_suite_headers: true,
            request: {
                path: '/echoHeaders',
                method: 'get'
            },
            response: {
                custom_validator: {
                    run_type: 'inline',
                    inline: {
                        'function':
                            function() {
                                let body = JSON.parse(this.response.body);

                                if (body.customsuiteheader)
                                    throw new Error('common suite header is received in response');
                            }
                    }
                }
            }
        },
        {
            name: 'validate response json header with value',
            request: {
                path: '/echoHeaders',
                method: 'get'
            },
            response: {
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json; charset=utf-8'
                    }
                ]
            }
        },
        {
            name: 'validate response headers - should fail',
            request: {
                path: '/echoHeaders',
                method: 'get'
            },
            response: {
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/xml'
                    }
                ]
            }
        },
        {
            name: 'validate response headers - with regex',
            request: {
                path: '/echoHeaders',
                method: 'get'
            },
            response: {
                headers: [
                    {
                        name: 'content-type',
                        value: /application\/json/
                    }
                ]
            }
        },
        {
            name: 'validate response headers - with regex should fail',
            request: {
                path: '/echoHeaders',
                method: 'get'
            },
            response: {
                headers: [
                    {
                        name: 'content-type',
                        value: /application\/xml/
                    }
                ]
            }
        },
        {
            name: 'send headers specified in request',
            request: {
                path: '/echoHeaders',
                method: 'get',
                headers: [
                    {
                        name: 'header1',
                        value: 'header1-value'
                    }
                ]
            },
            response: {
                json_data: [
                    {
                        path: '$.header1',
                        value: 'header1-value'
                    }
                ]
            }
        },
        {
            name: 'send headers specified in before test hook',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        function() {
                            this.test.headers = { header2: 'header2-value' };
                        }
                }
            },
            request: {
                path: '/echoHeaders',
                method: 'get',
                headers: [
                    {
                        name: 'header1',
                        value: 'header1-value'
                    }
                ]
            },
            response: {
                json_data: [
                    {
                        path: '$.header2',
                        value: 'header2-value'
                    },
                    {
                        path: '$.header1',
                        value: 'header1-value'
                    }
                ]
            }
        },
        {
            name: 'override headers specified in before test hook',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        function() {
                            this.test.headers = { header1: 'header2-value' };
                        }
                }
            },
            request: {
                path: '/echoHeaders',
                method: 'get',
                headers: [
                    {
                        name: 'header1',
                        value: 'header1-value'
                    }
                ]
            },
            response: {
                json_data: [
                    {
                        path: '$.header1',
                        value: 'header2-value'
                    }
                ]
            }
        }
    ]
};