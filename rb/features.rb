# AdressApiFrance SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AdressApiFranceFeatures
  def self.make_feature(name)
    case name
    when "base"
      AdressApiFranceBaseFeature.new
    when "ratelimit"
      AdressApiFranceRatelimitFeature.new
    when "retry"
      AdressApiFranceRetryFeature.new
    when "test"
      AdressApiFranceTestFeature.new
    when "timeout"
      AdressApiFranceTimeoutFeature.new
    else
      AdressApiFranceBaseFeature.new
    end
  end
end
