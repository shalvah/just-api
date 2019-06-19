module.exports = {
    meta: {
        name: 'Before test suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'before test hook inline sync function',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        function() {
                            var keys = Object.keys(this);
                            if (keys.length !== 4)
                                throw new Error("before test context doesn't have expected keys");

                            this.test.query_params = { param1: 'value2' };
                        }
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get'
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
            name: 'before test hook inline async function',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        async function() {
                            this.test.query_params = { param1: 'value2' };
                        }
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get'
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
            name: 'before test hook module sync function',
            before_test: {
                run_type: 'module',
                module: {
                    module_path: 'modules/before_test.js',
                    function_name: 'beforeTestSyncSuccess'
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get'
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
            name: 'before test hook module async function',
            before_test: {
                run_type: 'module',
                module: {
                    module_path: 'modules/before_test.js',
                    function_name: 'beforeTestAsyncSuccess'
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get'
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
            name: 'before test hook inline sync function throws error - should fail',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        function() {
                            this.test.query_params = { param1: 'value2' };
                            throw new Error('error thrown in before test hook');
                        }
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get'
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
            name: 'before test hook inline async function throws error - should fail',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        async function() {
                            this.test.query_params = { param1: 'value2' };
                            throw new Error('error thrown in before test hook');
                        }
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get'
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
            name: 'before test hook module sync function throws error - should fail',
            before_test: {
                run_type: 'module',
                module: {
                    module_path: 'modules/before_test.js',
                    function_name: 'beforeTestSyncError'
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get'
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
            name: 'before test hook module async function throws error - should fail',
            before_test: {
                run_type: 'module',
                module: {
                    module_path: 'modules/before_test.js',
                    function_name: 'beforeTestAsyncError'
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get'
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
            name: 'before test hook module async function rejected promise - should fail',
            before_test: {
                run_type: 'module',
                module: {
                    module_path: 'modules/before_test.js',
                    function_name: 'beforeTestAsyncRejectedPromise'
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get'
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