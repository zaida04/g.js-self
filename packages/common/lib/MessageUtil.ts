/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-depth */
import Embed from '@guildedjs/embeds';
import type { APIContent, APIEmbed } from '@guildedjs/guilded-api-typings';

import { CONSTANTS } from './Consts';
import { generateUUID } from './UUID';

/**
 * Convert a string or other content to a message suitable to be sent to guilded
 * @internal
 */
export function convertToMessageFormat(
    i: string | Embed,
    e?: Embed,
): [string, { messageId: string; content: APIContent }] {
    let STR_INPUT = '';
    let embed;

    if (i instanceof Embed) embed = i;
    else STR_INPUT = i;
    if (e) embed = e;

    const messageID = generateUUID();
    const message = {
        content: parseToMessage(STR_INPUT, embed),
        messageId: messageID,
    };
    return [messageID, message];
}

export function parseToMessage(input: string | Embed, embed?: Embed): APIContent {
    return {
        document: {
            data: {},
            nodes: [
                {
                    data: {},
                    nodes: [
                        {
                            leaves: [
                                {
                                    marks: [],
                                    object: 'leaf',
                                    text: typeof input === 'string' ? input : '',
                                },
                            ],
                            object: 'text',
                        },
                    ],
                    object: 'block',
                    type: 'markdown-plain-text',
                },
                {
                    data: {
                        embeds: embed ? [embed?.toJSON()] : [],
                    },
                    nodes: [],
                    object: 'block',
                    type: 'webhookMessage',
                },
            ],
            object: 'document',
        },
        object: 'value',
    };
}

/**
 * Parse a message recieved from Guilded into a more digestable structure
 * @internal
 */
export function parseMessage(data: APIContent): parsedMessage {
    const parsedMessageArray: parsedTextResponse[] = [];
    const mentions: {
        users: string[];
        channels: string[];
        reactions: string[];
    } = {
        channels: [],
        reactions: [],
        users: [],
    };
    const embeds: APIEmbed[] = [];

    for (const messageLine of data.document.nodes) {
        switch (messageLine.type) {
            case 'paragraph': {
                for (const node of messageLine.nodes) {
                    switch (node.object) {
                        case 'text': {
                            for (const leaf of node.leaves!) {
                                parsedMessageArray.push({
                                    content: leaf.text,
                                    type: 'text',
                                });
                            }
                            break;
                        }
                        case 'inline': {
                            const castedDataNode = node.data as MessageDataNode;
                            for (const leaf of node.nodes![0].leaves!) {
                                switch (node.type) {
                                    case 'mention': {
                                        mentions.users.push(castedDataNode.mention!.id);
                                        parsedMessageArray.push({
                                            content: leaf.text,
                                            mention: castedDataNode.mention,
                                            type: 'mention',
                                        });
                                        break;
                                    }
                                    case 'reaction': {
                                        mentions.reactions.push(castedDataNode.reaction!.id);
                                        parsedMessageArray.push({
                                            content: leaf.text,
                                            reaction: castedDataNode.reaction,
                                            type: 'reaction',
                                        });
                                        break;
                                    }
                                    case 'channel': {
                                        mentions.channels.push(castedDataNode.channel!.id);
                                        parsedMessageArray.push({
                                            channel: castedDataNode.channel,
                                            content: leaf.text,
                                            type: 'mention',
                                        });
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
                break;
            }
            case 'block-quote-container': {
                for (const MESSAGE_NODES of messageLine.nodes) {
                    for (const node of MESSAGE_NODES.nodes!) {
                        switch (node.object) {
                            case 'text': {
                                parsedMessageArray.push({
                                    content: node.leaves![0].text,
                                    type: 'text',
                                });
                                break;
                            }
                            case 'inline': {
                                const castedDataNode = node.data as MessageDataNode;
                                switch (node.type) {
                                    case 'mention': {
                                        mentions.users.push(castedDataNode.mention!.id);
                                        parsedMessageArray.push({
                                            content: node.nodes![0].leaves![0].text,
                                            mention: castedDataNode.mention,
                                            type: 'mention',
                                        });
                                        break;
                                    }
                                    case 'reaction': {
                                        mentions.reactions.push(castedDataNode.reaction!.id);
                                        parsedMessageArray.push({
                                            content: node.nodes![0].leaves![0].text,
                                            reaction: castedDataNode.reaction,
                                            type: 'text',
                                        });
                                        break;
                                    }
                                    case 'channel': {
                                        mentions.channels.push(castedDataNode.channel!.id);
                                        parsedMessageArray.push({
                                            channel: castedDataNode.channel,
                                            content: node.nodes![0].leaves![0].text,
                                            type: 'mention',
                                        });
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
                break;
            }
            case 'markdown-plain-text': {
                parsedMessageArray.push({
                    content: messageLine.nodes![0].leaves![0].text,
                    type: 'text',
                });
                break;
            }
            case 'webhookMessage': {
                embeds.push(...(messageLine.data as { embeds: APIEmbed[] }).embeds);
                break;
            }
        }
    }

    return {
        mentions: {
            channels: mentions.channels,
            reactions: mentions.reactions,
            users: mentions.users,
        },
        parsedArr: parsedMessageArray,
        parsedText: parsedMessageArray.map(x => x.content).join('\n'),
    };
}

/**
 * A parsed message
 * @internal
 */
export interface parsedMessage {
    parsedText: string;
    parsedArr: parsedTextResponse[];
    mentions: {
        users: string[];
        channels: string[];
        reactions: string[];
    };
    embeds?: unknown[];
}

/**
 * The mentions this message might contain
 * @internal
 */
export interface MessageDataNode {
    reaction?: {
        id: string;
    };
    mention?: {
        id: string;
    };
    channel?: {
        id: string;
    };
}

/**
 * The parsed text of each leaf in the message
 * @internal
 */
export interface parsedTextResponse {
    type: string;
    content: string;
    mention?: unknown;
    reaction?: unknown;
    channel?: unknown;
}

/**
 * The message structure of a string -> message object suitable to send to guilded
 */
export interface enforcedMessageStructure {
    messageId: string;
    content: APIContent;
}
