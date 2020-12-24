import { APITextBasedChannel } from "@guildedjs/guilded-api-typings";
import { ConvertToMessageFormat } from "../../util/MessageUtil";
import Channel from "./Channel";
import MessageManager from "../managers/MessageManager";
import Message from "../Message";

export default abstract class TextBasedChannel extends Channel<APITextBasedChannel>{
    public abstract messages: MessageManager;

    public abstract send(content: string): Promise<Message>;
}