module.exports = {
    meta: {
        name: 'suite config inline sync throws error'
    },
    configuration: {
        host: '127.0.0.1',
        custom_configuration: {
            run_type: 'inline',
            inline: {
                'function':
                    function() {
                        this.scheme = 'http';
                        throw new Error('error thrown from suite custom configuration');
                        this.port = 3027;
                    }
            }
        }
    },
    specs: [
        {
            name: 'basic request',
            request: {
                path: '/echoHeaders',
                method: 'get'
            },
            response: {
                status_code: 200
            }
        }
    ]
};