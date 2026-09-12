import { AdressApiFranceEntityBase } from '../AdressApiFranceEntityBase';
import type { AdressApiFranceSDK } from '../AdressApiFranceSDK';
import type { Control } from '../types';
import type { BatchGeocoding, BatchGeocodingCreateData } from '../AdressApiFranceTypes';
declare class BatchGeocodingEntity extends AdressApiFranceEntityBase<BatchGeocoding> {
    constructor(client: AdressApiFranceSDK, entopts: any);
    make(this: BatchGeocodingEntity): BatchGeocodingEntity;
    create(this: any, reqdata?: BatchGeocodingCreateData, ctrl?: Control): Promise<BatchGeocodingEntity>;
}
export { BatchGeocodingEntity };
