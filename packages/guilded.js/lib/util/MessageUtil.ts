/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-depth */
import { APIContent } from '@guildedjs/guilded-api-typings';
import { v4 as uuidv4 } from 'uuid';

export function ConvertToMessageFormat(input: string | unknown) {
    if (typeof input === "string") {
        return {
            "messageId": uuidv4(),
            "content": {
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
                                            text: input,
                                            marks: []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
}

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

export interface parsedTextResponse {
    type: string;
    content: any;
    mention?: unknown;
    reaction?: unknown;
    channel?: unknown;
}

export interface enforcedMessageStructure {
    messageId: string,
    content: APIContent
}