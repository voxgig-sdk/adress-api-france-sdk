package voxgigadressapifrancesdk

import (
	"github.com/voxgig-sdk/adress-api-france-sdk/core"
	"github.com/voxgig-sdk/adress-api-france-sdk/entity"
	"github.com/voxgig-sdk/adress-api-france-sdk/feature"
	_ "github.com/voxgig-sdk/adress-api-france-sdk/utility"
)

// Type aliases preserve external API.
type AdressApiFranceSDK = core.AdressApiFranceSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AdressApiFranceEntity = core.AdressApiFranceEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AdressApiFranceError = core.AdressApiFranceError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBatchGeocodingEntityFunc = func(client *core.AdressApiFranceSDK, entopts map[string]any) core.AdressApiFranceEntity {
		return entity.NewBatchGeocodingEntity(client, entopts)
	}
	core.NewGeocodingEntityFunc = func(client *core.AdressApiFranceSDK, entopts map[string]any) core.AdressApiFranceEntity {
		return entity.NewGeocodingEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAdressApiFranceSDK = core.NewAdressApiFranceSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
