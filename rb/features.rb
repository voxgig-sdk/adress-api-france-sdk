# AdressApiFrance SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module AdressApiFranceFeatures
  def self.make_feature(name)
    case name
    when "base"
      AdressApiFranceBaseFeature.new
    when "test"
      AdressApiFranceTestFeature.new
    else
      AdressApiFranceBaseFeature.new
    end
  end
end
