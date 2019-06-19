module.exports = {
    meta: {
        name: 'Retry Suite',
        enabled: true
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'retry returns success after 2 attempts',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        function() {
                            this.test.path_params = { id: 'success' + new Date().getTime() };
                        }
                }
            },
            request: {
                path: '/retry/{id}',
                method: 'get'
            },
            retry: {
                count: 3,
                wait_before_each: 10
            },
            response: {
                status_code: 200
            }
        },
        {
            name: 'retry fails - should fail',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        function() {
                            this.test.path_params = { id: new Date().getTime() };
                        }
                }
            },
            request: {
                path: '/retry/{id}',
                method: 'get'
            },
            retry: {
                count: 3,
                wait_before_each: 10
            },
            response: {
                status_code: 200
            }
        }
    ]
};