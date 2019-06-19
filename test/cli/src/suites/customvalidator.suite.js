module.exports = {
    meta: {
        name: 'verifying custom validator function'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'inline custom validator sync function',
            request: {
                path: '/echoJSONBodyResponse',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json'
                    }
                ],
                payload: {
                    body: {
                        type: 'json',
                        content: {
                            key1: 'value1',
                            key2: 'value2',
                            keyn: 4
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                custom_validator: {
                    run_type: 'inline',
                    inline: {
                        'function': function() {
                            var keys = Object.keys(this);
                            if (keys.length !== 1 || keys[0] !== 'response')
                                throw new Error("response context is not available in custom validator");

                            if (this.response.constructor.name !== 'IncomingMessage')
                                throw new Error("response is not of type Incoming Message");

                            var body = JSON.parse(this.response.body);
                            if (body.key1 !== 'value1')
                                throw new Error("Value of key1 is not value1");

                            if (!this.response.duration || this.response.duration > 25)
                                throw new Error("Response duration is missing or greater than 25 ms");
                        }
                    }
                }
            }
        },
        {
            name: 'inline custom validator async function',
            request: {
                path: '/echoJSONBodyResponse',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json'
                    }
                ],
                payload: {
                    body: {
                        type: 'json',
                        content: {
                            key1: 'value1',
                            key2: 'value2',
                            keyn: 4
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                custom_validator: {
                    run_type: 'inline',
                    inline: {
                        'function':             async function() {
                            var keys = Object.keys(this);
                            if (keys.length !== 1 || keys[0] !== 'response')
                                throw new Error("response context is not available in custom validator");

                            var startTime = new Date().getTime();
                            var result = await new Promise(function(resolve, reject){
                                setTimeout(function() {resolve(1)}, 7);
                            });
                            var endTime = new Date().getTime();

                            if ((endTime-startTime) < 7)
                                throw new Error("did not wait until promise is resolved");

                            var body = JSON.parse(this.response.body);
                            if (body.key1 !== 'value1')
                                throw new Error("Value of key1 is not value1");
                        }
                    }
                }
            }
        },
        {
            name: 'inline custom validator sync function - should fail',
            request: {
                path: '/echoJSONBodyResponse',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json'
                    }
                ],
                payload: {
                    body: {
                        type: 'json',
                        content: {
                            key1: 'value1',
                            key2: 'value2',
                            keyn: 4
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                custom_validator: {
                    run_type: 'inline',
                    inline: {
                        'function':
                            function() {
                                throw new Error('error thrown from custom validator sync function');
                            }
                    }
                }
            }
        },
        {
            name: 'validate json response with inline custom validator async function - should fail',
            request: {
                path: '/echoJSONBodyResponse',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json'
                    }
                ],
                payload: {
                    body: {
                        type: 'json',
                        content: {
                            key1: 'value1',
                            key2: 'value2',
                            keyn: 4
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                custom_validator: {
                    run_type: 'inline',
                    inline: {
                        'function':
                            async function() {
                                throw new Error('error thrown from custom validator async function');
                            }
                    }
                }
            }
        },
        {
            name: 'inline custom validator async function has rejected promise - should fail',
            request: {
                path: '/echoJSONBodyResponse',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json'
                    }
                ],
                payload: {
                    body: {
                        type: 'json',
                        content: {
                            key1: 'value1',
                            key2: 'value2',
                            keyn: 4
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                custom_validator: {
                    run_type: 'inline',
                    inline: {
                        'function':
                            async function() {
                                var result = await new Promise(function(resolve, reject){
                                    reject('rejected promise');
                                });
                                var endTime = new Date().getTime();
                            }
                    }
                }
            }
        },
        {
            name: 'inline custom validator async function returns rejected promise - should fail',
            request: {
                path: '/echoJSONBodyResponse',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json'
                    }
                ],
                payload: {
                    body: {
                        type: 'json',
                        content: {
                            key1: 'value1',
                            key2: 'value2',
                            keyn: 4
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                custom_validator: {
                    run_type: 'inline',
                    inline: {
                        'function':
                            async function() {
                                return new Promise(function(resolve, reject){
                                    setTimeout(function() { reject('rejected promise') }, 3);
                                });
                            }
                    }
                }
            }
        },
        {
            name: 'custom validator sync function from module',
            request: {
                path: '/echoJSONBodyResponse',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json'
                    }
                ],
                payload: {
                    body: {
                        type: 'json',
                        content: {
                            key1: 'value1',
                            key2: 'value2',
                            keyn: 4
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                custom_validator: {
                    run_type: 'module',
                    module: {
                        module_path: 'modules/custom_validator.js',
                        function_name: 'customValidatorSuccessSync'
                    }
                }
            }
        },
        {
            name: 'custom validator sync function from module - should fail',
            request: {
                path: '/echoJSONBodyResponse',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json'
                    }
                ],
                payload: {
                    body: {
                        type: 'json',
                        content: {
                            key1: 'value1',
                            key2: 'value2',
                            keyn: 4
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                custom_validator: {
                    run_type: 'module',
                    module: {
                        module_path: 'modules/custom_validator.js',
                        function_name: 'customValidatorErrorSync'
                    }
                }
            }
        },
        {
            name: 'custom validator async function from module',
            request: {
                path: '/echoJSONBodyResponse',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json'
                    }
                ],
                payload: {
                    body: {
                        type: 'json',
                        content: {
                            key1: 'value1',
                            key2: 'value2',
                            keyn: 4
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                custom_validator: {
                    run_type: 'module',
                    module: {
                        module_path: 'modules/custom_validator.js',
                        function_name: 'customValidatorSuccessAsync'
                    }
                }
            }
        },
        {
            name: 'custom validator async function from module - should fail',
            request: {
                path: '/echoJSONBodyResponse',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json'
                    }
                ],
                payload: {
                    body: {
                        type: 'json',
                        content: {
                            key1: 'value1',
                            key2: 'value2',
                            keyn: 4
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                custom_validator: {
                    run_type: 'module',
                    module: {
                        module_path: 'modules/custom_validator.js',
                        function_name: 'customValidatorErrorAsync'
                    }
                }
            }
        },
        {
            name: 'module custom validator async function has rejected promise - should fail',
            request: {
                path: '/echoJSONBodyResponse',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json'
                    }
                ],
                payload: {
                    body: {
                        type: 'json',
                        content: {
                            key1: 'value1',
                            key2: 'value2',
                            keyn: 4
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                custom_validator: {
                    run_type: 'module',
                    module: {
                        module_path: 'modules/custom_validator.js',
                        function_name: 'customValidatorErrorAsyncRejectedPromise'
                    }
                }
            }
        },
        {
            name: 'module custom validator async function returns rejected promise - should fail',
            request: {
                path: '/echoJSONBodyResponse',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json'
                    }
                ],
                payload: {
                    body: {
                        type: 'json',
                        content: {
                            key1: 'value1',
                            key2: 'value2',
                            keyn: 4
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                custom_validator: {
                    run_type: 'module',
                    module: {
                        module_path: 'modules/custom_validator.js',
                        function_name: 'customValidatorErrorAsyncReturnRejectedPromise'
                    }
                }
            }
        }
    ]
};