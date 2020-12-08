import { BaseData } from '../typings';
import Client from './Client';

export default abstract class Base<T extends BaseData> {
    // T is the base data, the neccessary minimum data to construct this object.
    public readonly id: string | number;
    public readonly raw: Partial<T>;
    constructor(public readonly client: Client, data: T) {
        this.id = data.id;
        this.raw = data;
        this.patch(data);
    }
    public abstract patch(data: T | Partial<T>): this;
    private isInData(key: string, data: any) {
        return key in data && data[key] !== undefined;
    }
}
