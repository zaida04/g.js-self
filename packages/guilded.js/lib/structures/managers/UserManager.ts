import type { APIUser, APIGetUser } from '@guildedjs/guilded-api-typings';

import type { Client } from '../Client';
import {User} from '../User';
import {BaseManager} from './BaseManager';

export class UserManager extends BaseManager<APIUser, User> {
    public constructor(client: Client) {
        super(client, User, { maxSize: client.options?.cache?.cacheMaxSize?.usersCache });
    }

    /**
     * Fetch a user, retrieves from the cache if exists
     */
    public fetch(id: string, cache = true, force = false) {
        const existing = force ? null : this.cache.get(id);
        if (existing) return existing;
        
        return this.client.rest.get<APIGetUser>(`/users/${id}`).then(x => {
            const tempUser = new User(this.client, x.user);
            if(cache) this.client.users.cache.set(tempUser.id, tempUser);
            return tempUser;
        })
    }
}
