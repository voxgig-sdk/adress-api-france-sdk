<?php
declare(strict_types=1);

// AdressApiFrance SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class AdressApiFranceFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new AdressApiFranceBaseFeature();
            case "test":
                return new AdressApiFranceTestFeature();
            default:
                return new AdressApiFranceBaseFeature();
        }
    }
}
