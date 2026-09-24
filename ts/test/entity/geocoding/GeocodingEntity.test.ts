

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"geometry":{"a":true,"h":"Geometry","n":"geometry","r":false,"t":"`$OBJECT`","key$":"geometry","index$":0},"properties":{"a":true,"h":"Properties","n":"properties","r":false,"t":"`$OBJECT`","key$":"properties","index$":1},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":2}},"name":"geocoding","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /search","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"autocomplete","or":"autocomplete","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"citycode","or":"citycode","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"lat","or":"lat","r":false,"t":"`$NUMBER`","index$":2},{"a":true,"ex":5,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"lon","or":"lon","r":false,"t":"`$NUMBER`","index$":4},{"a":true,"k":"query","n":"postcode","or":"postcode","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":"8 bd du port","k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/search","q":{"exist":["autocomplete","citycode","lat","limit","lon","postcode","q","type"]},"r":{},"s":[{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.features`"},"index$":0},{"a":true,"co":{"id":"GET /reverse","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":48.856614,"k":"query","n":"lat","or":"lat","r":true,"t":"`$NUMBER`","index$":0},{"a":true,"ex":2.352222,"k":"query","n":"lon","or":"lon","r":true,"t":"`$NUMBER`","index$":1},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/reverse","q":{"exist":["lat","lon","type"]},"r":{},"s":[{"lit":"reverse"}],"t":{"req":"`reqdata`","res":"`body.features`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"geocoding","name__orig":"geocoding","Name":"Geocoding","name_":"geocoding","name-":"geocoding","NAME":"GEOCODING","index$":1}, {"active":true,"entity":"geocoding","key$":"BasicGeocodingFlow","kind":"basic","name":"BasicGeocodingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"geocoding_ref01"}}],"index$":0}]}, 'Geocoding', {"GET /search":{"protocol":"http","operationId":"searchAddress","responses":{"200":{"description":"Successful response with matching addresses","content":{"application/json":{"schema":{"type":"object","properties":{"type":{"example":"FeatureCollection","key$":"type","type":"string"},"version":{"example":"draft","key$":"version","type":"string"},"features":{"items":{"properties":{"geometry":{"properties":{"coordinates":{"example":[2.290084,49.897443],"items":{"type":"number"},"type":"array"},"type":{"example":"Point","type":"string"}},"type":"object","key$":"geometry"},"properties":{"properties":{"city":{"example":"Amiens","type":"string"},"citycode":{"example":"80021","type":"string"},"context":{"example":"80, Somme, Hauts-de-France","type":"string"},"housenumber":{"example":"8","type":"string"},"id":{"example":"80021_6590_00008","type":"string"},"importance":{"example":0.6,"type":"number"},"label":{"example":"8 Boulevard du Port 80000 Amiens","type":"string"},"name":{"example":"8 Boulevard du Port","type":"string"},"postcode":{"example":"80000","type":"string"},"score":{"example":0.49159121588068583,"format":"float","type":"number"},"street":{"example":"Boulevard du Port","type":"string"},"type":{"example":"housenumber","type":"string"},"x":{"example":648952.58,"type":"number"},"y":{"example":6977867.25,"type":"number"}},"type":"object","key$":"properties"},"type":{"example":"Feature","type":"string","key$":"type"}},"type":"object","index$":0},"key$":"features","type":"array"},"attribution":{"example":"BAN","key$":"attribution","type":"string"},"licence":{"example":"ETALAB-2.0","key$":"licence","type":"string"},"query":{"example":"8 bd du port","key$":"query","type":"string"},"limit":{"example":5,"key$":"limit","type":"integer"}}}}}},"400":{"description":"Bad request - invalid parameters"}},"parameters":[{"name":"q","in":"query","description":"The address to search for","required":true,"schema":{"type":"string"},"example":"8 bd du port","index$":0},{"name":"limit","in":"query","description":"Maximum number of results to return","required":false,"schema":{"type":"integer","default":5,"minimum":1,"maximum":20},"index$":1},{"name":"autocomplete","in":"query","description":"Enable autocomplete mode","required":false,"schema":{"type":"integer","enum":[0,1],"default":1},"index$":2},{"name":"lat","in":"query","description":"Latitude for geographic priority","required":false,"schema":{"type":"number","format":"float","minimum":-90,"maximum":90},"index$":3},{"name":"lon","in":"query","description":"Longitude for geographic priority","required":false,"schema":{"type":"number","format":"float","minimum":-180,"maximum":180},"index$":4},{"name":"type","in":"query","description":"Filter by type of result","required":false,"schema":{"type":"string","enum":["housenumber","street","locality","municipality"]},"index$":5},{"name":"postcode","in":"query","description":"Filter by postal code","required":false,"schema":{"type":"string"},"index$":6},{"name":"citycode","in":"query","description":"Filter by INSEE city code","required":false,"schema":{"type":"string"},"index$":7}],"securitySource":"unspecified"},"GET /reverse":{"protocol":"http","operationId":"reverseGeocode","responses":{"200":{"description":"Successful response with address information","content":{"application/json":{"schema":{"type":"object","properties":{"type":{"example":"FeatureCollection","key$":"type","type":"string"},"version":{"example":"draft","key$":"version","type":"string"},"features":{"items":{"properties":{"geometry":{"properties":{"coordinates":{"example":[2.352222,48.856614],"items":{"type":"number"},"type":"array"},"type":{"example":"Point","type":"string"}},"type":"object","key$":"geometry"},"properties":{"properties":{"city":{"example":"Paris","type":"string"},"citycode":{"type":"string"},"context":{"type":"string"},"distance":{"description":"Distance in meters from the requested coordinates","type":"integer"},"housenumber":{"type":"string"},"id":{"type":"string"},"importance":{"type":"number"},"label":{"example":"Musée du Louvre 75001 Paris","type":"string"},"name":{"type":"string"},"postcode":{"example":"75001","type":"string"},"score":{"format":"float","type":"number"},"street":{"type":"string"},"type":{"type":"string"},"x":{"type":"number"},"y":{"type":"number"}},"type":"object","key$":"properties"},"type":{"example":"Feature","type":"string","key$":"type"}},"type":"object","index$":0},"key$":"features","type":"array"},"attribution":{"example":"BAN","key$":"attribution","type":"string"},"licence":{"example":"ETALAB-2.0","key$":"licence","type":"string"},"limit":{"key$":"limit","type":"integer"}}}}}},"400":{"description":"Bad request - invalid coordinates or parameters"}},"parameters":[{"name":"lat","in":"query","description":"Latitude coordinate","required":true,"schema":{"type":"number","format":"float","minimum":-90,"maximum":90},"example":48.856614,"index$":0},{"name":"lon","in":"query","description":"Longitude coordinate","required":true,"schema":{"type":"number","format":"float","minimum":-180,"maximum":180},"example":2.352222,"index$":1},{"name":"type","in":"query","description":"Filter by type of result","required":false,"schema":{"type":"string","enum":["housenumber","street","locality","municipality"]},"index$":2}],"securitySource":"unspecified"}})
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
  
