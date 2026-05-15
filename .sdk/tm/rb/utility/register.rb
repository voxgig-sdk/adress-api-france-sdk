# AdressApiFrance SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AdressApiFranceUtility.registrar = ->(u) {
  u.clean = AdressApiFranceUtilities::Clean
  u.done = AdressApiFranceUtilities::Done
  u.make_error = AdressApiFranceUtilities::MakeError
  u.feature_add = AdressApiFranceUtilities::FeatureAdd
  u.feature_hook = AdressApiFranceUtilities::FeatureHook
  u.feature_init = AdressApiFranceUtilities::FeatureInit
  u.fetcher = AdressApiFranceUtilities::Fetcher
  u.make_fetch_def = AdressApiFranceUtilities::MakeFetchDef
  u.make_context = AdressApiFranceUtilities::MakeContext
  u.make_options = AdressApiFranceUtilities::MakeOptions
  u.make_request = AdressApiFranceUtilities::MakeRequest
  u.make_response = AdressApiFranceUtilities::MakeResponse
  u.make_result = AdressApiFranceUtilities::MakeResult
  u.make_point = AdressApiFranceUtilities::MakePoint
  u.make_spec = AdressApiFranceUtilities::MakeSpec
  u.make_url = AdressApiFranceUtilities::MakeUrl
  u.param = AdressApiFranceUtilities::Param
  u.prepare_auth = AdressApiFranceUtilities::PrepareAuth
  u.prepare_body = AdressApiFranceUtilities::PrepareBody
  u.prepare_headers = AdressApiFranceUtilities::PrepareHeaders
  u.prepare_method = AdressApiFranceUtilities::PrepareMethod
  u.prepare_params = AdressApiFranceUtilities::PrepareParams
  u.prepare_path = AdressApiFranceUtilities::PreparePath
  u.prepare_query = AdressApiFranceUtilities::PrepareQuery
  u.result_basic = AdressApiFranceUtilities::ResultBasic
  u.result_body = AdressApiFranceUtilities::ResultBody
  u.result_headers = AdressApiFranceUtilities::ResultHeaders
  u.transform_request = AdressApiFranceUtilities::TransformRequest
  u.transform_response = AdressApiFranceUtilities::TransformResponse
}
