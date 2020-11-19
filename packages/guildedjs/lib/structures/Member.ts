import { APIMember } from '@guildedjs/guilded-api-typings';

import Base from './Base';
import Client from './Client';
import User from './User';

export default class Member extends Base {
    public user: User | string;

    constructor(client: Client, data: APIMember) {
        super(client, data);
        this.user = this.client.users.add(data.id);
        this._patch(data);
    }
    _patch(data: any): this {
        return this;
    }
}
