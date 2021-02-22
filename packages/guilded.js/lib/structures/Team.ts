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
    /**
     * Whether the current client is an admin of this team.
     */
    public admin!: boolean | null;

    /**
     * Whether the current client is banned from this team
     */
    public banned!: boolean | null;

    /**
     * The bio of this team
     */
    public bio!: string | null;

    /**
     * The date in which this team was created
     */
    public createdAt!: Date;

    /** 
     * The description of this team
    */
    public description!: string;
    
    /**
     * Whether the current client has this team favorited
     */
    public favorited!: boolean;

    /**
     * Whether the current client is following this team
     */
    public followed!: boolean;

    /**
     * Whether people can be invited to this team
     */
    public invitable!: boolean | null;
    
    /**
     * The measurement system that this team goes by
     */
    public measurements!: APIMeasurements;

    /**
     * The number of members this team has
     */
    public memberCount!: number;

    /**
     * The members residing in this team. Will most likely have an incomplete cache, so you should ensure you use the fetch methods
     */
    public members: TeamMemberManager;

    /**
     * The name of this team
     */
    public name!: string;

    /**
     * The member object belonging to the owner of this team if cached
     */
    public owner!: Member | null;

    /**
     * The ID of the owner of this team
     */
    public ownerId!: string;

    /**
     * Whether this team has pro status
     */
    public pro!: boolean;

    /**
     * icon of this team
     */
    public profilePicture!: string;

    /**
     * Whether this team is public or not
     */
    public public!: boolean;

    /**
     * Whether this team is recruiting or not
     */
    public recruiting!: boolean;

    /**
     * The subdomain belonging to this team
     */
    public subdomain!: string;
    
    /**
     * The main timezone of this team
     */
    public timezone!: string | null;

    /**
     * The type of this team
     */
    public type!: string | null; 
    
    /**
     * Whether this team is verified or not
     */
    public verified!: boolean;

    /**
     * The main group belonging to this team if cached
     */
    public baseGroup!: Group | null;

    /** 
     * The ID of the main group belonging to this team
    */
    public baseGroupID!: string;

    /**
     * Information about the respective connected discord server
     */
    public discord: {
        guild_id: string | null;
        name: string | null;
    };

    /**
     * The groups belonging to this team
     */
    public groups: TeamGroupManager;

    /**
     * The games that this team plays
     */
    public games!: any[];

    /**
     * The various banner styles belonging to this server
     */
    public banners: {
        small: string | null;
        medium: string | null;
        large: string | null;
    };
    
    public constructor(client: Client, data: APITeam) {
        super(client, data, false);
        this.members = new TeamMemberManager(this.client, this);
        this.groups = new TeamGroupManager(this.client, this);
        this.discord = { guild_id: null, name: null };
        this.banners = { small: null, medium: null, large: null };
        this.patch(data);
    }

    /**
     * Update the data in this structure
     * @internal
     */
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

    /**
     * Create an invite to this team
     */
    public createInvite() {
        return this.client.rest.post(`/teams/${this.id}/invites`, { teamId: this.id }).then(x => x.data.invite.id);
    }

    /**
     * Retrive the banner belonging to this server depending on size
     */
    public bannerURL(size: 'small' | 'medium' | 'large' = 'small'): string | null {
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

    /**
     * Fetch all the channels belonging to this team
     */
    public fetchChannels() {
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
