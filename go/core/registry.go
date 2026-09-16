package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewBatchGeocodingEntityFunc func(client *AdressApiFranceSDK, entopts map[string]any) AdressApiFranceEntity

var NewGeocodingEntityFunc func(client *AdressApiFranceSDK, entopts map[string]any) AdressApiFranceEntity

