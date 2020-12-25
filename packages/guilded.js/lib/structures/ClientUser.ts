import { APIClientUser, Device } from '@guildedjs/guilded-api-typings';
 
import User from './User';
 
/**
 * The user belonging to this client
 */
export default class ClientUser extends User {
    /**
     * List of users that this client has blocked
     */
    blockedUsers!: any[];

    /**
     * Connections with other social media this client has
     */
    socialLinks!: any[];

    /**
     * Badges this client owns
     */
    badges!: any[];
    
    /**
     * The type of presence this client has
     */
    userPresenceStatus!: number;

    /**
     * Information regarding the devices that have been used with this client
     */
    devices!: Device[];
 
    /**
     * Update the data in this structure
     * @internal
     */
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
