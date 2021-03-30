import Collection from "@discordjs/collection";
import { APIMessageReaction, WSReaction } from "@guildedjs/guilded-api-typings";
import { Client } from "./Client";
import {User} from "./User";

export class MessageReaction {
    public readonly users: Collection<string, User | {id: string, webhookId?: string | null; botId?: string | null}>;
    public readonly createdAt: Date;
    public readonly id: string;

    public constructor(public client: Client, data: APIMessageReaction) {

        this.id = data.customReactionId.toString();
        this.createdAt = new Date(data.createdAt);
        this.users = new Collection();
        
        for(const user of data.users) {
            this.users.set(user.id, this.client.users.cache.get(user.id) ?? user);
        }
    }
}