// eslint-disable-next-line @typescript-eslint/no-var-requires
const webSocket = require('ws');

module.exports = (client, passed, failed, testText, errorText) => {
    try {
        console.log('...testing connection');
        if (client.gateway.ws.readyState !== webSocket.OPEN) throw new Error('WS NOT OPEN!');
        client.gateway.ws.send('2');
        testText('WS message sent!');
    } catch (e) {
        errorText(`WS connection failed! ${e}`);
        throw e;
    }
};
