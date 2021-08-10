import { WebhookClient } from '..';
const id = 'THISISARANDOMID';
const token = 'THISISARANDOMTOKEN';
const url = `https://media.guilded.gg/webhooks/${id}/${token}`;

test('Pass URL as connection string', () => {
    const webhook = new WebhookClient(url);
    expect(webhook.id).toStrictEqual(id);
    expect(webhook.token).toStrictEqual(token);
    expect(webhook.URL).toStrictEqual(url);
});

test('Pass id and token as connection string', () => {
    const webhook = new WebhookClient({ id, token });
    expect(webhook.id).toStrictEqual(id);
    expect(webhook.token).toStrictEqual(token);
    expect(webhook.URL).toStrictEqual(url);
});

test('Get error when passing bad url', () => {
    expect(() => new WebhookClient('thisisnotagoodurl')).toThrow(
        new Error('Not a proper guilded webhook URL! Alternatively, you can provide an ID/token'),
    );
});

test('Get error when not passing anything in constructor', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(() => new WebhookClient()).toThrow(
        new Error('Must provide Webhook connection info in either string or object. Received undefined.'),
    );
});

test('Pass only partial constructable info', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(() => new WebhookClient({ id: 'aiuhdfius' })).toThrow(
        new Error(
            'You must provide either a webhook URL or a webhook ID & token in an object when constructing the Webhook Client',
        ),
    );
});
