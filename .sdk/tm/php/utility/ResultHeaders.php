<?php
declare(strict_types=1);

// AdressApiFrance SDK utility: result_headers

class AdressApiFranceResultHeaders
{
    public static function call(AdressApiFranceContext $ctx): ?AdressApiFranceResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
