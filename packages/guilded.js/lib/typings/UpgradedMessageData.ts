import { APIMessage } from "@guildedjs/guilded-api-typings";

export interface UpgradedMessageData extends APIMessage {
    teamId?: string | null;
}