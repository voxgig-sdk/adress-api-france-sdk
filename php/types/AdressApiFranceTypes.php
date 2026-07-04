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

/** Match filter for BatchGeocoding#create (any subset of BatchGeocoding fields). */
class BatchGeocodingCreateData
{
}

/** Geocoding entity data model. */
class Geocoding
{
    public ?array $geometry = null;
    public ?array $property = null;
    public ?string $type = null;
}

/** Match filter for Geocoding#list (any subset of Geocoding fields). */
class GeocodingListMatch
{
    public ?array $geometry = null;
    public ?array $property = null;
    public ?string $type = null;
}

