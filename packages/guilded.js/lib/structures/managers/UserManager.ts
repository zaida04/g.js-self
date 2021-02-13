import { APIUser, FetchUser } from '@guildedjs/guilded-api-typings';

import Client from '../Client';
import User from '../User';
import BaseManager from './BaseManager';

export default class UserManager extends BaseManager<APIUser, User> {
    constructor(client: Client) {
        super(client, User);
    }

    /**
     * Fetch a user, retrieves from the cache if exists
     */
    fetch(id: string, cache = true) {
        const existing = this.cache.get(id);
        if (existing) return existing;
        return this.client.rest.get<FetchUser>(`/users/${id}`).then(x => {
            const tempUser = new User(this.client, x.user);
            return tempUser;
        })
    }
}
