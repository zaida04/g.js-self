const { config } = require('dotenv');
const { join } = require('path');
const Guilded = require('..');

config({
    path: join(`${__dirname}/../../../testing.env`),
});
const client = new Guilded.Client();
client.prefix = "!";

client.on('ready', () => {
    console.log(`ready!`);
});

/*
client.on("debug", (data, additional_info) => {
    console.log(data);
    console.log(additional_info);
})
*/

client.on('messageCreate', async message => {
    console.log("message recieved!")
    if(!message.content.startsWith(client.prefix)) return;
    const args = message.content.split(/ /g);
    const command = args.shift().slice(client.prefix.length);

    switch(command) {
        case "eval": {
            const code = args.join(" ");
            const evaled = eval(`(async () => {${code}})()`); // eslint-disable-line no-eval
            /* message.channel.send(`
            📥 **Input**
            \`\`\`${code}\`\`\`
            📤 **Output**
            \`\`\`${evaled}\`\`\`
            `); */
            break;
        }
    }
    return;
});

/* Client.on('raw', str => {
    console.log(`raw: ${JSON.stringify(str)}`);
}); */

if (!process.env.EMAIL) throw new Error('Must supply email for testing');
if (!process.env.PASSWORD) throw new Error('Must supply password for testing');

client.login({
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
});
