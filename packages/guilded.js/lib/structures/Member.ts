import type {
    APIAboutInfo,
    APIAlias,
    APIMember,
    APISocialLink,
    APIUserStatus,
    MembershipRole,
} from '@guildedjs/guilded-api-typings';

import { Base } from './Base';
import type { Client } from './Client';
import { TeamMemberRoleManager } from './managers/TeamMemberRoleManager';
import type { Team } from './Team';

/**
 * A member of a team
 */
export class Member extends Base<APIMember> {
    /**
     * The current username of this member
     */
    public name!: string;

    /**
     * The current nickname of this member in this team
     */
    public nickname: string | null;

    /**
     * Badges belonging to this member
     */
    public badges: string[] | null;

    /**
     * The date in which this member joined
     */
    public joinDate: Date;

    /**
     * Unknown purpose
     */
    public membershipRole!: MembershipRole;

    /**
     * The last date in which this member was detected to be online
     */
    public lastOnline: Date | null;

    /**
     * The profile picture belonging to this member
     */
    public profilePicture: string | null;

    /**
     * The blurred out banner belonging to this member
     */
    public profileBannerBlur: string | null;

    /**
     * Additional info regarding this member
     */
    public aboutInfo: APIAboutInfo | null;

    /**
     * This members current detected status
     */
    public userStatus!: APIUserStatus;

    /**
     * Connections that this member has to other social media platforms
     */
    public socialLinks: APISocialLink[] | null;

    /**
     * The IDs of the roles that this member has
     */
    public roleIDs: number[] | null;

    /**
     * Unknown purpose
     */
    public subscriptionType: string | null;

    /**
     * Aliases this member may have on games
     */
    public aliases: APIAlias[];

    /**
     * Unknown purpose
     */
    public userPresenceStatus!: number;

    /**
     * The amount of XP this member has in this team
     */
    public teamXp!: number;

    /**
     * The manager in charge of managing the roles this member has
     */
    public roles: TeamMemberRoleManager;
    public constructor(client: Client, data: APIMember, public team: Team | null) {
        super(client, data);
        this.roles = new TeamMemberRoleManager(client, this);
        this.joinDate = new Date(data.joinDate);
        this.badges = [];
        this.nickname = null;
        this.lastOnline = null;
        this.profilePicture = null;
        this.profileBannerBlur = null;
        this.aboutInfo = null;
        this.socialLinks = [];
        this.roleIDs = [];
        this.subscriptionType = null;
        this.aliases = [];

        this.patch(data);
    }

    /**
     * Update the data in this structure
     * @internal
     */
    public patch(data: APIMember | Partial<APIMember>): this {
        if ('name' in data && data.name !== undefined) this.name = data.name;
        if ('nickname' in data && data.nickname !== undefined) this.nickname = data.nickname;
        if ('badges' in data && data.badges !== undefined) this.badges = data.badges;
        if ('membershipRole' in data && data.membershipRole !== undefined) this.membershipRole = data.membershipRole;
        if ('lastOnline' in data && data.lastOnline !== undefined) {
            this.lastOnline = data.lastOnline ? new Date(data.lastOnline) : null;
        }
        if ('profilePicture' in data && data.profilePicture !== undefined) this.profilePicture = data.profilePicture;
        if ('profileBannerBlur' in data && data.profileBannerBlur !== undefined) {
            this.profileBannerBlur = data.profileBannerBlur;
        }
        if ('aboutInfo' in data && data.aboutInfo !== undefined) this.aboutInfo = data.aboutInfo;
        if ('userStatus' in data && data.userStatus !== undefined) this.userStatus = data.userStatus;
        if ('socialLinks' in data && data.socialLinks !== undefined) this.socialLinks = data.socialLinks;
        if ('roleIds' in data && data.roleIds !== undefined) this.roleIDs = data.roleIds;
        if ('subscriptionType' in data && data.subscriptionType !== undefined) {
            this.subscriptionType = data.subscriptionType;
        }
        if ('aliases' in data && data.aliases !== undefined) this.aliases = data.aliases;
        if ('userPresenceStatus' in data && data.userPresenceStatus !== undefined) {
            this.userPresenceStatus = Number(data.userPresenceStatus);
        }
        if ('teamXp' in data && data.teamXp !== undefined) this.teamXp = data.teamXp;

        return this;
    }

    public kick(): Promise<void> {
        return this.client.teams.kickMember(this.team!, this);
    }

    public setNickname(newNickname: string): Promise<void> {
        return this.client.teams.setMemberNickname(this.team!, this, newNickname);
    }
}
