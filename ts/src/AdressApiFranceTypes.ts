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
  properties?: Record<string, any>
  type?: string
}

export interface GeocodingListMatch {
  autocomplete?: number
  citycode?: string
  lat?: number
  limit?: number
  lon?: number
  postcode?: string
  q: string
  type?: string
}

