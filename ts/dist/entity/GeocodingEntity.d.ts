import { AdressApiFranceEntityBase } from '../AdressApiFranceEntityBase';
import type { AdressApiFranceSDK } from '../AdressApiFranceSDK';
import type { Control } from '../types';
import type { Geocoding, GeocodingListMatch } from '../AdressApiFranceTypes';
declare class GeocodingEntity extends AdressApiFranceEntityBase<Geocoding> {
    constructor(client: AdressApiFranceSDK, entopts: any);
    make(this: GeocodingEntity): GeocodingEntity;
    list(this: any, reqmatch?: GeocodingListMatch, ctrl?: Control): Promise<GeocodingEntity[]>;
}
export { GeocodingEntity };
