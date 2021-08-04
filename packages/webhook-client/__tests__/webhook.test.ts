import { join } from 'path';
require('dotenv').config({ path: join(__dirname, '..', '..', '..', 'testing.env') });
import { WebhookClient } from '..';

if (!process.env.WEBHOOK_URL) {
    throw new Error('Please provide a webhook URL in a .env file in the root of this project.');
}
const webhook = new WebhookClient(process.env.WEBHOOK_URL);

test('Send message through webhook', async () => {
    const msg = await webhook.send('Testing Webhook sending from JEST!');
    expect(msg.id).not.toBeUndefined();
});
