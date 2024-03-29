module.exports = {
    meta: {
        name: 'File searching with relative paths',
        locate_files_relative: true
    },
    configuration: {
        host: '127.0.0.1',
        custom_configuration: {
            run_type: 'module',
            module: {
                module_path: './../modules/suite_configuration.js',
                function_name: 'syncSuiteConfig'
            }
        }
    },
    specs: [
        {
            name: 'post multipart form data single file with relative path and field',
            request: {
                path: '/echoMultipartBodySingleFileStats',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'multipart/form-data'
                    }
                ],
                payload: {
                    form_data: [
                        {
                            name: 'file_name',
                            content: './../static/assets/logo.png',
                            type: 'file'
                        },
                        {
                            name: 'field1',
                            content: 'value1',
                            type: 'text'
                        }
                    ]
                }
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$.file.size',
                        value: 12371
                    },
                    {
                        path: '$.file.originalname',
                        value: 'logo.png'
                    },
                    {
                        path: '$.fields',
                        value: {
                            field1: 'value1'
                        }
                    }
                ]
            }
        },
        {
            name: 'post binary data (file) as body',
            request: {
                path: '/echoBinaryBodyResponseStats',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'image/png'
                    }
                ],
                payload: {
                    body: {
                        type: 'binary',
                        content: './../static/assets/logo.png'
                    }
                }
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$.request_content_size',
                        value: 12371
                    }
                ]
            }
        },
        {
            name: 'post non existent binary data (file) as body - should fail',
            request: {
                path: '/echoBinaryBodyResponseStats',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'image/png'
                    }
                ],
                payload: {
                    body: {
                        type: 'binary',
                        content: './../static/assets/logononexistent.png'
                    }
                }
            },
            response: {
                status_code: 200
            }
        },
        {
            name: 'post non existent relative file path binary data (file) as body - should fail',
            request: {
                path: '/echoBinaryBodyResponseStats',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'image/png'
                    }
                ],
                payload: {
                    body: {
                        type: 'binary',
                        content: 'static/assets/logo.png'
                    }
                }
            },
            response: {
                status_code: 200
            }
        },
        {
            name: 'before test hook module relative path',
            before_test: {
                run_type: 'module',
                module: {
                    module_path: './../modules/before_test.js',
                    function_name: 'beforeTestSyncSuccess'
                }
            },
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
            name: 'read json schema from file and validate response',
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
                            key: 'value'
                        }
                    }
                }
            },
            response: {
                json_schema: {
                    type: 'file',
                    $ref: './../static/schema/simple_valid.json'
                }
            }
        }
    ]
};