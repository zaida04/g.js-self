import type { Client } from '../../structures/Client';

export default abstract class Event {
    constructor(public client: Client) {}
    public abstract ingest(data: any): (string | boolean)[];
    public partialEnabled(): boolean {
        return !!this.client.options?.partials?.length;
    }
}
