import { BaseData } from "../../typings";
import { ConvertToMessageFormat } from "../../util/MessageUtil";
import Base from "../Base";
import MessageManager from "../managers/MessageManager";
import Message from "../Message";

/**
 * A partial channel, not enough data collected to know what *type* of channel it is. Assumed to be a text channel, **use caution when using this object**. Generally constructed if a channel recieved isn't cached and doesn't have enough info in order for us to make an object with it
 */
export default class PartialChannel extends Base<BaseData> {

    /**
     * The messages belonging to this channel
     */
    public messages: MessageManager = new MessageManager(this.client, this);

    /**
     * Update the data in this structure
     * @internal
     */
    patch(data: BaseData | Partial<BaseData>) {
        return this;
    }

    /**
     * Send a message to this channel, hoping that it's a text channel
     */
    public send(content: string): Promise<Message> {
        const messageData = ConvertToMessageFormat(content);
        return this.client.rest.post(`/channels/${this.id}/messages`, messageData!).then((newMessage) => {
            const tempMessage = this.messages.add(newMessage)!;
            return tempMessage;
        })
    }
}