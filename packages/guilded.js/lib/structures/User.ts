import { AboutInfo, APIAlias, APIUser, APIUserStatus } from '@guildedjs/guilded-api-typings';
 
import Base from './Base';
 
export default class User extends Base<APIUser> {
    /**
     * Addition info about this user
     */
    public aboutInfo!: AboutInfo;

    /**
     * The aliases this user might have on games
     */
    public aliases!: APIAlias[];

    /**
     * The email of this user
     */
    public email!: string | null;

    /**
     * When this user joined Guilded
     */
    public joinDate!: Date;

    /**
     * The last date in which this user was detected online
     */
    public lastOnline!: Date;

    /**
     * The moderation status of this account
     */
    public moderationStatus!: string | null;

    /**
     * The username of this user
     */
    public name!: string;

    /**
     * The various styled banners belonging to this user
     */
    public banners!: {
        blur: string | null;
        large: string | null;
        small: string | null;
    };

    /**
     * The various styled avatars belonging to this user
     */
    public avatarURLS!: {
        medium: string | null;
        blur: string | null;
        large: string | null;
        small: string | null;
    };

    /**
     * Unknown property
     */
    public serviceEmail!: string | null;
    
    /**
     * This users steam ID
     */
    public steamID!: string | null;

    /**
     * The subdomain belonging to this user
     */
    public subdomain!: string;

    /**
     * The current status of this user
     */
    public userStatus!: APIUserStatus;
 
    /**
     * Update the data in this structure
     * @internal
     */
    public patch(data: APIUser | Partial<APIUser>): this {
        if ('aboutInfo' in data && data.aboutInfo !== undefined) this.aboutInfo = data.aboutInfo;
        if ('aliases' in data && data.aliases !== undefined) this.aliases = data.aliases;
        if ('email' in data && data.email !== undefined) this.email = data.email ?? null;
        if ('joinDate' in data && data.joinDate !== undefined) this.joinDate = new Date(data.joinDate);
        if ('lastOnline' in data && data.lastOnline !== undefined) this.lastOnline = new Date(data.lastOnline);
        if ('name' in data && data.name !== undefined) this.name = data.name;
        if ('steamId' in data && data.steamId !== undefined) this.steamID = data.steamId;
        if ('subdomain' in data && data.subdomain !== undefined) this.subdomain = data.subdomain;
        if ('userStatus' in data && data.userStatus !== undefined) this.userStatus = data.userStatus;

        this.banners = {blur: null, large: null, small: null};
        this.avatarURLS = {blur: null, large: null, small: null, medium: null};

        if ('profileBannerBlur' in data && data.profileBannerBlur) this.banners.blur = data.profileBannerBlur;
        if ('profileBannerLg' in data && data.profileBannerLg) this.banners.large = data.profileBannerLg;
        if ('profileBannerSm' in data && data.profileBannerSm) this.banners.small = data.profileBannerSm;
        if ('profilePicture' in data && data.profilePicture) this.avatarURLS.medium = data.profilePicture;
        if ('profilePictureBlur' in data && data.profilePictureBlur) this.avatarURLS.blur = data.profilePictureBlur;
        if ('profilePictureLg' in data && data.profilePictureLg) this.avatarURLS.large = data.profilePictureLg;
        if ('profilePictureSm' in data && data.profilePictureSm) this.avatarURLS.small = data.profilePictureSm;
 
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
                url = this.avatarURLS.blur;
                break;
            }
            case 'small': {
                url = this.avatarURLS.small;
                break;
            }
            case 'medium': {
                url = this.avatarURLS.blur;
                break;
            }
            case 'large': {
                url = this.avatarURLS.large;
                break;
            }
            default: {
                throw new TypeError('avatarURL method only accepts small, medium, or large as the parameter');
            }
        }
        return url ?? null;
    }
}
