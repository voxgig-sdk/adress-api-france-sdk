# AdressApiFrance SDK utility: make_context

from projectname_sdk.core.context import AdressApiFranceContext


def make_context_util(ctxmap, basectx):
    return AdressApiFranceContext(ctxmap, basectx)
