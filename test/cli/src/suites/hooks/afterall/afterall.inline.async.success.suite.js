module.exports = {
    meta: {
        name: 'After all inline async success suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    hooks: {
        after_all: {
            run_type: 'inline',
            inline: {
                'function':
                    async function() {
                        var keys = Object.keys(this);
                        if (keys.length !== 3)
                            throw new Error("after all context doesn't have expected keys");
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