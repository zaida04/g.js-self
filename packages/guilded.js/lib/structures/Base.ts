import { BaseData } from '../typings';

export default abstract class Base<T extends BaseData> {
    // T is the base data, the neccessary minimum data to construct this object.
    public id: string;
    public raw: T;
    constructor(data: T) {
        this.id = data.id;
        this.raw = data;
    }
    public abstract patch(data: T): this;
}
