import { APIChannel } from '@guildedjs/guilded-api-typings';
import { BaseData } from '../typings';
import type Client from './Client';

export default abstract class Base<T extends BaseData> {
    // T is the base data, the neccessary minimum data to construct this object.
    public readonly id: string;
    public readonly raw: Partial<T>;
    constructor(public readonly client: Client, data: T, patch = true) {
        this.id = data.id.toString();
        this.raw = data;
        if (patch) this.patch(data);
    }
    public abstract patch(data: T | Partial<T>): this;
    private isInData(key: string, data: any) {
        return key in data && data[key] !== undefined;
    }
}
