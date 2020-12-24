import { BaseData } from "../../typings";
import { ConvertToMessageFormat } from "../../util/MessageUtil";
import Base from "../Base";
import MessageManager from "../managers/MessageManager";
import Message from "../Message";
import TextBasedChannel from "./TextBasedChannel";

export default class PartialChannel extends Base<BaseData> {
    public messages: MessageManager = new MessageManager(this.client, this);
    patch(data: BaseData | Partial<BaseData>) {
        return this;
    }

    public send(content: string): Promise<Message> {
        const messageData = ConvertToMessageFormat(content);
        console.log(JSON.stringify({ message: messageData }));
        return this.client.rest.post(`/channels/${this.id}/messages`, messageData!).then((newMessage) => {
            const tempMessage = this.messages.add(newMessage)!;
            return tempMessage;
        })
    }
}