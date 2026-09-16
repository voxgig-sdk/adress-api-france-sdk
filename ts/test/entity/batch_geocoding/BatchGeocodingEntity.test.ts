

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"batch_geocoding","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /reverse/csv","json":"{\"operationId\":\"batchReverseGeocodeCSV\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"multipart/form-data\":{\"schema\":{\"properties\":{\"data\":{\"description\":\"CSV file containing coordinates to reverse geocode\",\"format\":\"binary\",\"type\":\"string\"},\"latitude\":{\"description\":\"Name of the column containing latitude values (default: 'latitude')\",\"example\":\"latitude\",\"type\":\"string\"},\"longitude\":{\"description\":\"Name of the column containing longitude values (default: 'longitude')\",\"example\":\"longitude\",\"type\":\"string\"},\"result_columns\":{\"description\":\"Comma-separated list of result columns to include\",\"example\":\"result_label,result_distance,result_city,result_postcode\",\"type\":\"string\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"text/csv\":{\"schema\":{\"description\":\"CSV file with original data plus reverse geocoding results\",\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response with reverse geocoded CSV file\"},\"400\":{\"description\":\"Bad request - invalid CSV format or parameters\"},\"413\":{\"description\":\"Payload too large - file size exceeds limit\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/reverse/csv","segments":[{"lit":"reverse"},{"lit":"csv"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"POST /search/csv","json":"{\"operationId\":\"batchGeocodeCSV\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"multipart/form-data\":{\"schema\":{\"properties\":{\"citycode\":{\"description\":\"Name of the column containing the INSEE city code\",\"type\":\"string\"},\"columns\":{\"description\":\"Name of the column containing the address (default: 'adresse')\",\"example\":\"adresse\",\"type\":\"string\"},\"data\":{\"description\":\"CSV file containing addresses to geocode\",\"format\":\"binary\",\"type\":\"string\"},\"postcode\":{\"description\":\"Name of the column containing the postal code\",\"type\":\"string\"},\"result_columns\":{\"description\":\"Comma-separated list of result columns to include\",\"example\":\"result_label,result_score,result_type,latitude,longitude\",\"type\":\"string\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"text/csv\":{\"schema\":{\"description\":\"CSV file with original data plus geocoding results\",\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response with geocoded CSV file\"},\"400\":{\"description\":\"Bad request - invalid CSV format or parameters\"},\"413\":{\"description\":\"Payload too large - file size exceeds limit\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/search/csv","segments":[{"lit":"search"},{"lit":"csv"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"batch_geocoding","name__orig":"batch_geocoding","Name":"BatchGeocoding","name_":"batch_geocoding","name-":"batch-geocoding","NAME":"BATCH_GEOCODING","index$":0}, {"active":true,"entity":"batch_geocoding","key$":"BasicBatchGeocodingFlow","kind":"basic","name":"BasicBatchGeocodingFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"batch_geocoding_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'BatchGeocoding')
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
  
