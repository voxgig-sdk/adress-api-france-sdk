# ProjectName SDK exists test

import pytest
from adressapifrance_sdk import AdressApiFranceSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AdressApiFranceSDK.test(None, None)
        assert testsdk is not None
