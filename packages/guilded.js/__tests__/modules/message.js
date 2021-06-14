module.exports = async (client, passed, failed, testText, errorText) => {
    let message;
    try {
        console.log('...sending message');
        message = await client.channels.sendMessage(process.env.CHANNEL_ID, 'TESTING MESSAGE');
        testText(`Successfully sent message with ID: ${message}!`);
    } catch (e) {
        errorText(`Message sending failed! ${e}`);
        throw e;
    }

    try {
        console.log('...deleting message');
        await client.channels.deleteMessage(process.env.CHANNEL_ID, message);
        testText('Successfully deleted message!');
    } catch (e) {
        errorText(`Message deletion failed! ${e}`);
        throw e;
    }

    try {
        console.log('...fetching 5 messages');
        const messages = await client.channels.cache.random().messages.fetch(5);
        testText(`Successfully fetched messages!`);
    } catch (e) {
        errorText(`Message fetching failed! ${e}`);
        throw e;
    }
};
