import { APIDMChannel, APITeamChannel } from "@guildedjs/guilded-api-typings";
import Client from "../Client";
import TextBasedChannel from "./TextBasedChannel";
import MessageManager from "../managers/MessageManager";
import Message from "../Message";
import { ConvertToMessageFormat } from "../../util/MessageUtil";
import Channel from "./Channel";

export default class DMChannel extends Channel<APIDMChannel> implements TextBasedChannel {
    public messages: MessageManager = new MessageManager(this.client, this);

    constructor(client: Client, data: APIDMChannel) {
        super(client, data);
    }

    public send(content: string): Promise<Message> {
        const messageData = ConvertToMessageFormat(content);
        return this.client.rest.post(`/channels/${this.id}/messages`, messageData!).then((newMessage) => {
            const tempMessage = this.messages.add(newMessage)!;
            return tempMessage;
        })
    }

    patch(data: APIDMChannel | Partial<APIDMChannel>): this {
        return this;
    }
}