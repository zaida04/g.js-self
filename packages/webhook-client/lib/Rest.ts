import { GuildedAPIError } from '@guildedjs/common';
import fetch, { Response } from 'node-fetch';

import { BASE_URL } from './consts';
import Webhook from './Webhook';

export default class RestHandler {
    public constructor(public readonly client: Webhook) {}

    private async make(data: MakeOptions): Promise<Response> {
        const request = await fetch(BASE_URL + data.path, {
            body: data.body ? JSON.stringify(data.body) : '{}',
            headers: {
                'content-type': 'application/json',
            },
            method: data.method,
        });
        if (request.status < 200 || request.status > 299) {
            const parsedRequest = await request.json();
            throw new GuildedAPIError(parsedRequest.message, data.method, data.path, request.status);
        }

        return request;
    }

    public get<T extends JSONB>(path: string): Promise<T | JSONB> {
        return this.make({
            method: 'GET',
            path: path,
        }).then(x => x.json().catch(emptyObjectCatch));
    }

    public post<T extends JSONB>(path: string, body: JSONB): Promise<T | JSONB> {
        return this.make({
            body: body,
            method: 'POST',
            path: path,
        }).then(x => x.json().catch(emptyObjectCatch));
    }

    public delete<T extends JSONB>(path: string, body?: JSONB): Promise<T | JSONB> {
        return this.make({
            body: body,
            method: 'DELETE',
            path: path,
        }).then(x => x.json().catch(emptyObjectCatch));
    }

    public patch<T extends JSONB>(path: string, body: JSONB): Promise<T | JSONB> {
        return this.make({
            body: body,
            method: 'PATCH',
            path: path,
        }).then(x => x.json().catch(emptyObjectCatch));
    }

    public put<T extends JSONB>(path: string, body?: JSONB): Promise<T | JSONB> {
        return this.make({
            body: body,
            method: 'PUT',
            path: path,
        }).then(x => x.json().catch(emptyObjectCatch));
    }
}

const emptyObjectCatch = () => ({});

// shortcut for Record<string, any>
export type JSONB = Record<string, any>;

export interface MakeOptions {
    method: string;
    path: string;
    body?: Record<string, string>;
}
