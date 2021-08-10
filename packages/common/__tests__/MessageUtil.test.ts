import { generateMessage, parseMessage, parseToMessage } from '..';
import { Embed } from '../../embeds';
import data from './MessageUtil.test.data.json';

const testingMessage1 = 'TESTING MESSAGE' as const;
const testingMessage2 = 'TESTING MESSAGE 2' as const;
const testingMessage3 = 'TESTING MESSAGE 3' as const;

// taken from https://stackoverflow.com/a/13653180, show them some love.
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

test('convert plain-text content to proper message format', () => {
    expect(parseToMessage(testingMessage1)).toStrictEqual(data['plain-message']);
});
test('convert embed content to proper message format', () => {
    expect(parseToMessage(new Embed().setTitle(testingMessage1))).toEqual(data['embed-message']);
});
test('convert both plain-text and embed content to proper message format', () => {
    expect(parseToMessage(testingMessage2, new Embed().setTitle(testingMessage3))).toEqual(data['mixed-message']);
});
test('generate valid sendable plain-text message structure', () => {
    const [id, message] = generateMessage(testingMessage1);
    expect(id).toMatch(UUID_REGEX);
    expect(message.content).toStrictEqual(data['plain-message']);
});
test('generate valid sendable embed message structure', () => {
    const [id, message] = generateMessage(new Embed().setTitle(testingMessage1));
    expect(id).toMatch(UUID_REGEX);
    expect(message.content).toEqual(data['embed-message']);
});
test('generate valid sendable embed and plain-text message structure', () => {
    const [id, message] = generateMessage(testingMessage2, new Embed().setTitle(testingMessage3));
    expect(id).toMatch(UUID_REGEX);
    expect(message.content).toEqual(data['mixed-message']);
});

test('parse regular message', () => {
    expect(parseMessage(data['plain-message'])).toStrictEqual({
        embeds: [],
        mentions: {
            channels: [],
            reactions: [],
            roles: [],
            users: [],
        },
        parsedArr: [{ content: 'TESTING MESSAGE', type: 'text' }],
        parsedText: 'TESTING MESSAGE',
    });
});

test('parse embed message', () => {
    expect(parseMessage(data['embed-message'])).toStrictEqual({
        embeds: [
            {
                fields: [],
                title: 'TESTING MESSAGE',
            },
        ],
        mentions: {
            channels: [],
            reactions: [],
            roles: [],
            users: [],
        },
        parsedArr: [],
        parsedText: '',
    });
});

test('parse multi-line message', () => {
    expect(parseMessage(data['multi-line'])).toStrictEqual({
        embeds: [],
        mentions: {
            channels: [],
            reactions: [],
            roles: [],
            users: [],
        },
        parsedArr: [
            { content: 'MULTILINE', type: 'text' },
            { content: 'STRING', type: 'text' },
            { content: 'TEST', type: 'text' },
        ],
        parsedText: 'MULTILINE\nSTRING\nTEST',
    });
});

test('parse message with user mentions', () => {
    expect(parseMessage(data['user-mention'])).toStrictEqual({
        embeds: [],
        mentions: {
            channels: [],
            reactions: [],
            roles: [],
            users: ['user-id'],
        },
        parsedArr: [
            {
                content: '@nico',
                mention: {
                    avatar: data.avatarURL,
                    color: '#ececee',
                    id: 'user-id',
                    matcher: '@nico',
                    name: 'nico',
                    nickname: false,
                    type: 'person',
                },
                type: 'user',
            },
            { content: ' testing testing!', type: 'text' },
        ],
        parsedText: '@nico testing testing!',
    });
});
test('parse message with role mentions', () => {
    expect(parseMessage(data['role-mention'])).toStrictEqual({
        embeds: [],
        mentions: {
            channels: [],
            reactions: [],
            roles: ['10000000'],
            users: [],
        },
        parsedArr: [
            {
                content: '@Captain',
                mention: {
                    color: '#d9acff',
                    id: 10000000,
                    matcher: '@captain',
                    name: 'Captain',
                    type: 'role',
                },
                type: 'role',
            },
            { content: ' testing testing 3!', type: 'text' },
        ],
        parsedText: '@Captain testing testing 3!',
    });
});
test('parse message with channel mentions', () => {
    expect(parseMessage(data['channel-mention'])).toStrictEqual({
        embeds: [],
        mentions: {
            channels: ['channel-id'],
            reactions: [],
            roles: [],
            users: [],
        },
        parsedArr: [
            {
                channel: {
                    id: 'channel-id',
                    matcher: '#testing',
                    name: 'testing',
                },
                content: '#testing',
                type: 'channel',
            },
            { content: ' testing testing!', type: 'text' },
        ],
        parsedText: '#testing testing testing!',
    });
});
test('parse message with mixed mentions', () => {});
