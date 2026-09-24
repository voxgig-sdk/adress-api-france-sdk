"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdressApiFranceError = void 0;
class AdressApiFranceError extends Error {
    isAdressApiFranceError = true;
    sdk = 'AdressApiFrance';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.AdressApiFranceError = AdressApiFranceError;
//# sourceMappingURL=AdressApiFranceError.js.map