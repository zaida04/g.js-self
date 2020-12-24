export default class GuildedAPIError extends Error {
    constructor(msg: string, method: string, path: string, code: number | string) {
        super(`[GuildedAPIError:${code}:${method.toUpperCase()}] ${path} - ${msg}`);
        this.message = `[GuildedAPIError:${code}:${method.toUpperCase()}] ${path} - ${msg}`;
    }
}
