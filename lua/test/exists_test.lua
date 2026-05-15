-- ProjectName SDK exists test

local sdk = require("adress-api-france_sdk")

describe("AdressApiFranceSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
