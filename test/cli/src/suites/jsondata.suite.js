module.exports = {
    meta: {
        name: 'verifying JSON data suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
        {
            name: 'validate json response with json data functionality',
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
                            keyn: 4,
                            keyBoolean: false,
                            keyNull: null
                        }
                    }
                }
            },
            response: {
                json_data: [
                    {
                        path: '$.key2',
                        value: 'value2'
                    },
                    {
                        path: '$.keyBoolean',
                        value: false
                    },
                    {
                        path: '$.keyNull',
                        value: null
                    }
                ]
            }
        },
        {
            name: 'validate json response with json data functionality - should fail',
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
                            keyn: 4,
                            keyBoolean: false,
                            keyNull: null
                        }
                    }
                }
            },
            response: {
                json_data: [
                    {
                        path: '$.key2',
                        value: 'wrongvalue'
                    }
                ]
            }
        },
        {
            name: 'validate json response with json data functionality regex',
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
                            keyn: 4,
                            keyBoolean: false,
                            keyNull: null
                        }
                    }
                }
            },
            response: {
                json_data: [
                    {
                        path: '$.key2',
                        value: /value(\d)/
                    }
                ]
            }
        },
        {
            name: 'should fail when json data regex does not match the value',
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
                            keyn: 4,
                            keyBoolean: false,
                            keyNull: null
                        }
                    }
                }
            },
            response: {
                json_data: [
                    {
                        path: '$.key2',
                        value: /valuex(\d)/
                    }
                ]
            }
        },
        {
            name: 'validate json response with multiple json data expectations',
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
                            keyn: 4,
                            keyBoolean: false,
                            keyNull: null
                        }
                    }
                }
            },
            response: {
                json_data: [
                    {
                        path: '$.key2',
                        value: /value(\d)/
                    },
                    {
                        path: '$.key1',
                        value: 'value1'
                    },
                    {
                        path: '$.keyn',
                        value: 4
                    }
                ]
            }
        },
        {
            name: 'validate json response with json data value as object',
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
                            keyn: 4,
                            keyBoolean: false,
                            keyNull: null
                        }
                    }
                }
            },
            response: {
                json_data: [
                    {
                        path: '$',
                        value: {
                            key1: 'value1',
                            key2: 'value2',
                            keyn: 4,
                            keyBoolean: false,
                            keyNull: null
                        }
                    }
                ]
            }
        },
        {
            name: 'validate json response with json data value as non matching object - should fail',
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
                            keyn: 4,
                            keyBoolean: false,
                            keyNull: null
                        }
                    }
                }
            },
            response: {
                json_data: [
                    {
                        path: '$',
                        value: {
                            key1: 'value1',
                            key2: 'value3',
                            keyn: 4,
                            keyBoolean: false,
                            keyNull: null
                        }
                    }
                ]
            }
        },
        {
            name: 'validate json response with json data value as Array',
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
                        content: [
                            'item1',
                            'item2'
                        ]
                    }
                }
            },
            response: {
                json_data: [
                    {
                        path: '$',
                        value: [
                            'item1',
                            'item2'
                        ]
                    }
                ]
            }
        },
        {
            name: 'validate json response with json data value as non matching Array - should fail',
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
                        content: [
                            'item1',
                            'item2'
                        ]
                    }
                }
            },
            response: {
                json_data: [
                    {
                        path: '$',
                        value: [
                            'item1',
                            'item2',
                            'item3'
                        ]
                    }
                ]
            }
        }
    ]
};