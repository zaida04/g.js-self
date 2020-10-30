import { Measurements, Team as TeamData } from '../../common';
import Base from './Base';
import Client from './Client';
import GuildChannelManager from './managers/TeamChannelManager';
import GuildRoleManager from './managers/TeamRoleManager';
import UserManager from './managers/UserManager';
import Member from './Member';
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
    public measurements: Measurements | null = null;
    public verified: boolean | null = null;
    public public: boolean | null = null;
    public recruiting: boolean | null = null;
    public pro: boolean | null = null;
    public channels = new GuildChannelManager(this.client, this);
    public roles = new GuildRoleManager(this.client, this);
    public members = new UserManager(this.client);

    constructor(client: Client, data: TeamData) {
        super(client, data);
        this._patch(data);
    }

    _patch(data: TeamData): this {
        if ('ownerId' in data) this.ownerId = data.ownerId;
        if ('name' in data) this.name = data.name;
        if ('subdomain' in data) this.subdomain = data.subdomain;
        if ('socialInfo' in data) this.socialInfo = data.socialInfo as string | null;
        if ('timezone' in data) this.timezone = data.timezone;
        if ('description' in data) this.description = data.description;
        if ('type' in data) this.type = data.type;
        if ('measurements' in data) this.measurements = data.measurements;
        if ('isVerified' in data) this.verified = data.isVerified;
        if ('isPublic' in data) this.public = data.isPublic;
        if ('isRecruiting' in data) this.recruiting = data.isRecruiting;
        if ('isPro' in data) this.pro = data.isPro;

        if ('rolesById' in data) {
            for (const role_key in data.rolesById) {
                const role = new Role(this.client, this, data.rolesById[role_key]);
                this.roles.add(role);
            }
        }

        if ('members' in data) {
            for (const member_data of data.members) {
                const member = new Member(this.client, member_data);
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
