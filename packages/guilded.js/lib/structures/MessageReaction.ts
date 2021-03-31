import Collection from "@discordjs/collection";
import { APIMessageReaction, WSReaction } from "@guildedjs/guilded-api-typings";
import { Client } from "./Client";
import {User} from "./User";

export class MessageReaction {
    /**
     * The users that have reacted with the emoji this message reaction belongs to. It will contain either fully fledged User objects if the users are cached before hand, or it will contain minimal data about the users.
     */
    public readonly users: Collection<string, User | {id: string, webhookId?: string | null; botId?: string | null}>;

    /**
     * Date the first user reacted with the emoji this message reaction belongs to
     */
    public readonly createdAt: Date;

    /**
     * The ID of the emoji this message reaction belongs to.
     */
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