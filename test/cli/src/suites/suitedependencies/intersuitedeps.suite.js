module.exports = {
    meta: {
        name: 'Status code suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    spec_dependencies: [
        'suites/suitedependencies/dep.suite.js'
    ],
    specs: [
        {
            name: 'beforetest hook inter-dependent',
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
            name: 'beforetest hook inter-dependent validate response - should fail',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        async function() {
                            var response = await this.runSpec('dep disabled', { validateResponse: true });
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
            name: 'beforetest hook inter-dependent enabled',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        async function() {
                            var response = await this.runSpec('dep enabled');
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
                        value: 'interdepvalue_from_enabled'
                    }
                ]
            }
        },
        {
            name: 'beforetest hook inter-dependent error in hook - should fail',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        async function() {
                            var response = await this.runSpec('dep enabled');
                            var prevQueryParams = JSON.parse(response.bodya);
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
                        value: 'interdepvalue_from_enabled'
                    }
                ]
            }
        },
        {
            name: 'beforetest hook inter-dependent no matching spec - should fail',
            before_test: {
                run_type: 'inline',
                inline: {
                    'function':
                        async function() {
                            var response = await this.runSpec('no spec');
                            var prevQueryParams = JSON.parse(response.bodya);
                            this.test.query_params = { k:  prevQueryParams.q };
                        }
                }
            },
            request: {
                path: '/echoQueryParams',
                method: 'get'
            },
            response: {
                status_code: 200
            }
        }
    ]
};