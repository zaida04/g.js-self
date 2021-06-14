// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Embed } = require('@guildedjs/embeds');
const iconURL = 'https://cdn.discordapp.com/avatars/500765481788112916/0c12c135aeeae527f46e9f737e6ca937.png';

module.exports = async (client, passed, failed, testText, errorText) => {
    try {
        console.log('...sending embed');
        message = await client.channels.sendMessage(
            process.env.CHANNEL_ID,
            new Embed()
                .setTitle('TESTING EMBED!')
                .setAuthor('Joe Mama', iconURL, 'https://google.com')
                .setDescription('This is a test description')
                .setFooter('This is a footer', iconURL)
                .setTimestamp(new Date().getTime())
                .setURL('https://google.com')
                .setImage(iconURL),
        );
        testText(`Successfully sent embed message with ID: ${message}!`);
    } catch (e) {
        errorText(`Message sending failed! ${e}`);
        throw e;
    }
};
