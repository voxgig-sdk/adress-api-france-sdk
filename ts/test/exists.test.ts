
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AdressApiFranceSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AdressApiFranceSDK.test()
    equal(testsdk instanceof AdressApiFranceSDK, true,
      'AdressApiFranceSDK.test() must return a client synchronously')
  })

})
