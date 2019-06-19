module.exports = {
    meta: {
        name: 'Multipart Form POST requests'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'post multipart form data single file and field',
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
                            content: 'static/assets/logo.png',
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
            name: 'post multipart form data multiple files and fields',
            request: {
                path: '/echoMultipartBodyMultipleFileStats',
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
                            name: 'img1',
                            content: 'static/assets/logo.png',
                            type: 'file'
                        },
                        {
                            name: 'img2',
                            content: 'static/assets/chow.jpg',
                            type: 'file'
                        },
                        {
                            name: 'field1',
                            content: 'value1',
                            type: 'text'
                        },
                        {
                            name: 'field2',
                            content: 'value2',
                            type: 'text'
                        }
                    ]
                }
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$.fields',
                        value: {
                            field1: 'value1',
                            field2: 'value2'
                        }
                    },
                    {
                        path: '$.files[0].originalname',
                        value: 'logo.png'
                    },
                    {
                        path: '$.files[1].originalname',
                        value: 'chow.jpg'
                    },
                    {
                        path: '$.files[0].size',
                        value: 12371
                    },
                    {
                        path: '$.files[1].size',
                        value: 10032
                    }
                ]
            }
        },
        {
            name: 'post multipart form data single file and json text as field with options',
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
                            content: 'static/assets/logo.png',
                            type: 'file'
                        },
                        {
                            name: 'field1',
                            content: {
                                key: 'value'
                            },
                            options: {
                                contentType: 'application/json'
                            },
                            type: 'json'
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
                            field1: '{"key":"value"}'
                        }
                    }
                ]
            }
        },
        {
            name: 'post multipart form data single file and field without header - should fail',
            request: {
                path: '/echoMultipartBodySingleFileStats',
                method: 'post',
                payload: {
                    form_data: [
                        {
                            name: 'file_name',
                            content: 'static/assets/logo.png',
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
                status_code: 200
            }
        },
        {
            name: 'post multipart form data single non existant file and field - should fail',
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
                            content: 'static/assets/logodoesnotexist.png',
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
                status_code: 200
            }
        },
        {
            name: 'post multipart form data single directory as file and field - should fail',
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
                            content: 'static/assets',
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
                status_code: 200
            }
        }
    ]
};