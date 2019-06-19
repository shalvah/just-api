module.exports = {
    meta: {
        name: 'After test suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'after test hook inline sync function',
            after_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        function() {
                            var keys = Object.keys(this);
                            if (keys.length !== 5)
                                throw new Error("after test context doesn't have expected keys");

                            var body = JSON.parse(this.response.body);
                            if (body.param1 !== 'value2')
                                throw new Error('unexpected response');
                        }
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'param1',
                        value: 'value2'
                    }
                ]
            },
            response: {
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
            name: 'after test hook inline async function',
            after_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        async function() {
                            var body = JSON.parse(this.response.body);
                            if (body.param1 !== 'value2')
                                throw new Error('unexpected response');
                        }
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'param1',
                        value: 'value2'
                    }
                ]
            },
            response: {
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
            name: 'after test hook module sync function',
            after_test: {
                run_type: 'module',
                module: {
                    module_path: 'modules/after_test.js',
                    function_name: 'afterTestSyncSuccess'
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'param1',
                        value: 'value2'
                    }
                ]
            },
            response: {
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
            name: 'after test hook module async function',
            after_test: {
                run_type: 'module',
                module: {
                    module_path: 'modules/after_test.js',
                    function_name: 'afterTestAsyncSuccess'
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'param1',
                        value: 'value2'
                    }
                ]
            },
            response: {
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
            name: 'after test hook inline sync function throws error - should fail',
            after_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        function() {
                            var body = JSON.parse(this.response.body);
                            if (body.param1 !== 'value2')
                                throw new Error('unexpected response');
                            throw new Error('error thrown in after test hook');
                        }
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'param1',
                        value: 'value2'
                    }
                ]
            },
            response: {
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
            name: 'after test hook inline async function throws error - should fail',
            after_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        async function() {
                            var body = JSON.parse(this.response.body);
                            if (body.param1 !== 'value2')
                                throw new Error('unexpected response');
                            throw new Error('error thrown in after test hook');
                        }
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'param1',
                        value: 'value2'
                    }
                ]
            },
            response: {
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
            name: 'after test hook module sync function throws error - should fail',
            after_test: {
                run_type: 'module',
                module: {
                    module_path: 'modules/after_test.js',
                    function_name: 'afterTestSyncError'
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'param1',
                        value: 'value2'
                    }
                ]
            },
            response: {
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
            name: 'after test hook module async function throws error - should fail',
            after_test: {
                run_type: 'module',
                module: {
                    module_path: 'modules/after_test.js',
                    function_name: 'afterTestAsyncError'
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'param1',
                        value: 'value2'
                    }
                ]
            },
            response: {
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
            name: 'after test hook module async function rejected promise - should fail',
            after_test: {
                run_type: 'module',
                module: {
                    module_path: 'modules/after_test.js',
                    function_name: 'afterTestAsyncRejectedPromise'
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'param1',
                        value: 'value2'
                    }
                ]
            },
            response: {
                json_data: [
                    {
                        path: '$',
                        value: {
                            param1: 'value2'
                        }
                    }
                ]
            }
        }
    ]
};