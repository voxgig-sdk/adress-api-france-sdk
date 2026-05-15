-- AdressApiFrance SDK error

local AdressApiFranceError = {}
AdressApiFranceError.__index = AdressApiFranceError


function AdressApiFranceError.new(code, msg, ctx)
  local self = setmetatable({}, AdressApiFranceError)
  self.is_sdk_error = true
  self.sdk = "AdressApiFrance"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function AdressApiFranceError:error()
  return self.msg
end


function AdressApiFranceError:__tostring()
  return self.msg
end


return AdressApiFranceError
