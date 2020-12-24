import { APITeamChannel } from "@guildedjs/guilded-api-typings";
import Client from "../Client";
import TextBasedChannel from "./TextBasedChannel";
import Team from "../Team";
import TeamChannel from "./TeamChannel";
import MessageManager from "../managers/MessageManager";
import Message from "../Message";
import Group from "../Group";
import { ConvertToMessageFormat } from "../../util/MessageUtil";

export default class TextChannel extends TeamChannel implements TextBasedChannel {
    public archivedAt: Date | null = null;
    public messages: MessageManager = new MessageManager(this.client, this);

    constructor(client: Client, data: APITeamChannel, team: Team | null, group: Group | null) {
        super(client, data, team, group);
    }
    
    public send(content: string): Promise<Message> {
        const messageData = ConvertToMessageFormat(content);
        console.log(JSON.stringify({ message: messageData }));
        return this.client.rest.post(`/channels/${this.id}/messages`, messageData!).then((newMessage) => {
            const tempMessage = this.messages.add(newMessage)!;
            return tempMessage;
        })
    }

    patch(data: APITeamChannel | Partial<APITeamChannel>): this {
        if("archivedAt" in data && data.archivedAt !== undefined) this.archivedAt = data.archivedAt ? new Date(data.archivedAt) : null
        return this;
    }

    archive() {
        return this.client.rest.put(`/teams/${this.teamID}/groups/${this.groupID}/channels/${this.id}/archive`).then(x => {
            this.archivedAt = new Date()
            return this;
        })
    }
}