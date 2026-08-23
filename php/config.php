<?php
declare(strict_types=1);

// AdressApiFrance SDK configuration

class AdressApiFranceConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "AdressApiFrance",
                "slug" => "adress-api-france",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api-adresse.data.gouv.fr",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "batch_geocoding" => [],
                    "geocoding" => [],
                ],
            ],
            "entity" => [
        'batch_geocoding' => [
          'fields' => [],
          'name' => 'batch_geocoding',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/reverse/csv',
                  'parts' => [
                    'reverse',
                    'csv',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/search/csv',
                  'parts' => [
                    'search',
                    'csv',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'geocoding' => [
          'fields' => [
            [
              'name' => 'geometry',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'properties',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'type',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'geocoding',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'autocomplete',
                        'orig' => 'autocomplete',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'citycode',
                        'orig' => 'citycode',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 5,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'postcode',
                        'orig' => 'postcode',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '8 bd du port',
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/search',
                  'parts' => [
                    'search',
                  ],
                  'select' => [
                    'exist' => [
                      'autocomplete',
                      'citycode',
                      'lat',
                      'limit',
                      'lon',
                      'postcode',
                      'q',
                      'type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.features`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 48.856614,
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 2.352222,
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/reverse',
                  'parts' => [
                    'reverse',
                  ],
                  'select' => [
                    'exist' => [
                      'lat',
                      'lon',
                      'type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.features`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return AdressApiFranceFeatures::make_feature($name);
    }
}
