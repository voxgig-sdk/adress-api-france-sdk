// Typed models for the AdressApiFrance SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface BatchGeocoding {
}

export interface BatchGeocodingCreateData {
}

export interface Geocoding {
  geometry?: Record<string, any>
  property?: Record<string, any>
  type?: string
}

export interface GeocodingListMatch {
  geometry?: Record<string, any>
  property?: Record<string, any>
  type?: string
}

