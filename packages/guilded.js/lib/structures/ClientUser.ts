import type { APIClientUser, APIDevice, APIUser } from '@guildedjs/guilded-api-typings';

import type { Client } from './Client';
import { User } from './User';

/**
 * The user belonging to this client
 */
export class ClientUser extends User {
    /**
     * List of users that this client has blocked
     */
    public blockedUsers: any[];

    /**
     * Connections with other social media this client has
     */
    public socialLinks: any[];

    /**
     * Badges this client owns
     */
    public badges: any[];

    /**
     * The type of presence this client has
     */
    public userPresenceStatus!: number;

    /**
     * Information regarding the devices that have been used with this client
     */
    public devices: APIDevice[];

    public constructor(client: Client, data: APIClientUser) {
        super(client, data as APIUser);
        this.blockedUsers = data.blockedUsers ?? [];
        this.socialLinks = data.socialLinks ?? [];
        this.badges = data.badges ?? [];
        this.userPresenceStatus = data.userPresenceStatus;
        this.devices = data.devices ?? [];

        this.patch(data);
    }

    /**
     * Update the data in this structure
     * @internal
     */
    public patch(data: APIClientUser): this {
        return this;
    }

    public setPresence(presence: 'online' | 'idle' | 'dnd' | 'invisible'): Promise<this> {
        const newPresence = PRECENSES[presence];
        if (!newPresence) {
            throw new TypeError(
                `Incorrect status option. Expected online, idle, dnd, or invisible. Recieved ${presence}`,
            );
        }

        return this.client.rest.post('/users/me/presence', { status: newPresence }).then(() => {
            this.userPresenceStatus = newPresence;
            return this;
        });
    }

    public setUsername(newUsername: string): Promise<this> {
        if (typeof newUsername !== 'string') throw new TypeError('Expected a string for username change.');
        return this.client.rest.put(`/users/${this.id}/profilev2`, { name: newUsername }).then(() => this);
    }
}

const PRECENSES = {
    online: 1,
    idle: 2,
    dnd: 3,
    invisible: 4,
};
