# AdressApiFrance SDK exists test

require "minitest/autorun"
require_relative "../AdressApiFrance_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AdressApiFranceSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
