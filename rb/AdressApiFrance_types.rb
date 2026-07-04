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

# Match filter for BatchGeocoding#create (any subset of BatchGeocoding fields).
class BatchGeocodingCreateData
end

# Geocoding entity data model.
#
# @!attribute [rw] geometry
#   @return [Hash, nil]
#
# @!attribute [rw] property
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Geocoding = Struct.new(
  :geometry,
  :property,
  :type,
  keyword_init: true
)

# Match filter for Geocoding#list (any subset of Geocoding fields).
#
# @!attribute [rw] geometry
#   @return [Hash, nil]
#
# @!attribute [rw] property
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
GeocodingListMatch = Struct.new(
  :geometry,
  :property,
  :type,
  keyword_init: true
)

