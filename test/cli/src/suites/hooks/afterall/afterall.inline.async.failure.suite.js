module.exports = {
    meta: {
        name: 'After all inline async failure suite'
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
                        throw new Error("error from after all");
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