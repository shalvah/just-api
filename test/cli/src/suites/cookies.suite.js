module.exports = {
    meta: {
        name: 'Cookies Suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'Add static cookies with request specification',
            request: {
                path: '/echoCookies',
                method: 'get',
                cookies: [
                    {
                        name: 'cookie1',
                        value: 'cookie1-value'
                    },
                    {
                        name: 'cookie2',
                        value: 'cookie2-value'
                    }
                ]
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$.cookie1',
                        value: 'cookie1-value'
                    },
                    {
                        path: '$.cookie2',
                        value: 'cookie2-value'
                    }
                ]
            }
        },
        {
            name: 'add static cookies in hooks',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        function() {
                            this.test.cookies = {cookie1: 'cookie1-value'}
                        }
                }
            },
            request: {
                path: '/echoCookies',
                method: 'get'
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$.cookie1',
                        value: 'cookie1-value'
                    }
                ]
            }
        },
        {
            name: 'run dependency with cookies',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        async function() {
                            var response = await this.runSpec('Add static cookies with request specification', {cookies: {z: 'k'}});
                            var responseData = JSON.parse(response.body);
                            this.test.cookies = responseData;
                        }
                }
            },
            request: {
                path: '/echoCookies',
                method: 'get'
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$.z',
                        value: 'k'
                    }
                ]
            }
        },
        {
            name: 'Validate cookies in response',
            request: {
                path: '/setCookies',
                method: 'post',
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
                            cookie1: 'value1',
                            cookie2: 'value2'
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                cookies: [
                    {
                        name: 'cookie1',
                        value: 'value1'
                    },
                    {
                        name: 'cookie2',
                        value: /[0-9]/
                    }
                ]
            }
        },
        {
            name: 'Validate cookies in response - should fail',
            request: {
                path: '/setCookies',
                method: 'post',
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
                            cookie1: 'value1',
                            cookie2: 'value2'
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                cookies: [
                    {
                        name: 'cookie1',
                        value: 'wrongvalue'
                    }
                ]
            }
        }
    ]
};