
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


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://api-adresse.data.gouv.fr',

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
              "active": true,
              "args": {},
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {},
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
              },
              "index$": 1
            }
          ],
          "key$": "create"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "geocoding": {
      "fields": [
        {
          "active": true,
          "name": "geometry",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 0
        },
        {
          "active": true,
          "name": "property",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 1
        },
        {
          "active": true,
          "name": "type",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        }
      ],
      "name": "geocoding",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": 1,
                    "kind": "query",
                    "name": "autocomplete",
                    "orig": "autocomplete",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "citycode",
                    "orig": "citycode",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "reqd": false,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "example": 5,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "lon",
                    "orig": "lon",
                    "reqd": false,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "postcode",
                    "orig": "postcode",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "8 bd du port",
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
                "res": "`body`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": 48.856614,
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "example": 2.352222,
                    "kind": "query",
                    "name": "lon",
                    "orig": "lon",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
                "res": "`body`"
              },
              "index$": 1
            }
          ],
          "key$": "list"
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

