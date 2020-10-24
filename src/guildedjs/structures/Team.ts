import { BaseData } from '../typings/BaseData';
import Base from './Base';
import Client from './Client';
import GuildChannelManager from './managers/GuildChannelManager';
import GuildRoleManager from './managers/GuildRoleManager';
import UserManager from './managers/UserManager';
import Role from './Role';
import User from './User';

export default class Team extends Base {
    public ownerId: string | null = null;
    public name: string | null = null;
    public subdomain: string | null = null;
    public iconURL: string | null = null;
    public socialInfo: string | null = null;
    public timezone: string | null = null;
    public description: string | null = null;
    public type: string | null = null;
    public measurements: string | null = null;
    public verified: boolean | null = null;
    public public: boolean | null = null;
    public recruiting: boolean | null = null;
    public pro: boolean | null = null;
    public channels = new GuildChannelManager(this.client, this);
    public roles = new GuildRoleManager(this.client, this);
    public members = new UserManager(this.client);

    constructor(client: Client, data: BaseData) {
        super(client, data);
    }

    _patch(data: any): this {
        if ('rolesById' in data) {
            for (const role_data of data.rolesById) {
                const role = new Role(this.client, role_data, this)._patch(role_data);
                this.roles.add(role);
            }
        }

        if ('members' in data) {
            for (const member_data of data.members) {
                const member = new User(this.client, member_data)._patch(member_data);
                this.members.add(member);
            }
        }

        this.channels.fetchChannels();

        return this;
    }

    createInvite(): Promise<string> {
        return this.client.rest.post(`/teams/${this.id}/invites`, { teamId: this.id }).then(x => x.invite.id);
    }
}
