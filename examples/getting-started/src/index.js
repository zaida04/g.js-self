// if you are not running this code in the examples directory, please run npm install @guildedjs/guilded.js and swap below.
const Guilded = require('../../../packages/guilded.js');
const client = new Guilded.Client();
const prefix = '!';

// log to the console when the bot is "ready"
client.on('ready', () => {
    console.log('Guilded Bot is ready!');
});

// on every message sent that your account can see in guilded (including your own), run the callback function provided.
client.on('messageCreate', msg => {
    // if the message doesn't start with our prefix, we want to discard this message
    if (!msg.content.startsWith(prefix)) return;
    // we first slice off the prefix from the message content, get rid of spaces at the beginning and end of the message
    // and then split the string into an array based on every space in the message
    // we then destructure the returned array because we know the first element will always be the command name, and the rest are args
    const [commandName, ...args] = msg.content.slice(botConfig.GLOBAL_PREFIX.length).trim().split(/ +/);

    switch (commandName) {
        case 'hi': {
            return msg.channel.send('Hello!');
        }
        case 'ping': {
            return msg.channel.send('Pong');
        }
        case 'say': {
            return msg.channel.send(args.join(' '));
        }
        case 'embed': {
            return msg.channel.send(
                new Guilded.Embed()
                    .setTitle('Test Embed')
                    .setDescription('Test Description')
                    .setTimestamp()
                    .setURL('https://google.com')
                    .setFooter('Test Footer'),
            );
        }
    }
});

client.login({
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
});
