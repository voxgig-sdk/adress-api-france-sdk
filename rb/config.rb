# AdressApiFrance SDK configuration

module AdressApiFranceConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "AdressApiFrance",
        "slug" => "adress-api-france",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api-adresse.data.gouv.fr",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "batch_geocoding" => {},
          "geocoding" => {},
        },
      },
      "entity" => {
        "batch_geocoding" => {
          "fields" => [],
          "name" => "batch_geocoding",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/reverse/csv",
                  "segments" => [
                    {
                      "lit" => "reverse",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "parts" => [
                    "reverse",
                    "csv",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/search/csv",
                  "segments" => [
                    {
                      "lit" => "search",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "parts" => [
                    "search",
                    "csv",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "geocoding" => {
          "fields" => [
            {
              "name" => "geometry",
              "title" => "Geometry",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "properties",
              "title" => "Properties",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$STRING`",
            },
          ],
          "name" => "geocoding",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/search",
                  "segments" => [
                    {
                      "lit" => "search",
                    },
                  ],
                  "parts" => [
                    "search",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.features`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "autocomplete",
                        "orig" => "autocomplete",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1,
                      },
                      {
                        "name" => "citycode",
                        "orig" => "citycode",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "lat",
                        "orig" => "lat",
                        "type" => "`$NUMBER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 5,
                      },
                      {
                        "name" => "lon",
                        "orig" => "lon",
                        "type" => "`$NUMBER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "postcode",
                        "orig" => "postcode",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "q",
                        "orig" => "q",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "8 bd du port",
                      },
                      {
                        "name" => "type",
                        "orig" => "type",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "autocomplete",
                      "citycode",
                      "lat",
                      "limit",
                      "lon",
                      "postcode",
                      "q",
                      "type",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/reverse",
                  "segments" => [
                    {
                      "lit" => "reverse",
                    },
                  ],
                  "parts" => [
                    "reverse",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.features`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "lat",
                        "orig" => "lat",
                        "type" => "`$NUMBER`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => 48.856614,
                      },
                      {
                        "name" => "lon",
                        "orig" => "lon",
                        "type" => "`$NUMBER`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => 2.352222,
                      },
                      {
                        "name" => "type",
                        "orig" => "type",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "lat",
                      "lon",
                      "type",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    AdressApiFranceFeatures.make_feature(name)
  end
end
