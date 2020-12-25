import { APITextBasedChannel } from "@guildedjs/guilded-api-typings";
import { ConvertToMessageFormat } from "../../util/MessageUtil";
import Channel from "./Channel";
import MessageManager from "../managers/MessageManager";
import Message from "../Message";

/**
 * A channel that we can send messages to, that's all we know lol
 */
export default abstract class TextBasedChannel extends Channel<APITextBasedChannel>{
    /**
     * The manager in charge of managing the messages belonging to this channel
     */
    public abstract messages: MessageManager;

    /**
     * Send a message to this channel
     */
    public abstract send(content: string): Promise<Message>;
}