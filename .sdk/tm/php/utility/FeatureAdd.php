<?php
declare(strict_types=1);

// AdressApiFrance SDK utility: feature_add

class AdressApiFranceFeatureAdd
{
    public static function call(AdressApiFranceContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
