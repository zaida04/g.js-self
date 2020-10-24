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
    }
    _patch(data: any): this {
        if ('name' in data) this.name = data.name ?? null;

        if ('subdomain' in data) this.subdomain = data.subdomain ?? null;

        if ('aliases' in data) this.aliases = data.aliases ?? null;

        if ('avatarURL' in data) this.avatarURL = data.avatarURL ?? null;

        if ('bannerURL' in data) this.bannerURL = data.bannerURL ?? null;

        if ('steamID' in data) this.steamID = data.steamID ?? null;

        if ('createdAt' in data) this.createdAt = new Date(data.createdAt) ?? null;

        if ('lastOnline' in data) this.lastOnline = new Date(data.lastOnline) ?? null;

        return this;
    }
}
