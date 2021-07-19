module.exports = async (client, passed, failed, testText, errorText) => {
    let message;
    const content = 'TESTING MESSAGE';

    try {
        console.log('...sending message');
        message = await client.channels.sendMessage(process.env.CHANNEL_ID, content);
        testText(`Successfully sent message with ID: ${message}!`);
    } catch (e) {
        errorText(`Message sending failed! ${e}`);
        throw e;
    }

    try {
        console.log('...editing message');
        const newMessage = await client.channels.editMessage(
            process.env.CHANNEL_ID,
            message,
            'THIS IS AN EDITED TEST MESSAGE',
        );
        if (content === newMessage.content) throw new Error('Content is unchanged!');
        testText(`Successfully edited message ${message} with new content ${newMessage.content}`);
    } catch (e) {
        errorText(`Message editing failed! ${e}`);
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
