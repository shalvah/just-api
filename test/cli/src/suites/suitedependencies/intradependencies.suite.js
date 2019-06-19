module.exports = {
    meta: {
        name: 'Status code suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'dep disabled',
            enabled: false,
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'q',
                        value: 'valuefromdep'
                    }
                ]
            },
            response: {
                status_code: 400
            }
        },
        {
            name: 'beforetest hook intra-dependent',
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
                        value: 'valuefromdep'
                    }
                ]
            }
        },
        {
            name: 'beforetest hook intra-dependent validate response - should fail',
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
                        value: 'valuefromdep'
                    }
                ]
            }
        },
        {
            name: 'dep enabled',
            request: {
                path: '/echoQueryParams',
                method: 'get',
                query_params: [
                    {
                        name: 'q',
                        value: 'valuefromenableddep'
                    }
                ]
            },
            response: {
                status_code: 200
            }
        },
        {
            name: 'beforetest hook intra-dependent enabled',
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
                        value: 'valuefromenableddep'
                    }
                ]
            }
        },
        {
            name: 'beforetest hook intra-dependent error in hook - should fail',
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
                        value: 'valuefromenableddep'
                    }
                ]
            }
        },
        {
            name: 'beforetest hook intra-dependent no matching spec - should fail',
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