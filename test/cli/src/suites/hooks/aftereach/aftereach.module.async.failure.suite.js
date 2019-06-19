module.exports = {
    meta: {
        name: 'After each module async failure suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    hooks: {
        after_each: {
            run_type: 'module',
            module: {
                function_name: 'afterEachAsyncError',
                module_path: 'modules/after_each.js'
            }
        }
    },
    specs: [
        {
            name: 'get query params',
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
            name: 'get query params again',
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