module.exports = {
    meta: {
        name: 'Response JSON schema validation suite'
    },
    configuration: {
        scheme: 'http',
        host: '127.0.0.1',
        port: 3027
    },
    specs: [
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
                    $ref: 'static/schema/simple_valid.json'
                }
            }
        },
        {
            name: 'read json schema from file and validate response - should fail',
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
                    $ref: 'static/schema/simple_invalid.json'
                }
            }
        },
        {
            name: 'read json schema from non existant file and validate response - should fail',
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
                    $ref: 'static/schema/doesnotexist.json'
                }
            }
        },
        {
            name: 'read inline json schema and validate response',
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
                    type: 'inline',
                    $ref: '{  "$id": "http://example.com/example.json",\n  "type": "object",\n  "$schema": "http://json-schema.org/draft-06/schema#",\n  "properties": {\n    "key": {\n      "$id": "/properties/key",\n      "type": "string"\n    }\n  }\n}\n'
                }
            }
        },
        {
            name: 'read inline invalid json schema and validate response - should fail',
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
                    type: 'inline',
                    $ref: '{  "$id": "http://example.com/example.json",\n  "type": "object",\n  "$schema": "http://json-schema.org/draft-06/schema#",\n  "properties": {\n    "key": {\n      "$id": "/properties/key",\n      "type": "number"\n    }\n  }\n}\n'
                }
            }
        },
        {
            name: 'read junk json schema from file and validate response - should fail',
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
                    $ref: 'static/schema/junk_simple_valid.json'
                }
            }
        },
        {
            name: 'invalid input schema  - should fail',
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
                    type: 'inline',
                    $ref: '{  ladjfj"$id": "http://example.com/example.json",\n  "type": "object",\n  "$schema": "http://json-schema.org/draft-06/schema#",\n  "properties": {\n    "key": {\n      "$id": "/properties/key",\n      "type": "string"\n    }\n  }\n}\n'
                }
            }
        }
    ]
};