import { APIMeasurements, APIPartialTeam, APITeam } from '@guildedjs/guilded-api-typings';

import Base from './Base';
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
    public members = new TeamMemberManager(this.client, this);
    public name!: string;
    public owner!: Member | null;
    public ownerId!: string;
    public pro!: boolean;
    public profilePicture!: string;
    public public!: boolean;
    public recruiting!: boolean;
    public subdomain!: string;
    public timezone!: string;
    public type!: string;
    public verified!: boolean;
    public discord!: {
        guild_id: string | null;
        name: string | null;
    };
    public games!: any[];
    public banners!: {
        small: string | null;
        medium: string | null;
        large: string | null;
    };

    public patch(data: Partial<APITeam> | APITeam): this {
        if ('isAdmin' in data && data.isAdmin !== undefined) {
            this.admin = data.isAdmin;
        }

        if ('isUserBannedFromTeam' in data && data.isUserBannedFromTeam !== undefined) {
            this.banned = data.isUserBannedFromTeam;
        }

        if ('bio' in data && data.bio !== undefined) {
            this.bio = data.bio;
        }

        if ('createdAt' in data && data.createdAt !== undefined) {
            this.createdAt = new Date(data.createdAt);
        }

        if ('description' in data && data.description !== undefined) {
            this.description = data.description;
        }

        if ('isFavorite' in data && data.isFavorite !== undefined) {
            this.favorited = data.isFavorite;
        }

        if ('userFollowsTeam' in data && data.userFollowsTeam !== undefined) {
            this.followed = data.userFollowsTeam;
        }

        if ('canInviteMembers' in data && data.canInviteMembers !== undefined) {
            this.invitable = data.canInviteMembers;
        }

        if ('measurements' in data && data.measurements !== undefined) {
            this.measurements = data.measurements;
        }

        if ('memberCount' in data && data.memberCount !== undefined) {
            this.memberCount = parseInt(data.memberCount);
        }

        if ('name' in data && data.name !== undefined) {
            this.name = data.name;
        }

        if ('ownerId' in data && data.ownerId !== undefined) {
            this.ownerId = data.ownerId;
            this.owner = this.members.cache.get(data.ownerId) ?? null;
        }

        if ('isPro' in data && data.isPro !== undefined) {
            this.pro = data.isPro;
        }

        if ('isPublic' in data && data.isPublic !== undefined) {
            this.public = data.isPublic;
        }

        if ('isRecruiting' in data && data.isRecruiting !== undefined) {
            this.recruiting = data.isRecruiting;
        }

        if ('subdomain' in data && data.subdomain !== undefined) {
            this.subdomain = data.subdomain;
        }

        if ('timezone' in data && data.timezone !== undefined) {
            this.timezone = data.timezone;
        }

        if ('type' in data && data.type !== undefined) {
            this.type = data.type;
        }

        if ('isVerified' in data && data.isVerified !== undefined) {
            this.verified = data.isVerified;
        }

        if ('discordGuildId' in data && data.discordGuildId !== undefined) {
            this.discord.guild_id = data.discordGuildId;
        }

        if ('discordServerName' in data && data.discordServerName !== undefined) {
            this.discord.name = data.discordServerName;
        }

        if ('games' in data && data.games) {
            this.games = data.games;
        }

        if ('homeBannerImageLg' in data && data.homeBannerImageLg !== undefined) {
            this.banners.large = data.homeBannerImageLg;
        }

        if ('homeBannerImageMd' in data && data.homeBannerImageMd !== undefined) {
            this.banners.medium = data.homeBannerImageMd;
        }

        if ('homeBannerImageSm' in data && data.homeBannerImageSm !== undefined) {
            this.banners.small = data.homeBannerImageSm;
        }

        return this;
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
}
