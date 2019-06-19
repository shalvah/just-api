module.exports = {
    meta: {
        name: 'suite config inline async valid'
    },
    configuration: {
        host: '127.0.0.1',
        custom_configuration: {
            run_type: 'inline',
            inline: {
                'function':
                    async function() {
                        this.scheme = 'http';
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