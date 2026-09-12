"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'AdressApiFrance',
        slug: "adress-api-france",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://api-adresse.data.gouv.fr",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            batch_geocoding: {},
            geocoding: {},
        }
    };
    entity = {
        "batch_geocoding": {
            "fields": [],
            "name": "batch_geocoding",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/reverse/csv",
                            "segments": [
                                {
                                    "lit": "reverse"
                                },
                                {
                                    "lit": "csv"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "reverse",
                                "csv"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/search/csv",
                            "segments": [
                                {
                                    "lit": "search"
                                },
                                {
                                    "lit": "csv"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "search",
                                "csv"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "geocoding": {
            "fields": [
                {
                    "name": "geometry",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "properties",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "type",
                    "type": "`$STRING`"
                }
            ],
            "name": "geocoding",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "autocomplete",
                                        "orig": "autocomplete",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "citycode",
                                        "orig": "citycode",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "lat",
                                        "orig": "lat",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": 5,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "lon",
                                        "orig": "lon",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "postcode",
                                        "orig": "postcode",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "8 bd du port",
                                        "kind": "query",
                                        "name": "q",
                                        "orig": "q",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/search",
                            "segments": [
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "autocomplete",
                                    "citycode",
                                    "lat",
                                    "limit",
                                    "lon",
                                    "postcode",
                                    "q",
                                    "type"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.features`"
                            },
                            "parts": [
                                "search"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 48.856614,
                                        "kind": "query",
                                        "name": "lat",
                                        "orig": "lat",
                                        "reqd": true,
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": 2.352222,
                                        "kind": "query",
                                        "name": "lon",
                                        "orig": "lon",
                                        "reqd": true,
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/reverse",
                            "segments": [
                                {
                                    "lit": "reverse"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "lat",
                                    "lon",
                                    "type"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.features`"
                            },
                            "parts": [
                                "reverse"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map