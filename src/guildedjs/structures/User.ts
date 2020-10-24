import { BaseData } from '../typings/BaseData';
import Base from './Base';
import Client from './Client';

export default class User extends Base {
    public name: string | null = null;
    public subdomain: string | null = null;
    public aliases: unknown[] | null = null;
    public avatarURL: string | null = null;
    public bannerURL: string | null = null;
    public steamID: string | null = null;
    public createdAt: Date | null = null;
    public lastOnline: Date | null = null;

    constructor(client: Client, data: BaseData) {
        super(client, data);
        this._patch(data);
    }
    _patch(data: any): this {
        if ('name' in data) this.name = data.name;
        if ('subdomain' in data) this.subdomain = data.subdomain;
        if ('aliases' in data) this.aliases = data.aliases;
        if ('avatarURL' in data) this.avatarURL = data.avatarURL;
        if ('bannerURL' in data) this.bannerURL = data.bannerURL;
        if ('steamID' in data) this.steamID = data.steamID;
        if ('createdAt' in data) this.createdAt = new Date(data.createdAt);
        if ('lastOnline' in data) this.lastOnline = new Date(data.lastOnline);

        return this;
    }
}
