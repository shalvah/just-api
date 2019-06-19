module.exports = {
    meta: {
        name: 'Interdep suite with relative path',
        locate_files_relative: true
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    spec_dependencies: [
        './dep.suite.js'
    ],
    specs: [
        {
            name: 'inter dependency relative path',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        async function() {
                            var response = await this.runSpec('dep disabled');
                            var prevQueryParams = JSON.parse(response.body);
                            this.test.query_params = { k:  prevQueryParams.q };
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
                        path: '$.k',
                        value: 'interdepvalue'
                    }
                ]
            }
        },
        {
            name: 'inter dependency relative path file upload',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        async function() {
                            var response = await this.runSpec('post binary data file', { validateResponse: true });
                            this.test.query_params = { k: 'interdepvalue' };
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
                        path: '$.k',
                        value: 'interdepvalue'
                    }
                ]
            }
        }
    ]
};