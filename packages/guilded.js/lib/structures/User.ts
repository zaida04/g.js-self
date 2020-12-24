import { AboutInfo, APIAlias, APIUser, APIUserStatus } from '@guildedjs/guilded-api-typings';
 
import Base from './Base';
 
export default class User extends Base<APIUser> {
    public aboutInfo!: AboutInfo;
    public aliases!: APIAlias[];
    public email!: string | null;
    public joinDate!: Date;
    public lastOnline!: Date;
    public moderationStatus!: string | null;
    public name!: string;
    public banners!: {
        blur: string | null;
        large: string | null;
        small: string | null;
    };
    public avatarURLS!: {
        medium: string | null;
        blur: string | null;
        large: string | null;
        small: string | null;
    };
    public serviceEmail!: string | null;
    public steamID!: string | null;
    public subdomain!: string;
    public userStatus!: APIUserStatus;
 
    patch(data: APIUser | Partial<APIUser>): this {
        if ('aboutInfo' in data && data.aboutInfo !== undefined) this.aboutInfo = data.aboutInfo;
 
        if ('aliases' in data && data.aliases !== undefined) this.aliases = data.aliases;
 
        if ('email' in data && data.email !== undefined) this.email = data.email ?? null;
 
        if ('joinDate' in data && data.joinDate !== undefined) this.joinDate = new Date(data.joinDate);
 
        if ('lastOnline' in data && data.lastOnline !== undefined) this.lastOnline = new Date(data.lastOnline);
 
        if ('name' in data && data.name !== undefined) this.name = data.name;
 
        if ('steamId' in data && data.steamId !== undefined) this.steamID = data.steamId;
 
        if ('subdomain' in data && data.subdomain !== undefined) this.subdomain = data.subdomain;
 
        if ('userStatus' in data && data.userStatus !== undefined) this.userStatus = data.userStatus;
 
        if ('profileBannerBlur' in data && data.profileBannerBlur) this.banners.blur = data.profileBannerBlur;
 
        if ('profileBannerLg' in data && data.profileBannerLg) this.banners.large = data.profileBannerLg;
 
        if ('profileBannerSm' in data && data.profileBannerSm) this.banners.small = data.profileBannerSm;
 
        if ('profilePicture' in data && data.profilePicture) this.avatarURLS.medium = data.profilePicture;
 
        if ('profilePictureBlur' in data && data.profilePictureBlur) this.avatarURLS.blur = data.profilePictureBlur;
 
        if ('profilePictureLg' in data && data.profilePictureLg) this.avatarURLS.large = data.profilePictureLg;
 
        if ('profilePictureSm' in data && data.profilePictureSm) this.avatarURLS.small = data.profilePictureSm;
 
        return this;
    }
    bannerURL(size: 'small' | 'blur' | 'large' = 'large'): string | null {
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
    avatarURL(size: 'small' | 'blur' | 'medium' | 'large' = 'medium'): string | null {
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
