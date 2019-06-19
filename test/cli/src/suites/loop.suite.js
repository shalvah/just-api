const beforeTest = {
    run_type: 'inline',
    inline: {
        'function': function () {
            this.test.query_params = {param: this.loopItem};
        }
    }
};
const request = {
    path: '/echoQueryParams',
    method: 'get'
};

const response = {
    status_code: 200,
    custom_validator: {
        run_type: 'inline',
        inline: {
            'function':
                function () {
                    var body = JSON.parse(this.response.body);

                    if (body.param !== this.loopItem)
                        throw new Error('body does not have the expected param value');
                }
        }
    }
};

module.exports = {
    meta: {
        name: 'loop suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'static loop test',
            loop: {
                type: 'static',
                'static': [
                    'a',
                    'b'
                ]
            },
            before_test: beforeTest,
            request,
            response
        },
        {
            name: 'loop continues despite iteration failure - should fail one in loop',
            loop: {
                type: 'static',
                'static': [
                    'a',
                    'b'
                ]
            },
            before_test: beforeTest,
            request,
            response: {
                status_code: 200,
                custom_validator: {
                    run_type: 'inline',
                    inline: {
                        'function':
                            function () {
                                var body = JSON.parse(this.response.body);

                                if (body.param === 'a')
                                    throw new Error('failing loop spec on an iteration');
                            }

                    }
                }
            }
        },
        {
            name: 'dynamic inline sync loop test',
            loop: {
                type: 'dynamic',
                dynamic: {
                    run_type: 'inline',
                    inline: {
                        'function':
                            function () {
                                return ['a', 'b'];
                            }
                    }
                }
            },
            before_test: beforeTest,
            request,
            response
        },
        {
            name: 'dynamic inline async loop test',
            loop: {
                type: 'dynamic',
                dynamic: {
                    run_type: 'inline',
                    inline: {
                        'function':
                            async function () {
                                var promise = await new Promise(function (resolve, reject) {
                                    setTimeout(function () {
                                        resolve(['a', 'b'])
                                    }, 3)
                                })
                                return promise;
                            }
                    }
                }
            },
            before_test: beforeTest,
            request,
            response
        },
        {
            name: 'dynamic module sync loop test',
            loop: {
                type: 'dynamic',
                dynamic: {
                    run_type: 'module',
                    module: {
                        module_path: 'modules/loop.js',
                        function_name: 'loopSyncSuccess'
                    }
                }
            },
            before_test: beforeTest,
            request,
            response
        },
        {
            name: 'dynamic module async loop test',
            loop: {
                type: 'dynamic',
                dynamic: {
                    run_type: 'module',
                    module: {
                        module_path: 'modules/loop.js',
                        function_name: 'loopAsyncSuccess'
                    }
                }
            },
            before_test: beforeTest,
            request,
            response
        },
        {
            name: 'loop function failure - should fail',
            loop: {
                type: 'dynamic',
                dynamic: {
                    run_type: 'inline',
                    inline: {
                        'function':
                            function () {
                                throw new Error('error thrown from loop items builder function');
                            }
                    }
                }
            },
            before_test: beforeTest,
            request,
            response
        }
    ]
}