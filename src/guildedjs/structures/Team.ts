import { BaseData } from '../typings/BaseData';
import Base from './Base';
import Client from './Client';
import GuildChannelManager from './managers/TeamChannelManager';
import GuildRoleManager from './managers/TeamRoleManager';
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
        this._patch(data);
    }

    _patch(data: any): this {
        if ('ownerId' in data) this.ownerId = data.ownerId;
        if ('name' in data) this.name = data.name;
        if ('subdomain' in data) this.subdomain = data.subdomain;
        if ('socialInfo' in data) this.socialInfo = data.socialInfo;
        if ('timezone' in data) this.timezone = data.timezone;
        if ('description' in data) this.description = data.description;
        if ('type' in data) this.type = data.type;
        if ('measurements' in data) this.measurements = data.measurements;
        if ('verified' in data) this.verified = data.verified;
        if ('public' in data) this.public = data.public;
        if ('recruiting' in data) this.recruiting = data.recruiting;
        if ('pro' in data) this.pro = data.pro;

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

        if (!('channels' in data)) {
            this.channels.fetchChannels();
        }
        return this;
    }

    createInvite(): Promise<string> {
        return this.client.rest.post(`/teams/${this.id}/invites`, { teamId: this.id }).then(x => x.invite.id);
    }
}
