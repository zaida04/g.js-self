import {
    AboutInfo,
    APIAlias,
    APIMember,
    APIUserStatus,
    MembershipRole,
    SocialLink,
} from '@guildedjs/guilded-api-typings';
 
import Base from './Base';
import type Client from './Client';
import TeamMemberRoleManager from './managers/TeamMemberRoleManager';
import type Team from './Team';
 
export default class Member extends Base<APIMember> {
    public name!: string;
    public nickname!: string | null;
    public badges!: string[] | null;
    public joinDate!: Date;
    public membershipRole!: MembershipRole;
    public lastOnline!: Date | null;
    public profilePicture!: string | null;
    public profileBannerBlur!: string | null;
    public aboutInfo!: AboutInfo | null;
    public userStatus!: APIUserStatus;
    public socialLinks!: SocialLink[] | null;
    public roleIds!: number[] | null;
    public subscriptionType!: string | null;
    public aliases!: APIAlias[];
    public userPresenceStatus!: number;
    public teamXp!: number;
    public roles: TeamMemberRoleManager;
    constructor(client: Client, data: APIMember, public team: Team) {
        super(client, data, false);
        this.roles = new TeamMemberRoleManager(client, this);
    }
 
    patch(data: APIMember | Partial<APIMember>): this {
        if ('name' in data && data.name !== undefined) this.name = data.name;
 
        if ('nickname' in data && data.nickname !== undefined) this.nickname = data.nickname;
 
        if ('badges' in data && data.badges !== undefined) this.badges = data.badges;
 
        if ('joinDate' in data && data.joinDate !== undefined) this.joinDate = new Date(data.joinDate);
 
        if ('membershipRole' in data && data.membershipRole !== undefined) this.membershipRole = data.membershipRole;
 
        if ('lastOnline' in data && data.lastOnline !== undefined)
            this.lastOnline = data.lastOnline ? new Date(data.lastOnline) : null;
 
        if ('profilePicture' in data && data.profilePicture !== undefined) this.profilePicture = data.profilePicture;
 
        if ('profileBannerBlur' in data && data.profileBannerBlur !== undefined)
            this.profileBannerBlur = data.profileBannerBlur;
 
        if ('aboutInfo' in data && data.aboutInfo !== undefined) this.aboutInfo = data.aboutInfo;
 
        if ('userStatus' in data && data.userStatus !== undefined) this.userStatus = data.userStatus;
 
        if ('socialLinks' in data && data.socialLinks !== undefined) this.socialLinks = data.socialLinks;
 
        if ('roleIds' in data && data.roleIds !== undefined) this.roleIds = data.roleIds;
 
        if ('subscriptionType' in data && data.subscriptionType !== undefined)
            this.subscriptionType = data.subscriptionType;
 
        if ('aliases' in data && data.aliases !== undefined) this.aliases = data.aliases;
 
        if ('userPresenceStatus' in data && data.userPresenceStatus !== undefined)
            this.userPresenceStatus = Number(data.userPresenceStatus);
 
        if ('teamXp' in data && data.teamXp !== undefined) this.teamXp = data.teamXp;
 
        return this;
    }
}
