# frozen_string_literal: true

# Typed models for the AdressApiFrance SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# BatchGeocoding entity data model.
class BatchGeocoding
end

# Request payload for BatchGeocoding#create.
class BatchGeocodingCreateData
end

# Geocoding entity data model.
#
# @!attribute [rw] geometry
#   @return [Hash, nil]
#
# @!attribute [rw] properties
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Geocoding = Struct.new(
  :geometry,
  :properties,
  :type,
  keyword_init: true
)

# Request payload for Geocoding#list.
#
# @!attribute [rw] autocomplete
#   @return [Integer, nil]
#
# @!attribute [rw] citycode
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] postcode
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] type
#   @return [String, nil]
GeocodingListMatch = Struct.new(
  :autocomplete,
  :citycode,
  :lat,
  :limit,
  :lon,
  :postcode,
  :q,
  :type,
  keyword_init: true
)

