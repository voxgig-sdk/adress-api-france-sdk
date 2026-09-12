import { Context } from './Context';
declare class AdressApiFranceError extends Error {
    isAdressApiFranceError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { AdressApiFranceError };
