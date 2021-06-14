/* eslint-disable @typescript-eslint/no-var-requires */
const { config } = require('dotenv');
const { join } = require('path');
const { COLORS, testText, errorText, successText } = require('./colors.js');
const guilded = require('..');

config({
    path: join(__dirname, '..', '..', '..', 'testing.env'),
});

if (!process.env.EMAIL) throw new Error('Must supply email for testing');
if (!process.env.PASSWORD) throw new Error('Must supply password for testing');
if (!process.env.TEAM_ID) throw new Error('Must provide a testing team ID');
if (!process.env.ROLE_ID) throw new Error('Must provide a testing role ID');
if (!process.env.GUINEAPIG_ID) throw new Error('Must provide a testing user ID');
if (!process.env.GROUP_ID) throw new Error('Must provide a testing group ID');
if (!process.env.CHANNEL_ID) throw new Error('Must provide a testing channel ID');

const client = new guilded.Client({
    ws: {
        heartbeatInterval: 15000,
    },
});
const prefix = 'gg!';

// Client.on("raw", (a, b) => console.log(a, b));
// client.on("debug", (...a) => console.log(a));

client.on(guilded.events.MESSAGE_REACTION_ADD, a => console.log(`REACTION ADDED: ${a.id}`));
client.on(guilded.events.MESSAGE_REACTION_DELETE, a => console.log(`REACTION REMOVED: ${a.id}`));

/**
 * Testing login
 */
client.once(guilded.events.READY, async () => {
    let passed = 0;
    let failed = 0;

    console.log(
        `Successfully logged in as ${client.user.id}. Currently in ${client.teams.cache.size} Teams and serving ${client.users.cache.size} users with ${client.channels.cache.size} channels.`,
    );

    testText('Role adding/Removal');
    await require('./modules/role')(client, passed, failed, successText, errorText)
        .then(() => passed++)
        .catch(() => failed++);

    testText('Client Disconnection/Reconnection');
    try {
        require('./modules/connection')(client, passed, failed, successText, errorText);
        passed++;
    } catch {
        failed++;
    }

    testText('Message Sending/Editing/Deletion/Fetching');
    await require('./modules/message')(client, passed, failed, successText, errorText)
        .then(() => passed++)
        .catch(() => failed++);

    testText('Active WS connection');
    try {
        require('./modules/ws')(client, passed, failed, successText, errorText);
        passed++;
    } catch {
        failed++;
    }

    testText('Invite Creation/Deletion');
    await require('./modules/invite')(client, passed, failed, successText, errorText)
        .then(() => passed++)
        .catch(() => failed++);

    console.log(`\n\n${COLORS.GREEN} ${passed} tests passed.${COLORS.RED} ${failed} tests failed. ${COLORS.RESET}`);
});

/*
Client.on("debug", (data, additional_info) => {
    console.log(data);
    console.log(additional_info);
})
*/

client.on(guilded.events.MESSAGE_CREATE, message => {
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.split(/ /g);
    const command = args.shift().slice(prefix.length);

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
        case 'ping': {
            return message.channel.send('HI!');
        }
    }
});

client.login({
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
});
