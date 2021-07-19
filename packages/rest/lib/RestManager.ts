import fetch, { Response } from 'node-fetch';

import { GuildedAPIError } from './GuildedAPIError';

export class RestManager {
    public apiURL: string;
    public token?: string;
    public cookieJar?: string;
    public guildedMID?: string;

    public constructor(public config?: RestManagerOptions) {
        this.apiURL = `https://${config?.apiURL ?? 'api.guilded.gg'}`;
    }

    public async make<T extends JSONB>(
        data: MakeOptions,
        authenticated = true,
        retryCount = 0,
    ): Promise<[Response, Promise<T>]> {
        const headers: HeadersInit = {};
        if (authenticated) headers.cookie = `hmac_signed_session=${this.token};`;
        const requestOptions = {
            body: data.body ? JSON.stringify(data.body) : undefined,
            headers: {
                'content-type': 'application/json',
                ...headers,
            },
            method: data.method,
        };

        let request;
        try {
            request = await fetch(this.apiURL + data.path, requestOptions);
        } catch (e) {
            throw new Error(`Error while making API call, ${e.message}`);
        }

        if (!request.ok) {
            if (request.status === 429) {
                if (retryCount >= (this.config?.maxRatelimitRetryLimit ?? 3)) {
                    throw new Error('MAX REQUEST RATELIMIT RETRY LIMIT REACHED.');
                }
                await sleep(this.config?.restOffset ?? 3500);
                return this.make<T>(data, authenticated, retryCount++);
            }

            const parsedRequest = await request.json().catch(() => ({ message: 'Cannot parse JSON Error Response.' }));
            throw new GuildedAPIError(parsedRequest.message, data.method, data.path, request.status);
        }

        return [request, request.json().catch(() => ({})) as Promise<T>];
    }

    public get<T extends JSONB>(path: string, authenticated = true): Promise<T> {
        return this.make<T>(
            {
                method: 'GET',
                path,
            },
            authenticated,
        ).then(x => x[1]);
    }

    public post<T extends JSONB, B = RequestBodyObject>(path: string, body?: B, authenticated = true): Promise<T> {
        return this.make<T>(
            {
                body,
                method: 'POST',
                path,
            },
            authenticated,
        ).then(x => x[1]);
    }

    public delete<T extends JSONB, B = RequestBodyObject>(path: string, body?: B, authenticated = true): Promise<T> {
        return this.make<T>(
            {
                body,
                method: 'DELETE',
                path,
            },
            authenticated,
        ).then(x => x[1]);
    }

    public patch<T extends JSONB, B = RequestBodyObject>(path: string, body: B, authenticated = true): Promise<T> {
        return this.make<T>(
            {
                body,
                method: 'PATCH',
                path,
            },
            authenticated,
        ).then(x => x[1]);
    }

    public put<T extends JSONB, B = RequestBodyObject>(path: string, body?: B, authenticated = true): Promise<T> {
        return this.make<T>(
            {
                body,
                method: 'PUT',
                path,
            },
            authenticated,
        ).then(x => x[1]);
    }

    public setAuth(cookieJar: string): void {
        this.cookieJar = cookieJar;
        const setCookies = cookieJar.split(' ');
        this.token = extractFromCookieJar(setCookies, 0);
        this.guildedMID = extractFromCookieJar(setCookies, 11);
    }

    public destroy(): void {
        this.cookieJar = undefined;
        this.token = undefined;
    }
}

export interface RestManagerOptions {
    apiURL?: string;
    restOffset?: number;
    maxRatelimitRetryLimit?: number;
}
export interface MakeOptions {
    method: string;
    path: string;
    body?: Record<string, any>;
}
export type JSONB = Record<string, any>;
export type RequestBodyObject = JSONB | undefined;
export interface LoginData {
    email: string;
    password: string;
}

const extractFromCookieJar = (decodedCookieJar: string[], i: number) => decodedCookieJar[i].split('=')[1].split(';')[0];
const sleep = (ms: number): Promise<unknown> => new Promise(r => setTimeout(r, ms));
