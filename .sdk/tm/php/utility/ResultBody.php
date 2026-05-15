<?php
declare(strict_types=1);

// AdressApiFrance SDK utility: result_body

class AdressApiFranceResultBody
{
    public static function call(AdressApiFranceContext $ctx): ?AdressApiFranceResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
