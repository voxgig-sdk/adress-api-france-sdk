

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


describe('BatchGeocodingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ADRESS_API_FRANCE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ADRESS_API_FRANCE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AdressApiFranceSDK.test()
    const ent = testsdk.BatchGeocoding()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ADRESS_API_FRANCE_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'batch_geocoding.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"batch_geocoding","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /reverse/csv","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/reverse/csv","q":{},"r":{},"s":[{"lit":"reverse"},{"lit":"csv"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /search/csv","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/search/csv","q":{},"r":{},"s":[{"lit":"search"},{"lit":"csv"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"batch_geocoding","name__orig":"batch_geocoding","Name":"BatchGeocoding","name_":"batch_geocoding","name-":"batch-geocoding","NAME":"BATCH_GEOCODING","index$":0}, {"active":true,"entity":"batch_geocoding","key$":"BasicBatchGeocodingFlow","kind":"basic","name":"BasicBatchGeocodingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"batch_geocoding_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'BatchGeocoding', {"POST /reverse/csv":{"protocol":"http","operationId":"batchReverseGeocodeCSV","requestBody":{"required":true,"content":{"multipart/form-data":{"schema":{"type":"object","required":["data"],"properties":{"data":{"type":"string","format":"binary","description":"CSV file containing coordinates to reverse geocode"},"latitude":{"type":"string","description":"Name of the column containing latitude values (default: 'latitude')","example":"latitude"},"longitude":{"type":"string","description":"Name of the column containing longitude values (default: 'longitude')","example":"longitude"},"result_columns":{"type":"string","description":"Comma-separated list of result columns to include","example":"result_label,result_distance,result_city,result_postcode"}}}}}},"responses":{"200":{"description":"Successful response with reverse geocoded CSV file","content":{"text/csv":{"schema":{"type":"string","format":"binary","description":"CSV file with original data plus reverse geocoding results"}}}},"400":{"description":"Bad request - invalid CSV format or parameters"},"413":{"description":"Payload too large - file size exceeds limit"}},"parameters":[],"securitySource":"unspecified"},"POST /search/csv":{"protocol":"http","operationId":"batchGeocodeCSV","requestBody":{"required":true,"content":{"multipart/form-data":{"schema":{"type":"object","required":["data"],"properties":{"data":{"type":"string","format":"binary","description":"CSV file containing addresses to geocode"},"columns":{"type":"string","description":"Name of the column containing the address (default: 'adresse')","example":"adresse"},"citycode":{"type":"string","description":"Name of the column containing the INSEE city code"},"postcode":{"type":"string","description":"Name of the column containing the postal code"},"result_columns":{"type":"string","description":"Comma-separated list of result columns to include","example":"result_label,result_score,result_type,latitude,longitude"}}}}}},"responses":{"200":{"description":"Successful response with geocoded CSV file","content":{"text/csv":{"schema":{"type":"string","format":"binary","description":"CSV file with original data plus geocoding results"}}}},"400":{"description":"Bad request - invalid CSV format or parameters"},"413":{"description":"Payload too large - file size exceeds limit"}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const batch_geocoding_ref01_ent = client.BatchGeocoding()
    let batch_geocoding_ref01_data = setup.data.new.batch_geocoding['batch_geocoding_ref01']

    batch_geocoding_ref01_data = (await batch_geocoding_ref01_ent.create(batch_geocoding_ref01_data)).data()
    assert(null != batch_geocoding_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/batch_geocoding/BatchGeocodingTestData.json')

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
    ['batch_geocoding01','batch_geocoding02','batch_geocoding03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ADRESS_API_FRANCE_TEST_BATCH_GEOCODING_ENTID': idmap,
    'ADRESS_API_FRANCE_TEST_LIVE': 'FALSE',
    'ADRESS_API_FRANCE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ADRESS_API_FRANCE_TEST_BATCH_GEOCODING_ENTID']

  const live = 'TRUE' === env.ADRESS_API_FRANCE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ADRESS_API_FRANCE_TEST_BATCH_GEOCODING_ENTID']
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
  
