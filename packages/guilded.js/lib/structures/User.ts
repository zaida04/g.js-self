import type { APIAlias, APIDMChannel, APIUser, APIUserStatus } from '@guildedjs/guilded-api-typings';
import type { Embed } from "@guildedjs/embeds";
import { Base } from './Base';
import { Client } from './Client';
import type { Message } from './Message';
import { DMChannel } from './Channel';

/**
 * Object representing a user on the guilded.gg platform.
 */
export class User extends Base<APIUser> {
    /**
     * Addition info about this user
     */
    public aboutInfo: {
        bio: string | null;
        tagLine: string | null;
    };

    /**
     * The aliases this user might have on games
     */
    public aliases: APIAlias[];

    /**
     * The email of this user
     */
    public email: string | null;

    /**
     * When this user joined Guilded
     */
    public readonly joinDate: Date;

    /**
     * The last date in which this user was detected online
     */
    public lastOnline!: Date;

    /**
     * The moderation status of this account
     */
    public moderationStatus: string | null;

    /**
     * The username of this user
     */
    public name!: string;

    /**
     * The various styled banners belonging to this user
     */
    public banners: {
        blur: string | null;
        large: string | null;
        small: string | null;
    };

    /**
     * The various styled avatars belonging to this user
     */
    public avatarURLs: {
        medium: string | null;
        blur: string | null;
        large: string | null;
        small: string | null;
    };

    /**
     * Unknown property
     */
    public serviceEmail: string | null;

    /**
     * This users steam ID
     */
    public steamID: string | null;

    /**
     * The subdomain belonging to this user
     */
    public subdomain: string;

    /**
     * The current status of this user
     */
    public userStatus!: APIUserStatus;

    /**
     * DMChannel associated with this user, if cached.
     */
    public dmChannel: DMChannel | null;

    public constructor(client: Client, data: APIUser) {
        super(client, data);

        this.aboutInfo = {
            bio: null,
            tagLine: null,
        };
        this.aliases = [];
        this.email = null;
        this.moderationStatus = null;
        this.banners = {
            blur: null,
            large: null,
            small: null,
        };
        this.avatarURLs = {
            blur: null,
            large: null,
            medium: null,
            small: null,
        };
        this.serviceEmail = null;
        this.steamID = null;
        this.subdomain = data.subdomain;
        this.joinDate = new Date(data.joinDate);
        this.dmChannel = null;

        this.patch(data);
    }

    /**
     * Update the data in this structure
     * @internal
     */
    public patch(data: APIUser | Partial<APIUser>): this {
        if ('aboutInfo' in data && data.aboutInfo !== undefined) {
            this.aboutInfo = {
                bio: data.aboutInfo?.bio ?? null,
                tagLine: data.aboutInfo?.tagLine ?? null,
            };
        }
        if ('aliases' in data && data.aliases !== undefined) this.aliases = data.aliases;
        if ('email' in data && data.email !== undefined) this.email = data.email ?? null;
        if ('lastOnline' in data && data.lastOnline !== undefined) this.lastOnline = new Date(data.lastOnline);
        if ('name' in data && data.name !== undefined) this.name = data.name;
        if ('steamId' in data && data.steamId !== undefined) this.steamID = data.steamId;
        if ('subdomain' in data && data.subdomain !== undefined) this.subdomain = data.subdomain;
        if ('userStatus' in data && data.userStatus !== undefined) this.userStatus = data.userStatus;

        this.banners = { blur: null, large: null, small: null };
        this.avatarURLs = { blur: null, large: null, medium: null, small: null };

        if ('profileBannerBlur' in data && data.profileBannerBlur) this.banners.blur = data.profileBannerBlur;
        if ('profileBannerLg' in data && data.profileBannerLg) this.banners.large = data.profileBannerLg;
        if ('profileBannerSm' in data && data.profileBannerSm) this.banners.small = data.profileBannerSm;
        if ('profilePicture' in data && data.profilePicture) this.avatarURLs.medium = data.profilePicture;
        if ('profilePictureBlur' in data && data.profilePictureBlur) this.avatarURLs.blur = data.profilePictureBlur;
        if ('profilePictureLg' in data && data.profilePictureLg) this.avatarURLs.large = data.profilePictureLg;
        if ('profilePictureSm' in data && data.profilePictureSm) this.avatarURLs.small = data.profilePictureSm;

        return this;
    }

    /**
     * Retrieve a banner belonging to this team
     */
    public bannerURL(size: 'small' | 'blur' | 'large' = 'large'): string | null {
        let url;
        switch (size) {
            case 'small': {
                url = this.banners.small;
                break;
            }
            case 'blur': {
                url = this.banners.blur;
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
     * Retrieve an avatar belonging to this team
     */
    public avatarURL(size: 'small' | 'blur' | 'medium' | 'large' = 'medium'): string | null {
        let url;
        switch (size) {
            case 'blur': {
                url = this.avatarURLs.blur;
                break;
            }
            case 'small': {
                url = this.avatarURLs.small;
                break;
            }
            case 'medium': {
                url = this.avatarURLs.blur;
                break;
            }
            case 'large': {
                url = this.avatarURLs.large;
                break;
            }
            default: {
                throw new TypeError('avatarURL method only accepts small, medium, or large as the parameter');
            }
        }
        return url ?? null;
    }

    public fetchDMChannel() {
        return this.client.rest.post<{ channel: APIDMChannel}>(`/users/${this.client.user!.id}/channels`, { users: [{ id: this.id}] }).then(x => {
            console.log(x);
            const channel = new DMChannel(this.client, x.channel);
            this.client.channels.add(channel);
            this.dmChannel = channel;
            return void 0;
        })
    }

    /**
     * Send a DM to this user.
     * @param content Either a string content or RichEmbed to send to this channel.
     * @param embed A RichEmbed to send to this channel.
     */
     public async send(content: string | Embed, embed?: Embed): Promise<Message | string> {
        if(!this.dmChannel) await this.fetchDMChannel();
        return this.client.channels.sendMessage(this.dmChannel!.id, content, embed);
    }
}
