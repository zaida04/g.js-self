import { BaseData } from '../typings/BaseData';
import Client from './Client';

export default abstract class Base {
    public id: string;
    public raw: any;

    constructor(public client: Client, data: BaseData) {
        this.id = data.id;
        this.raw = data;
    }

    partial(): boolean {
        for (const key in this) {
            if (this[key] === null) return true;
        }
        return false;
    }

    abstract _patch(data: any, ...args: any[]): this;
}
