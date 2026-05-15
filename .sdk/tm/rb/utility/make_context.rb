# AdressApiFrance SDK utility: make_context
require_relative '../core/context'
module AdressApiFranceUtilities
  MakeContext = ->(ctxmap, basectx) {
    AdressApiFranceContext.new(ctxmap, basectx)
  }
end
