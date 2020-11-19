/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Client from './Client';

export default abstract class Base {
    public id: string;
    public raw: any;

    constructor(public client: Client, data: any) {
        this.id = data.id;
        this.raw = data;
    }

    partial(): boolean {
        for (const key in this) {
            if (this[key] === null) return true;
        }
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    abstract _patch(data: any, ...args: any[]): this;
}
