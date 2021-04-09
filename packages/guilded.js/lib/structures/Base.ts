import type { BaseData } from '../typings';
import type { Client } from './Client';

/**
 * The base of all structures
 *
 * @param T The minimum amount of data required to construct this structure
 */
export abstract class Base<T extends BaseData> {
    /**
     * The ID of this structure
     */
    public readonly id: string;

    /**
     * The raw API data of this structure
     */
    public readonly raw: Partial<T>;

    public constructor(public readonly client: Client, data: T) {
        this.id = data.id.toString();
        this.raw = data;
    }

    /**
     * Update the data in this structure
     * @internal
     */
    public abstract patch(data: T | Partial<T>): this;

    /**
     * Taken from https://github.com/discordjs/discord.js/blob/8e8d9b490a71de6cabe6f16375d7549a7c5c3737/src/structures/Base.js#L20
     * Licensed under the Apache License 2.0 <https://github.com/discordjs/discord.js/blob/8e8d9b490a71de6cabe6f16375d7549a7c5c3737/LICENSE>
     */
    public _clone(): this {
        return Object.assign(Object.create(this), this);
    }
}
