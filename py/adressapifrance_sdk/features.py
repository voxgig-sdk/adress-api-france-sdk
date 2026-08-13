# AdressApiFrance SDK feature factory

from adressapifrance_sdk.feature.base_feature import AdressApiFranceBaseFeature
from adressapifrance_sdk.feature.test_feature import AdressApiFranceTestFeature


def _make_feature(name):
    features = {
        "base": lambda: AdressApiFranceBaseFeature(),
        "test": lambda: AdressApiFranceTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
