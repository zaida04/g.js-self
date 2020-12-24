import { APIClientUser, Device } from '@guildedjs/guilded-api-typings';
 
import User from './User';
 
export default class ClientUser extends User {
    blockedUsers!: any[];
    socialLinks!: any[];
    badges!: any[];
    userPresenceStatus!: number;
    devices!: Device[];
 
    patch(data: APIClientUser | Partial<APIClientUser>): this {
        if ('blockedUsers' in data && data.blockedUsers !== undefined) this.blockedUsers = data.blockedUsers;
        if ('socialLinks' in data && data.socialLinks !== undefined) this.socialLinks = data.socialLinks;
        if ('badges' in data && data.badges !== undefined) this.badges = data.badges;
        if ('userPresenceStatus' in data && data.userPresenceStatus !== undefined)
            this.userPresenceStatus = data.userPresenceStatus;
        if ('devices' in data && data.devices !== undefined) this.devices = data.devices;
 
        return this;
    }

    // planned methods: setPresence
}
