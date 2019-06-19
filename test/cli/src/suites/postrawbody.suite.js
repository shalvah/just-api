module.exports = {
    meta: {
        name: 'POST raw body requests (json , text, binary )'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'post json data as  body',
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
                json_data: [
                    {
                        path: '$',
                        value: {
                            key1: 'value1',
                            key2: 'value2',
                            keyn: 4
                        }
                    }
                ]
            }
        },
        {
            name: 'post text data as json body',
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
                            a: 'b'
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$',
                        value: {
                            a: 'b'
                        }
                    }
                ]
            }
        },
        {
            name: 'post json data as  body without header - should fail',
            request: {
                path: '/echoJSONBodyResponse',
                method: 'post',
                payload: {
                    body: {
                        type: 'json',
                        content: {
                            key1: 'value1'
                        }
                    }
                }
            },
            response: {
                status_code: 200,
                json_data: [
                    {
                        path: '$',
                        value: {
                            key1: 'value1'
                        }
                    }
                ]
            }
        },
        {
            name: 'post text data as body',
            request: {
                path: '/echoNonFormBodyTextResponse',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'text/plain'
                    }
                ],
                payload: {
                    body: {
                        type: 'text',
                        content: 'textbody'
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
                                if (this.response.body !== 'textbody') {
                                    throw new Error("Response body not equals 'textbody'");
                                }
                            }
                    }
                }
            }
        },
        {
            name: 'post text data as body with wrong content - should fail',
            request: {
                path: '/echoNonFormBodyTextResponse',
                method: 'post',
                headers: [
                    {
                        name: 'content-type',
                        value: 'application/json'
                    }
                ],
                payload: {
                    body: {
                        type: 'text',
                        content: [
                            'item1'
                        ]
                    }
                }
            },
            response: {
                status_code: 200
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
                        content: 'static/assets/logo.png'
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
            name: 'post binary data (non existant file) as body - should fail',
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
                        content: 'static/assets/doesnotexist.png'
                    }
                }
            },
            response: {
                status_code: 200
            }
        },
        {
            name: 'post binary data (directory path) as body - should fail',
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
                        content: 'static/assets'
                    }
                }
            },
            response: {
                status_code: 200
            }
        }
    ]
};