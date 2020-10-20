export default class GuildedJSError extends Error {
    constructor(msg: string) {
        super(`GuildedJSError: ${msg}`);
    }
}
