const { config } = require('dotenv');
const { join } = require('path');
const { COLORS, tester } = require("./colors.js");
const Guilded = require('..');

config({
    path: join(`${__dirname}/../../../testing.env`),
});
const client = new Guilded.Client({
    "ws": {
        "heartbeatInterval": 15000
    }
});
client.prefix = "gg!";

// client.on("raw", (a) => console.log(a));
// client.on("debug", (a) => console.log(a));

/**
 * Testing login
 */
client.on('ready', async () => {
    let passed = 0;
    let failed = 0;

    console.log(`Successfully logged in as ${client.user.id}. Currently in ${client.teams.cache.size} Teams and serving ${client.users.cache.size} users with ${client.channels.cache.size} channels.`);
    const team = await client.teams.fetch(process.env.TEAM_ID);
    
    /**
     * Test 1
     */
    tester(COLORS.YELLOW, "---Test 1: Role adding/Removal---");

    try {
        console.log("...adding role");
        await team.members.addRoleTo(process.env.GUINEAPIG_ID, process.env.ROLE_ID);
        tester(COLORS.GREEN, "Role successfully added.");
        passed++;
    } catch(e) {
        tester(COLORS.RED, "Role adding failed! " + e);
        failed++;
    }

    try {
        console.log("...removing role");
        await team.members.removeRoleFrom(process.env.GUINEAPIG_ID, process.env.ROLE_ID);
        tester(COLORS.GREEN, "Role successfully removed.");
        passed++;
    } catch(e) {
        tester(COLORS.RED, "Role removal failed! " + e);
        failed++;
    }

    /**
     * Test 2
     */
    tester(COLORS.YELLOW, "\n---Test 2: Message Sending/Editing/Deletion---");

    let message;
    try {
        console.log("...sending message");
        message = await client.channels.sendMessage(process.env.CHANNEL_ID, "TESTING MESSAGE");
        tester(COLORS.GREEN, `Successfully sent message with ID: ${message}!`);
        passed++;
    } catch(e) {
        tester(COLORS.RED, "Message sending failed! " + e);
        failed++;
    }

    try {
        console.log("...deleting message");
        await client.channels.deleteMessage(process.env.CHANNEL_ID, message);
        tester(COLORS.GREEN, "Successfully deleted message!");
        passed++;
    } catch(e) {
        tester(COLORS.RED, "Message deletion failed! " + e);
        failed++;
    }

    console.log(`\n\n${COLORS.GREEN} ${passed} tests passed.${COLORS.RED} ${failed} tests failed. ${COLORS.RESET}`)
});

/*
client.on("debug", (data, additional_info) => {
    console.log(data);
    console.log(additional_info);
})
*/

client.on('messageCreate', async message => {
    if(!message.content.startsWith(client.prefix)) return;
    const args = message.content.split(/ /g);
    const command = args.shift().slice(client.prefix.length);

    switch(command) {
        case "eval": {
            const code = args.join(" ");
            const evaled = eval(`(async () => {${code}})()`);
            message.channel.send(`
            📥 **Input**
            \`\`\`${code}\`\`\`
            📤 **Output**
            \`\`\`${evaled}\`\`\`
            `);
            break;
        }
    }
    return;
});

if (!process.env.EMAIL) throw new Error('Must supply email for testing');
if (!process.env.PASSWORD) throw new Error('Must supply password for testing');
if (!process.env.TEAM_ID) throw new Error('Must provide a testing team ID');
if (!process.env.ROLE_ID) throw new Error('Must provide a testing role ID');
if (!process.env.GUINEAPIG_ID) throw new Error('Must provide a testing user ID');
// if (!process.env.GROUP_ID) throw new Error('Must proivde a testing group ID');
if (!process.env.CHANNEL_ID) throw new Error('Must provide a testing channel ID');

client.login({
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
});
