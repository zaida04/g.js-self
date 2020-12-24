import { APIChannel } from "@guildedjs/guilded-api-typings";
import Base from "../Base";

export default class Channel<T extends APIChannel> extends Base<T> {
    public id!: string;
    public createdAt!: Date;
    public updatedAt!: Date | null;
    public type!: string;

    patch(data: APIChannel | Partial<APIChannel>) {
        if ('createdAt' in data && data.createdAt !== undefined) this.createdAt = new Date(data.createdAt);
        if (("type" in data && data.type !== undefined) && ("name" in data && data.name !== null)) this.type = data.type;
        if ("contentType" in data && data.contentType !== undefined) this.type = data.contentType.toLowerCase();
        if ('updatedAt' in data && data.updatedAt !== undefined)
            this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
 
        return this;
    }
}