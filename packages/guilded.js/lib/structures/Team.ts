import Collection from '@discordjs/collection';
import { APIMeasurements, APIPartialTeam, APITeam, APITeamChannel, APITextChannel, FetchTeamChannels } from '@guildedjs/guilded-api-typings';
 
import Base from './Base';
import TextChannel from './channels/TextChannel';
import Client from './Client';
import Group from './Group';
import TeamGroupManager from './managers/TeamGroupManager';
import TeamMemberManager from './managers/TeamMemberManager';
import Member from './Member';
 
export default class Team extends Base<APITeam | APIPartialTeam> {
    public admin!: boolean | null;
    public banned!: boolean | null;
    public bio!: string | null;
    public createdAt!: Date;
    public description!: string;
    public favorited!: boolean;
    public followed!: boolean;
    public invitable!: boolean | null;
    public measurements!: APIMeasurements;
    public memberCount!: number;
    public members: TeamMemberManager;
    public name!: string;
    public owner!: Member | null;
    public ownerId!: string;
    public pro!: boolean;
    public profilePicture!: string;
    public public!: boolean;
    public recruiting!: boolean;
    public subdomain!: string;
    public timezone!: string | null;
    public type!: string | null;
    public verified!: boolean;
    public baseGroup!: Group | null;
    public baseGroupID!: string;
    public discord: {
        guild_id: string | null;
        name: string | null;
    };
    public groups: TeamGroupManager;
    public games!: any[];
    public banners: {
        small: string | null;
        medium: string | null;
        large: string | null;
    };
    constructor(client: Client, data: APITeam) {
        super(client, data, false);
        this.members = new TeamMemberManager(this.client, this);
        this.groups = new TeamGroupManager(this.client, this);
        this.discord = { guild_id: null, name: null };
        this.banners = { small: null, medium: null, large: null };
        this.patch(data);
    }
 
    public patch(data: Partial<APITeam> | APITeam): this {
        if ('isAdmin' in data && data.isAdmin !== undefined) this.admin = data.isAdmin;

        if ('baseGroup' in data && data.baseGroup !== undefined) {
            this.baseGroupID = data.baseGroup.id;
            this.baseGroup = new Group(this.client, data.baseGroup, this);
        }

        if ('isUserBannedFromTeam' in data && data.isUserBannedFromTeam !== undefined)
            this.banned = data.isUserBannedFromTeam;
 
        if ('bio' in data && data.bio !== undefined) this.bio = data.bio;
 
        if ('createdAt' in data && data.createdAt !== undefined) this.createdAt = new Date(data.createdAt);
 
        if ('description' in data && data.description !== undefined) this.description = data.description;
 
        if ('isFavorite' in data && data.isFavorite !== undefined) this.favorited = data.isFavorite;
 
        if ('userFollowsTeam' in data && data.userFollowsTeam !== undefined) this.followed = data.userFollowsTeam;
 
        if ('canInviteMembers' in data && data.canInviteMembers !== undefined) this.invitable = data.canInviteMembers;
 
        if ('measurements' in data && data.measurements !== undefined) this.measurements = data.measurements;
 
        if ('memberCount' in data && data.memberCount !== undefined) this.memberCount = parseInt(data.memberCount);
 
        if ('name' in data && data.name !== undefined) this.name = data.name;
 
        if ('ownerId' in data && data.ownerId !== undefined) {
            this.ownerId = data.ownerId;
            this.owner = this.members.cache.get(data.ownerId) ?? null;
        }
 
        if ('isPro' in data && data.isPro !== undefined) this.pro = data.isPro;
 
        if ('isPublic' in data && data.isPublic !== undefined) this.public = data.isPublic;
 
        if ('isRecruiting' in data && data.isRecruiting !== undefined) this.recruiting = data.isRecruiting;
 
        if ('subdomain' in data && data.subdomain !== undefined) this.subdomain = data.subdomain;
 
        if ('timezone' in data && data.timezone !== undefined) this.timezone = data.timezone;
 
        if ('type' in data && data.type !== undefined) this.type = data.type;
 
        if ('isVerified' in data && data.isVerified !== undefined) this.verified = data.isVerified;
 
        if ('discordGuildId' in data && data.discordGuildId !== undefined) this.discord.guild_id = data.discordGuildId;
 
        if ('discordServerName' in data && data.discordServerName !== undefined)
            this.discord.name = data.discordServerName;
 
        if ('games' in data && data.games) this.games = data.games;
 
        if ('homeBannerImageLg' in data && data.homeBannerImageLg !== undefined)
            this.banners.large = data.homeBannerImageLg;
 
        if ('homeBannerImageMd' in data && data.homeBannerImageMd !== undefined)
            this.banners.medium = data.homeBannerImageMd;
 
        if ('homeBannerImageSm' in data && data.homeBannerImageSm !== undefined)
            this.banners.small = data.homeBannerImageSm;
 
        return this;
    }
    createInvite() {
        return this.client.rest.post(`/teams/${this.id}/invites`, { teamId: this.id }).then(x => x.data.invite.id);
    }
    bannerURL(size: 'small' | 'medium' | 'large' = 'small'): string | null {
        let url;
        switch (size) {
            case 'small': {
                url = this.banners.small;
                break;
            }
            case 'medium': {
                url = this.banners.medium;
                break;
            }
            case 'large': {
                url = this.banners.large;
                break;
            }
            default: {
                throw new TypeError('bannerURL method only accepts small, medium, or large as the parameter');
            }
        }
        return url ?? null;
    }

    fetchChannels() {
        return this.client.rest.get<FetchTeamChannels>(`/teams/${this.id}/channels`).then((x) => {
            for (const channel of x.channels) {
                const group = this.groups.cache.get(channel.groupId);
                switch (channel.contentType) {
                    case "chat": {
                        const tempChannel = new TextChannel(this.client, channel, this, group ?? null);
                        group?.channels.add(tempChannel);
                        break;
                    }
                    case "voice": {
                        // add voice channel logic
                        break;
                    }
                }
            }
        })
    }
}
