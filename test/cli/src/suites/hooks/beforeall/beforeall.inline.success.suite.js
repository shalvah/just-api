module.exports = {
    meta: {
        name: 'Before all inline success suite'
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
                        var keys = Object.keys(this);
                        if (keys.length !== 3)
                            throw new Error("before all context doesn't have expected keys");
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