// Adapted from https://github.com/discordjs/discord.js/blob/master/typings/index.d.ts#L2051

/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructable<T> = new (...args: any[]) => T;
