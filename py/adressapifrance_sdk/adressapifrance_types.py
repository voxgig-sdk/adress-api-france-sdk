# Typed models for the AdressApiFrance SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class BatchGeocoding(TypedDict):
    pass


class BatchGeocodingCreateData(TypedDict):
    pass


class Geocoding(TypedDict, total=False):
    geometry: dict
    properties: dict
    type: str


class GeocodingListMatchRequired(TypedDict):
    q: str


class GeocodingListMatch(GeocodingListMatchRequired, total=False):
    autocomplete: int
    citycode: str
    lat: float
    limit: int
    lon: float
    postcode: str
    type: str
