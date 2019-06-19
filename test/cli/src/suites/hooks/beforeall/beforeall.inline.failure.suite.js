module.exports = {
    meta: {
        name: 'Before all inline failure suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    hooks: {
        before_all: {
            run_type: 'inline',
            inline: {
                'function':
                    function() {
                        throw new Error('error from before all');
                    }
            }
        }
    },
    specs: [
        {
            name: 'get home',
            request: {
                path: '/',
                method: 'get'
            },
            response: {
                status_code: 200
            }
        }
    ]
};