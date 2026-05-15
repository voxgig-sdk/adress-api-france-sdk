<?php
declare(strict_types=1);

// AdressApiFrance SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

AdressApiFranceUtility::setRegistrar(function (AdressApiFranceUtility $u): void {
    $u->clean = [AdressApiFranceClean::class, 'call'];
    $u->done = [AdressApiFranceDone::class, 'call'];
    $u->make_error = [AdressApiFranceMakeError::class, 'call'];
    $u->feature_add = [AdressApiFranceFeatureAdd::class, 'call'];
    $u->feature_hook = [AdressApiFranceFeatureHook::class, 'call'];
    $u->feature_init = [AdressApiFranceFeatureInit::class, 'call'];
    $u->fetcher = [AdressApiFranceFetcher::class, 'call'];
    $u->make_fetch_def = [AdressApiFranceMakeFetchDef::class, 'call'];
    $u->make_context = [AdressApiFranceMakeContext::class, 'call'];
    $u->make_options = [AdressApiFranceMakeOptions::class, 'call'];
    $u->make_request = [AdressApiFranceMakeRequest::class, 'call'];
    $u->make_response = [AdressApiFranceMakeResponse::class, 'call'];
    $u->make_result = [AdressApiFranceMakeResult::class, 'call'];
    $u->make_point = [AdressApiFranceMakePoint::class, 'call'];
    $u->make_spec = [AdressApiFranceMakeSpec::class, 'call'];
    $u->make_url = [AdressApiFranceMakeUrl::class, 'call'];
    $u->param = [AdressApiFranceParam::class, 'call'];
    $u->prepare_auth = [AdressApiFrancePrepareAuth::class, 'call'];
    $u->prepare_body = [AdressApiFrancePrepareBody::class, 'call'];
    $u->prepare_headers = [AdressApiFrancePrepareHeaders::class, 'call'];
    $u->prepare_method = [AdressApiFrancePrepareMethod::class, 'call'];
    $u->prepare_params = [AdressApiFrancePrepareParams::class, 'call'];
    $u->prepare_path = [AdressApiFrancePreparePath::class, 'call'];
    $u->prepare_query = [AdressApiFrancePrepareQuery::class, 'call'];
    $u->result_basic = [AdressApiFranceResultBasic::class, 'call'];
    $u->result_body = [AdressApiFranceResultBody::class, 'call'];
    $u->result_headers = [AdressApiFranceResultHeaders::class, 'call'];
    $u->transform_request = [AdressApiFranceTransformRequest::class, 'call'];
    $u->transform_response = [AdressApiFranceTransformResponse::class, 'call'];
});
