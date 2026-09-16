# AdressApiFrance SDK feature factory

from adressapifrance_sdk.feature.base_feature import AdressApiFranceBaseFeature
from adressapifrance_sdk.feature.ratelimit_feature import AdressApiFranceRatelimitFeature
from adressapifrance_sdk.feature.retry_feature import AdressApiFranceRetryFeature
from adressapifrance_sdk.feature.test_feature import AdressApiFranceTestFeature
from adressapifrance_sdk.feature.timeout_feature import AdressApiFranceTimeoutFeature


_FEATURES = {
    "base": lambda: AdressApiFranceBaseFeature(),
    "ratelimit": lambda: AdressApiFranceRatelimitFeature(),
    "retry": lambda: AdressApiFranceRetryFeature(),
    "test": lambda: AdressApiFranceTestFeature(),
    "timeout": lambda: AdressApiFranceTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
