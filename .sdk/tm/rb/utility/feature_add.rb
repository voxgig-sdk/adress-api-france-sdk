# AdressApiFrance SDK utility: feature_add
module AdressApiFranceUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
