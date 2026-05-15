package = "voxgig-sdk-adress-api-france"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/adress-api-france-sdk.git"
}
description = {
  summary = "AdressApiFrance SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["adress-api-france_sdk"] = "adress-api-france_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
