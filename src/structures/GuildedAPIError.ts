export default class GuildedAPIError extends Error {
    constructor(msg: string, method: string, path: string) {
        super(`GuildedAPIError - ${method.toUpperCase()} ${path}:\n${msg}`);
    }
}
