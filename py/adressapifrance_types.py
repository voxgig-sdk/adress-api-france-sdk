# Typed models for the AdressApiFrance SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class BatchGeocoding:
    pass


@dataclass
class BatchGeocodingCreateData:
    pass


@dataclass
class Geocoding:
    geometry: Optional[dict] = None
    property: Optional[dict] = None
    type: Optional[str] = None


@dataclass
class GeocodingListMatch:
    geometry: Optional[dict] = None
    property: Optional[dict] = None
    type: Optional[str] = None

