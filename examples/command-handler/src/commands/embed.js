const { Embed } = require('@guildedjs/guilded.js');

module.exports = {
    execute: (msg, args) =>
        msg.channel.send(new Embed().setTitle('Test Embed!').setDescription(`Here are your args: ${args.join(', ')}`)),
    name: 'embed',
};
