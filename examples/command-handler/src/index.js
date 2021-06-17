const Guilded = require('../../../packages/guilded.js');
const Collection = require('@discordjs/collection');
// function to construct paths to files
const { join } = require('path');
// we use fs/promises here for the promisifed versions of fs functions
const { readdir } = require('fs/promises');
const client = new Guilded.Client();
const context = {
    commands: new Collection(),
};
const prefix = '!';

client.on('ready', () => {
    console.log('Guilded Bot is ready!');
});

client.on('messageCreate', async msg => {
    if (!msg.content.startsWith(prefix)) return;
    let [commandName, ...args] = msg.content.slice(prefix.length).trim().split(/ +/);
    commandName = commandName.toLowerCase();

    const command = context.commands.get(commandName) ?? context.commands.find(x => x.aliases?.includes(commandName));
    if (!command) return;

    try {
        await command.execute(msg, args);
    } catch (e) {
        msg.channel.send('There was an error executing that command!');
        void console.error(e);
    }
});

(async () => {
    // read the commands dir and have the file extensions.
    const commandDir = await readdir(join(__dirname, 'commands'), { withFileTypes: true });

    // go through all the files/dirs scanned from the readdir, and make sure we only have js files
    for (const file of commandDir.filter(x => x.name.endsWith('.js'))) {
        const command = require(join(__dirname, 'commands', file.name));
        context.commands.set(command.name, command);
    }

    client.login({
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
    });
})();
