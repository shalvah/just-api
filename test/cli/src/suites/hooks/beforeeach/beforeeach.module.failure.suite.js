module.exports = {
    meta: {
        name: 'Before each module failure suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    hooks: {
        before_each: {
            run_type: 'module',
            module: {
                function_name: 'beforeEachSyncError',
                module_path: 'modules/before_each.js'
            }
        }
    },
    specs: [
        {
            name: 'get query params',
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
            name: 'get query params again',
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