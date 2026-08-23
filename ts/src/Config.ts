
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'AdressApiFrance',
        slug: "adress-api-france",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api-adresse.data.gouv.fr",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      batch_geocoding: {
      },

      geocoding: {
      },

    }
  }


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
              "parts": [
                "reverse",
                "csv"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/search/csv",
              "parts": [
                "search",
                "csv"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "search"
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
              }
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
              "parts": [
                "reverse"
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
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

