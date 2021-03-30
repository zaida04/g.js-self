/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-depth */
import { APIContent } from '@guildedjs/guilded-api-typings';
import { GenerateUUID } from "./GenerateID";
import {RichEmbed} from '../structures/RichEmbed';
import { CONSTANTS } from "./Consts";

/**
 * Convert a string or other content to a message suitable to be sent to guilded
 * @internal
 */
export function ConvertToMessageFormat(i: string | RichEmbed, e?: RichEmbed): [string, Record<string, any>] {
    let str_input = "";
    let embed;

    if(i instanceof RichEmbed) embed = i;
    else str_input = i;
    if(e) embed = e;
    
    const messageID = GenerateUUID();
    let message: { content?: Record<string, any>, messageId: string} = { messageId: messageID };
    message["content"] = parseToMessage(str_input, embed);
    return [messageID, message];
}

function parseToMessage(input: string | RichEmbed, embed?: RichEmbed) {
    return {
        object: "value",
        document: {
            object: "document",
            data: {},
            nodes: [
                {
                    object: 'block',
                    type: "markdown-plain-text",
                    data: {},
                    nodes: [
                        {
                            object: "text",
                            leaves: [
                                {
                                    object: "leaf",
                                    text: typeof input === "string" ? input : "",
                                    marks: []
                                }
                            ]
                        }
                    ]
                }, {
                    object: "block",
                    type: "webhookMessage",
                    data: {
                        embeds: embed ? [embed?.toJSON()] : []
                    },
                    nodes: []
                }
            ]
        }
    };
}


/**
 * Parse a message recieved from Guilded into a more digestable structure
 * @internal
 */
export function ParseMessage(data: APIContent): parsedMessage {
    const parsedMessageArray: parsedTextResponse[] = [];
    const mentions: {
        users: string[];
        channels: string[];
        reactions: string[];
    } = {
        users: [],
        channels: [],
        reactions: [],
    };
    const embeds: unknown[] = [];

    for (const messageLine of data.document.nodes) {
        switch (messageLine.type) {
            case 'paragraph': {
                for (const node of messageLine.nodes) {
                    switch (node.object) {
                        case 'text': {
                            for (const leaf of node.leaves!) {
                                parsedMessageArray.push({
                                    type: 'text',
                                    content: leaf.text,
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
                                            type: 'mention',
                                            content: leaf.text,
                                            mention: castedDataNode.mention,
                                        });
                                        break;
                                    }
                                    case 'reaction': {
                                        mentions.reactions.push(castedDataNode.reaction!.id);
                                        parsedMessageArray.push({
                                            type: 'reaction',
                                            content: leaf.text,
                                            reaction: castedDataNode.reaction,
                                        });
                                        break;
                                    }
                                    case 'channel': {
                                        mentions.channels.push(castedDataNode.channel!.id);
                                        parsedMessageArray.push({
                                            type: 'mention',
                                            content: leaf.text,
                                            channel: castedDataNode.channel,
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
                for (const MessageNodes of messageLine.nodes) {
                    for (const node of MessageNodes.nodes!) {
                        switch (node.object) {
                            case 'text': {
                                parsedMessageArray.push({
                                    type: 'text',
                                    content: node.leaves![0].text,
                                });
                                break;
                            }
                            case 'inline': {
                                const castedDataNode = node.data as MessageDataNode;
                                switch (node.type) {
                                    case 'mention': {
                                        mentions.users.push(castedDataNode.mention!.id);
                                        parsedMessageArray.push({
                                            type: 'mention',
                                            content: node.nodes![0].leaves![0].text,
                                            mention: castedDataNode.mention,
                                        });
                                        break;
                                    }
                                    case 'reaction': {
                                        mentions.reactions.push(castedDataNode.reaction!.id);
                                        parsedMessageArray.push({
                                            type: 'text',
                                            content: node.nodes![0].leaves![0].text,
                                            reaction: castedDataNode.reaction,
                                        });
                                        break;
                                    }
                                    case 'channel': {
                                        mentions.channels.push(castedDataNode.channel!.id);
                                        parsedMessageArray.push({
                                            type: 'mention',
                                            content: node.nodes![0].leaves![0].text,
                                            channel: castedDataNode.channel,
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
                    type: 'text',
                    content: messageLine.nodes![0].leaves![0].text,
                });
                break;
            }
            case 'webhookMessage': {
                embeds.push((messageLine.data as { embeds: unknown[] }).embeds);
                break;
            }
        }
    }

    return {
        parsedText: parsedMessageArray.map(x => x.content).join('\n'),
        parsedArr: parsedMessageArray,
        mentions: {
            users: mentions.users,
            channels: mentions.channels,
            reactions: mentions.reactions,
        },
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
    content: any;
    mention?: unknown;
    reaction?: unknown;
    channel?: unknown;
}

/**
 * The message structure of a string -> message object suitable to send to guilded
 */
export interface enforcedMessageStructure {
    messageId: string,
    content: APIContent
}

/**
 * Copyright 2015 - 2021 Amish Shah
 * Copyrights licensed under the Apache License 2.0, https://github.com/discordjs/discord.js/blob/master/LICENSE
 * Taken from https://github.com/discordjs/discord.js/blob/stable/src/util/Util.js#L436
 */
export function resolveColor(color: string | number): number {
    let resolvedColor;

    if (typeof color === 'string') {
        if (color === 'RANDOM') return Math.floor(Math.random() * (0xffffff + 1));
        if (color === 'DEFAULT') return 0;
        resolvedColor = CONSTANTS.COLORS[color] || parseInt(color.replace('#', ''), 16);
      } else if (Array.isArray(color)) {
        resolvedColor = (color[0] << 16) + (color[1] << 8) + color[2];
      }
  
      if (color < 0 || color > 0xffffff) throw new RangeError('COLOR_RANGE');
      else if (color && isNaN(color as number)) throw new TypeError('COLOR_CONVERT');
  
      return resolvedColor;
}