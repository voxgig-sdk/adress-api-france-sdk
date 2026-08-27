<?php
declare(strict_types=1);

// Typed models for the AdressApiFrance SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** BatchGeocoding entity data model. */
class BatchGeocoding
{
}

/** Request payload for BatchGeocoding#create. */
class BatchGeocodingCreateData
{
}

/** Geocoding entity data model. */
class Geocoding
{
    public ?array $geometry = null;
    public ?array $properties = null;
    public ?string $type = null;
}

/** Request payload for Geocoding#list. */
class GeocodingListMatch
{
    public ?int $autocomplete = null;
    public ?string $citycode = null;
    public ?float $lat = null;
    public ?int $limit = null;
    public ?float $lon = null;
    public ?string $postcode = null;
    public string $q;
    public ?string $type = null;
}

