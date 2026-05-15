<?php
declare(strict_types=1);

// AdressApiFrance SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AdressApiFranceMakeContext
{
    public static function call(array $ctxmap, ?AdressApiFranceContext $basectx): AdressApiFranceContext
    {
        return new AdressApiFranceContext($ctxmap, $basectx);
    }
}
