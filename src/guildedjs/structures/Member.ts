import { BaseData } from '../typings/BaseData';
import Base from './Base';
import Client from './Client';
import User from './User';

export default class Member extends Base {
    public user: User | string;

    constructor(client: Client, data: BaseData) {
        super(client, data);
        this.user = this.client.users.cache.has(data.id) ? this.client.users.cache.get(data.id)! : data.id;
        this._patch(data);
    }
    _patch(data: any): this {
        return this;
    }
}
