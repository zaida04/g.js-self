import { APIContent, APIEmbed, APIMessage, APITeamChannel, CHANNEL_TYPES } from '../common';

/**
 * Get Channel Result
 * @destination /channels/:channelID
 */
export type APIGetChannel = APITeamChannel;

/**
 * Modify Channel
 * @destination /channels/:id
 */
export interface APIPatchChannelBody extends Record<string, any> {
    name?: string;
    type?: CHANNEL_TYPES;
    position?: number | null;
    topic?: string | null;
    nsfw?: boolean | null;
    rate_limit_per_user?: number | null;
    bitrate?: number | null;
    user_limit?: number | null;
    parent_id?: string | null;
}

/**
 * Modify Channel Result
 * @destination /channels/:id
 */
export type APIPatchChannelResult = APITeamChannel;

/**
 * Delete/Close Channel
 * @destination /channels/:id
 */
export type APIDeleteChannel = never;

/**
 * Get Channel Messages
 * @destination /channels/:id/messages?limit=:amt
 */
export interface APIGetChannelMessages extends Record<string, any> {
    messages: APIMessage[];
    hasPastMessages: boolean;
}

/**
 * Get Channel Message
 * @destination /content/route/metadata?route=//channels/:channelID/chat&messageId=:messageID
 */
export interface APIGetChannelMessageQuery extends Record<string, any> {
    route: string;
    messageId: string;
}

/**
 * Get Channel Message Result
 * @destination /content/route/metadata?route=//channels/:channelID/chat&messageId=:messageID
 */
export type APIGetChannelMessageResult = APIMessage;

/**
 * Get Channel Messages
 * @destination /channels/:id/messages?limit=:amt
 * Tested upto 50k messages
 */
export interface APIGetChannelMessagesQuery extends Record<string, any> {
    limit?: number;
}

/**
 * Send Message
 * @destination /channels/:id/messages
 */
export interface APIPostChannelMessagesBody extends Record<string, any> {
    messageId: string;
    content: APIContent;
    embed: APIEmbed;
}

/**
 * Send Message
 * @destination /channels/:id/messages
 */
export type APIPostChannelMessagesResult = APIMessage;

/**
 * Edit Message
 * @destination /channels/:id/messages/:messageID
 */
export interface APIPatchChannelMessageBody extends Record<string, any> {
    content: string;
    embed: APIEmbed;
}

/**
 * Edit Message Result
 * @destination /channels/:id/messages/:messageID
 */
export type APIPatchChannelMessageResult = APIMessage;

/**
 * Delete Message
 * @destination /channels/:channelID/messages/:messageID
 */
export type APIDeleteChannelMessage = never;

/**
 * Add Reaction
 * @destination /channels/:channelID/messages/:messageID/reactions/:reactionID
 */
export type APIPostMessageReactions = never;

/**
 * Delete Own Reactioon
 * @destination /channels/:channelID/messages/:messageID/reactions/:reactionID
 */
export type APIDeleteMessageReactionsOwn = never;

/**
 * Get Pinned Messages
 * @destination /channels/:id/pins
 */
export interface APIGetChannelPinnedMessages {
    message: APIMessage[];
}

/**
 * Pin Message
 * @destination /channels/:id/pins
 */
export interface APIPostChannelPinnedMessagesBody {
    messageId: string;
}

/**
 * Unpin Message
 * @destination /channels/:id/pins/messageID
 */
export type APIDeleteChannelPinnedMessage = never;

/**
 * Create Thread
 * @destination /channels/:id/threads
 */
export interface APIPostChannelCreateThread extends Record<string, any> {
    name: string;
    message: APIMessage;
    channelId: string;
    threadMessageId: string;
    initialThreadMessage: APIMessage;
    contentType: string;
    confirmed: boolean;
}

/**
 * Delete Thread
 * @destination /teams/:teamID/groups/:groupID/channels/threadID
 */
export type APIDeleteChannelThread = never;

/**
 * Post Team Announcements
 * @destination /teams/:teamID/announcements
 */
export interface APIPostTeamAnnouncement {
    title: string;
    content: APIMessage;
}

/**
 * Post Announcement
 * @destination /channels/:id/announcements
 */
export interface APIPostChannelAnnouncementsBody {
    title: string;
    content: APIMessage;
    dontSendNotifications: boolean;
}

/**
 * @destination /teams/:id/channels
 */
export interface APIGetTeamChannels extends Record<string, any> {
    channels: APITeamChannel[];
    badgedChannelContentByChannelId: unknown;
    temporalChannels: any[];
    categories: APITeamChannel[];
}
