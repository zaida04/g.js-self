module.exports = (client, passed, failed, testText, errorText) => {
    try {
        client.destroy(true);
        testText('Successfully disconnected!');
    } catch (e) {
        errorText(`Client disconnected failed! ${e}`);
        throw e;
    }
};
