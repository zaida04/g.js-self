import { APIClientUser, APIUser } from '@guildedjs/guilded-api-typings';

import Base from './Base';
import Client from './Client';

export default class User extends Base {
    public name!: string;
    public subdomain: string | null = null;
    public aliases: unknown[] | null = null;
    public avatarURL: string | null = null;
    public bannerURL: string | null = null;
    public steamID: string | null = null;
    public createdAt!: Date;
    public lastOnline!: Date | null;

    constructor(client: Client, data: APIUser | APIClientUser) {
        super(client, data);
        this._patch(data);
    }
    _patch(data: APIUser | APIClientUser): this {
        if ('name' in data) this.name = data.name;
        if ('subdomain' in data) this.subdomain = data.subdomain;
        if ('profilePicture' in data) this.avatarURL = data.profilePicture;
        if ('profileBannerBlur' in data) this.bannerURL = data.profileBannerBlur;
        if ('steamId' in data) this.steamID = data.steamId;
        if ('addedAt' in data) this.createdAt = new Date(data.addedAt);
        if ('lastOnline' in data) this.lastOnline = data.lastOnline ? new Date(data.lastOnline) : null;

        return this;
    }
}
