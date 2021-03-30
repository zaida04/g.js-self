import { APIPartialMessage } from "@guildedjs/guilded-api-typings";

export interface PartialMessageData extends APIPartialMessage {
    channelId: string;
}