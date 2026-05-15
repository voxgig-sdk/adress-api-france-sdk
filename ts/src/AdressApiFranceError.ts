
import { Context } from './Context'


class AdressApiFranceError extends Error {

  isAdressApiFranceError = true

  sdk = 'AdressApiFrance'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  AdressApiFranceError
}

