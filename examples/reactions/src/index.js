const Guilded = require('../../../packages/guilded.js');
const client = new Guilded.Client({
    // without this, we would only receive events involving cached messages, so reactions on messages that were sent
    // before the bot was logged in would not be counted.
    partials: ['MESSAGE', 'CHANNEL'],
});

// log to the console when the bot is "ready"
client.on('ready', () => {
    console.log('Guilded Bot is ready!');
});

client.on('messageReactionAdd', (reaction, userOrId) =>
    console.log(`${userOrId?.name ?? userOrId} just reacted with ${reaction.id}`),
);
client.on('messageReactionDelete', (reactionOrId, userOrId) =>
    // we use optional chaining here to tell whether it's a user object or an user ID
    // we also use optional chaining here to tell whether it's a reaction object or a reaction ID.
    console.log(`${userOrId?.name ?? userOrId} just removed their reaction ${reactionOrId?.id ?? reactionOrId}`),
);

client.login({
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
});
