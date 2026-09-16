

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AdressApiFranceSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GeocodingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ADRESS_API_FRANCE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ADRESS_API_FRANCE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AdressApiFranceSDK.test()
    const ent = testsdk.Geocoding()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ADRESS_API_FRANCE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'geocoding.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"geometry","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"properties","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"name":"type","req":false,"type":"`$STRING`","index$":2}],"name":"geocoding","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"autocomplete","orig":"autocomplete","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"citycode","orig":"citycode","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"lat","orig":"lat","reqd":false,"type":"`$NUMBER`","index$":2},{"active":true,"example":5,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"kind":"query","name":"lon","orig":"lon","reqd":false,"type":"`$NUMBER`","index$":4},{"active":true,"kind":"query","name":"postcode","orig":"postcode","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"example":"8 bd du port","kind":"query","name":"q","orig":"q","reqd":true,"type":"`$STRING`","index$":6},{"active":true,"kind":"query","name":"type","orig":"type","reqd":false,"type":"`$STRING`","index$":7}]},"contract":{"id":"GET /search","json":"{\"operationId\":\"searchAddress\",\"parameters\":[{\"description\":\"The address to search for\",\"example\":\"8 bd du port\",\"in\":\"query\",\"name\":\"q\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Maximum number of results to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":5,\"maximum\":20,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Enable autocomplete mode\",\"in\":\"query\",\"name\":\"autocomplete\",\"required\":false,\"schema\":{\"default\":1,\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"Latitude for geographic priority\",\"in\":\"query\",\"name\":\"lat\",\"required\":false,\"schema\":{\"format\":\"float\",\"maximum\":90,\"minimum\":-90,\"type\":\"number\"}},{\"description\":\"Longitude for geographic priority\",\"in\":\"query\",\"name\":\"lon\",\"required\":false,\"schema\":{\"format\":\"float\",\"maximum\":180,\"minimum\":-180,\"type\":\"number\"}},{\"description\":\"Filter by type of result\",\"in\":\"query\",\"name\":\"type\",\"required\":false,\"schema\":{\"enum\":[\"housenumber\",\"street\",\"locality\",\"municipality\"],\"type\":\"string\"}},{\"description\":\"Filter by postal code\",\"in\":\"query\",\"name\":\"postcode\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by INSEE city code\",\"in\":\"query\",\"name\":\"citycode\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"attribution\":{\"example\":\"BAN\",\"type\":\"string\"},\"features\":{\"items\":{\"properties\":{\"geometry\":{\"properties\":{\"coordinates\":{\"example\":[2.290084,49.897443],\"items\":{\"type\":\"number\"},\"type\":\"array\"},\"type\":{\"example\":\"Point\",\"type\":\"string\"}},\"type\":\"object\"},\"properties\":{\"properties\":{\"city\":{\"example\":\"Amiens\",\"type\":\"string\"},\"citycode\":{\"example\":\"80021\",\"type\":\"string\"},\"context\":{\"example\":\"80, Somme, Hauts-de-France\",\"type\":\"string\"},\"housenumber\":{\"example\":\"8\",\"type\":\"string\"},\"id\":{\"example\":\"80021_6590_00008\",\"type\":\"string\"},\"importance\":{\"example\":0.6,\"type\":\"number\"},\"label\":{\"example\":\"8 Boulevard du Port 80000 Amiens\",\"type\":\"string\"},\"name\":{\"example\":\"8 Boulevard du Port\",\"type\":\"string\"},\"postcode\":{\"example\":\"80000\",\"type\":\"string\"},\"score\":{\"example\":0.49159121588068583,\"format\":\"float\",\"type\":\"number\"},\"street\":{\"example\":\"Boulevard du Port\",\"type\":\"string\"},\"type\":{\"example\":\"housenumber\",\"type\":\"string\"},\"x\":{\"example\":648952.58,\"type\":\"number\"},\"y\":{\"example\":6977867.25,\"type\":\"number\"}},\"type\":\"object\"},\"type\":{\"example\":\"Feature\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"licence\":{\"example\":\"ETALAB-2.0\",\"type\":\"string\"},\"limit\":{\"example\":5,\"type\":\"integer\"},\"query\":{\"example\":\"8 bd du port\",\"type\":\"string\"},\"type\":{\"example\":\"FeatureCollection\",\"type\":\"string\"},\"version\":{\"example\":\"draft\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with matching addresses\"},\"400\":{\"description\":\"Bad request - invalid parameters\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/search","segments":[{"lit":"search"}],"select":{"exist":["autocomplete","citycode","lat","limit","lon","postcode","q","type"]},"transform":{"req":"`reqdata`","res":"`body.features`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":48.856614,"kind":"query","name":"lat","orig":"lat","reqd":true,"type":"`$NUMBER`","index$":0},{"active":true,"example":2.352222,"kind":"query","name":"lon","orig":"lon","reqd":true,"type":"`$NUMBER`","index$":1},{"active":true,"kind":"query","name":"type","orig":"type","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /reverse","json":"{\"operationId\":\"reverseGeocode\",\"parameters\":[{\"description\":\"Latitude coordinate\",\"example\":48.856614,\"in\":\"query\",\"name\":\"lat\",\"required\":true,\"schema\":{\"format\":\"float\",\"maximum\":90,\"minimum\":-90,\"type\":\"number\"}},{\"description\":\"Longitude coordinate\",\"example\":2.352222,\"in\":\"query\",\"name\":\"lon\",\"required\":true,\"schema\":{\"format\":\"float\",\"maximum\":180,\"minimum\":-180,\"type\":\"number\"}},{\"description\":\"Filter by type of result\",\"in\":\"query\",\"name\":\"type\",\"required\":false,\"schema\":{\"enum\":[\"housenumber\",\"street\",\"locality\",\"municipality\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"attribution\":{\"example\":\"BAN\",\"type\":\"string\"},\"features\":{\"items\":{\"properties\":{\"geometry\":{\"properties\":{\"coordinates\":{\"example\":[2.352222,48.856614],\"items\":{\"type\":\"number\"},\"type\":\"array\"},\"type\":{\"example\":\"Point\",\"type\":\"string\"}},\"type\":\"object\"},\"properties\":{\"properties\":{\"city\":{\"example\":\"Paris\",\"type\":\"string\"},\"citycode\":{\"type\":\"string\"},\"context\":{\"type\":\"string\"},\"distance\":{\"description\":\"Distance in meters from the requested coordinates\",\"type\":\"integer\"},\"housenumber\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"importance\":{\"type\":\"number\"},\"label\":{\"example\":\"Musée du Louvre 75001 Paris\",\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"postcode\":{\"example\":\"75001\",\"type\":\"string\"},\"score\":{\"format\":\"float\",\"type\":\"number\"},\"street\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"},\"x\":{\"type\":\"number\"},\"y\":{\"type\":\"number\"}},\"type\":\"object\"},\"type\":{\"example\":\"Feature\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"licence\":{\"example\":\"ETALAB-2.0\",\"type\":\"string\"},\"limit\":{\"type\":\"integer\"},\"type\":{\"example\":\"FeatureCollection\",\"type\":\"string\"},\"version\":{\"example\":\"draft\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with address information\"},\"400\":{\"description\":\"Bad request - invalid coordinates or parameters\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/reverse","segments":[{"lit":"reverse"}],"select":{"exist":["lat","lon","type"]},"transform":{"req":"`reqdata`","res":"`body.features`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"geocoding","name__orig":"geocoding","Name":"Geocoding","name_":"geocoding","name-":"geocoding","NAME":"GEOCODING","index$":1}, {"active":true,"entity":"geocoding","key$":"BasicGeocodingFlow","kind":"basic","name":"BasicGeocodingFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"geocoding_ref01"}}],"index$":0}]}, 'Geocoding')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let geocoding_ref01_data = Object.values(setup.data.existing.geocoding)[0] as any

    // LIST
    const geocoding_ref01_ent = client.Geocoding()
    const geocoding_ref01_match: any = {}

    const geocoding_ref01_list = (await geocoding_ref01_ent.list(geocoding_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/geocoding/GeocodingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AdressApiFranceSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['geocoding01','geocoding02','geocoding03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ADRESS_API_FRANCE_TEST_GEOCODING_ENTID': idmap,
    'ADRESS_API_FRANCE_TEST_LIVE': 'FALSE',
    'ADRESS_API_FRANCE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ADRESS_API_FRANCE_TEST_GEOCODING_ENTID']

  const live = 'TRUE' === env.ADRESS_API_FRANCE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ADRESS_API_FRANCE_TEST_GEOCODING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AdressApiFranceSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.ADRESS_API_FRANCE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
