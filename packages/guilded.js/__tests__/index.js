/* eslint-disable @typescript-eslint/no-var-requires */
const { config } = require('dotenv');
const { join } = require('path');
const { COLORS, tester } = require('./colors.js');
const WebSocket = require('ws');
const Guilded = require('..');

config({
    path: join(`${__dirname}/../../../testing.env`),
});
const client = new Guilded.Client({
    ws: {
        heartbeatInterval: 15000,
    },
});
client.prefix = 'gg!';

// client.on("raw", (a, b) => console.log(a, b));
// client.on("debug", (...a) => console.log(a));

client.on(Guilded.events.MESSAGE_REACTION_ADD, a => console.log(`REACTION ADDED: ${a.id}`));
client.on(Guilded.events.MESSAGE_REACTION_DELETE, a => console.log(`REACTION REMOVED: ${a.id}`));

/**
 * Testing login
 */
client.once(Guilded.events.READY, async () => {
    let passed = 0;
    let failed = 0;

    console.log(
        `Successfully logged in as ${client.user.id}. Currently in ${client.teams.cache.size} Teams and serving ${client.users.cache.size} users with ${client.channels.cache.size} channels.`,
    );
    const team = await client.teams.fetch(process.env.TEAM_ID);

    /**
     * Test 1
     */
    tester(COLORS.YELLOW, '---Test 1: Role adding/Removal---');

    try {
        console.log('...adding role');
        await client.teams.addRoleToMember(team.id, process.env.GUINEAPIG_ID, process.env.ROLE_ID);
        tester(COLORS.GREEN, 'Role successfully added.');
        passed++;
    } catch (e) {
        tester(COLORS.RED, `Role adding failed! ${e}`);
        failed++;
    }

    try {
        console.log('...removing role');
        await client.teams.removeRoleFromMember(team.id, process.env.GUINEAPIG_ID, process.env.ROLE_ID);
        tester(COLORS.GREEN, 'Role successfully removed.');
        passed++;
    } catch (e) {
        tester(COLORS.RED, `Role removal failed! ${e}`);
        failed++;
    }

    /**
     * Test 2
     */
    tester(COLORS.YELLOW, '\n---Test 2: disconnecting and reconnecting client---');
    try {
        client.destroy(true);
        tester(COLORS.GREEN, 'Successfully disconnected!');
        passed++;
    } catch (e) {
        tester(COLORS.RED, `Client disconnected failed! ${e}`);
        failed++;
    }

    /**
     * Test 3
     */
    tester(COLORS.YELLOW, '\n---Test 3: Message Sending/Editing/Deletion/Fetching---');

    let message;
    try {
        console.log('...sending message');
        message = await client.channels.sendMessage(process.env.CHANNEL_ID, 'TESTING MESSAGE');
        tester(COLORS.GREEN, `Successfully sent message with ID: ${message}!`);
        passed++;
    } catch (e) {
        tester(COLORS.RED, `Message sending failed! ${e}`);
        failed++;
    }

    try {
        console.log('...deleting message');
        await client.channels.deleteMessage(process.env.CHANNEL_ID, message);
        tester(COLORS.GREEN, 'Successfully deleted message!');
        passed++;
    } catch (e) {
        tester(COLORS.RED, `Message deletion failed! ${e}`);
        failed++;
    }

    try {
        console.log('...fetching 5 messages');
        const messages = await client.channels.cache.random().messages.fetch(5);
        tester(COLORS.GREEN, `Successfully fetched messages!`);
        passed++;
    } catch (e) {
        tester(COLORS.RED, `Message fetching failed! ${e}`);
        console.log(e);
        failed++;
    }

    /**
     * Test 4
     */
    tester(COLORS.YELLOW, '\n---Test 4: Active WS connection---');

    try {
        console.log('...testing connection');
        if (client.gateway.ws.readyState !== WebSocket.OPEN) throw new Error('WS NOT OPEN!');
        client.gateway.ws.send('2');
        console.log('...ws message sent!');
        passed++;
    } catch (e) {
        tester(COLORS.RED, `WS connection failed! ${e}`);
        failed++;
    }

    console.log(`\n\n${COLORS.GREEN} ${passed} tests passed.${COLORS.RED} ${failed} tests failed. ${COLORS.RESET}`);
});

/*
Client.on("debug", (data, additional_info) => {
    console.log(data);
    console.log(additional_info);
})
*/

client.on(Guilded.events.MESSAGE_CREATE, async message => {
    if (!message.content.startsWith(client.prefix)) return;
    const args = message.content.split(/ /g);
    const command = args.shift().slice(client.prefix.length);

    switch (command) {
        case 'eval': {
            if (message.authorID !== client.user.id) return message.channel.send('**NICE TRY**');
            const code = args.join(' ');
            const evaled = eval(`(async () => {${code}})()`);
            message.channel.send(`
            📥 **Input**
            \`\`\`${code}\`\`\`
            📤 **Output**
            \`\`\`${evaled}\`\`\`
            `);
            break;
        }
        case "ping": {
            return message.channel.send("HI!");
            break;
        }
    }
});

if (!process.env.EMAIL) throw new Error('Must supply email for testing');
if (!process.env.PASSWORD) throw new Error('Must supply password for testing');
if (!process.env.TEAM_ID) throw new Error('Must provide a testing team ID');
if (!process.env.ROLE_ID) throw new Error('Must provide a testing role ID');
if (!process.env.GUINEAPIG_ID) throw new Error('Must provide a testing user ID');
// If (!process.env.GROUP_ID) throw new Error('Must proivde a testing group ID');
if (!process.env.CHANNEL_ID) throw new Error('Must provide a testing channel ID');

client.login({
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
});

