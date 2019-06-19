module.exports = {
    meta: {
        name: 'Before each inline async success suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    hooks: {
        before_each: {
            run_type: 'inline',
            inline: {
                'function':
                    async function() {
                        var keys = Object.keys(this);
                        if (keys.length !== 4)
                            throw new Error("before each context doesn't have expected keys");

                        this.test.query_params = { param1: 'value2' };
                    }
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