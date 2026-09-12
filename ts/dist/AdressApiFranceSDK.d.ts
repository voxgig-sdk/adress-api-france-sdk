import { BatchGeocodingEntity } from './entity/BatchGeocodingEntity';
import { GeocodingEntity } from './entity/GeocodingEntity';
export type * from './AdressApiFranceTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AdressApiFranceEntityBase } from './AdressApiFranceEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class AdressApiFranceSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    BatchGeocoding(entopts?: Record<string, any>): BatchGeocodingEntity;
    Geocoding(entopts?: Record<string, any>): GeocodingEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AdressApiFranceSDK;
    tester(testopts?: any, sdkopts?: any): AdressApiFranceSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AdressApiFranceSDK;
export { stdutil, config, BaseFeature, AdressApiFranceEntityBase, AdressApiFranceSDK, SDK, };
