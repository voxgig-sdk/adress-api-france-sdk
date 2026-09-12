export interface BatchGeocoding {
}
export interface BatchGeocodingCreateData {
}
export interface Geocoding {
    geometry?: Record<string, any>;
    properties?: Record<string, any>;
    type?: string;
}
export interface GeocodingListMatch {
    autocomplete?: number;
    citycode?: string;
    lat?: number;
    limit?: number;
    lon?: number;
    postcode?: string;
    q: string;
    type?: string;
}
