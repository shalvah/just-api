module.exports = {
    meta: {
        name: 'After each inline async success suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    hooks: {
        after_each: {
            run_type: 'inline',
            inline: {
                'function':
                    async function() {
                        var keys = Object.keys(this);
                        if (keys.length !== 5)
                            throw new Error("after each context doesn't have expected keys");

                        var body = JSON.parse(this.response.body);
                        if (body.param1 !== 'value2')
                            throw new Error('unexpected response');
                    }
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