import { APITeamChannel } from "@guildedjs/guilded-api-typings";
import Client from "../Client";
import TextBasedChannel from "./TextBasedChannel";
import Team from "../Team";
import TeamChannel from "./TeamChannel";
import MessageManager from "../managers/MessageManager";
import Message from "../Message";
import Group from "../Group";
import { ConvertToMessageFormat } from "../../util/MessageUtil";

/**
 * A text channel residing in a team
 */
export default class TextChannel extends TeamChannel implements TextBasedChannel {
    /**
     * The date this channel was archived, if it
     */
    public archivedAt: Date | null = null;

    /**
     * The messages belonging to this channel
     */
    public messages: MessageManager = new MessageManager(this.client, this);

    constructor(client: Client, data: APITeamChannel, team: Team | null, group: Group | null) {
        super(client, data, team, group);
    }

    /**
     * Send a message to this channel
     */
    public send(content: string): Promise<Message> {
        const messageData = ConvertToMessageFormat(content);
        return this.client.rest.post(`/channels/${this.id}/messages`, messageData!).then((newMessage) => {
            const tempMessage = this.messages.add(newMessage)!;
            return tempMessage;
        })
    }

    /**
     * Update the data in this structure
     * @internal
     */
    patch(data: APITeamChannel | Partial<APITeamChannel>): this {
        if("archivedAt" in data && data.archivedAt !== undefined) this.archivedAt = data.archivedAt ? new Date(data.archivedAt) : null
        return this;
    }

    /**
     * Archive this channel
     */
    archive() {
        return this.client.rest.put(`/teams/${this.teamID}/groups/${this.groupID}/channels/${this.id}/archive`).then(x => {
            this.archivedAt = new Date()
            return this;
        })
    }
}