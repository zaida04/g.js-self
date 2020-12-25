import { APIChannel } from '@guildedjs/guilded-api-typings';
import { BaseData } from '../typings';
import type Client from './Client';

/**
 * The base of all structures
 * 
 * @param T The minimum amount of data required to construct this structure
 */
export default abstract class Base<T extends BaseData> {
    /**
     * The ID of this structure
     */
    public readonly id: string;

    /**
     * The raw API data of this structure
     */
    public readonly raw: Partial<T>;
    constructor(public readonly client: Client, data: T, patch = true) {
        this.id = data.id.toString();
        this.raw = data;
        if (patch) this.patch(data);
    }
    
    /**
     * Update the data in this structure
     * @internal
     */
    public abstract patch(data: T | Partial<T>): this;
}
