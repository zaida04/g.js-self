import { APIDMChannel, APITeamChannel } from "@guildedjs/guilded-api-typings";
import Client from "../Client";
import TextBasedChannel from "./TextBasedChannel";
import MessageManager from "../managers/MessageManager";
import Message from "../Message";
import { ConvertToMessageFormat } from "../../util/MessageUtil";
import Channel from "./Channel";

/**
 * A channel between the client user and an other user(s) in DMs
 */
export default class DMChannel extends Channel<APIDMChannel> implements TextBasedChannel {
    public messages: MessageManager = new MessageManager(this.client, this);

    constructor(client: Client, data: APIDMChannel) {
        super(client, data);
    }

    public send(content: string): Promise<string> {
        return this.client.channels.sendMessage(this.id, content);
    }

    public patch(data: APIDMChannel | Partial<APIDMChannel>): this {
        return this;
    }
}