# AdressApiFrance SDK utility: make_context

from adressapifrance_sdk.core.context import AdressApiFranceContext


def make_context_util(ctxmap, basectx):
    return AdressApiFranceContext(ctxmap, basectx)
