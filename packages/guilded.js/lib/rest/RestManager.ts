/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch, { Response } from 'node-fetch';

import { CONSTANTS, extractFromCookieJar, sleep } from '../util';
import { GuildedAPIError } from './GuildedAPIError';

export class RestManager {
    public apiURL: string;
    public token: string | undefined;
    public cookieJar: string | undefined;
    public guildedMID: string | undefined;

    public constructor(public config?: RestManagerOptions) {
        this.apiURL = `https://${config?.apiURL ?? CONSTANTS.BASE_DOMAIN}`;
    }

    private async make(
        data: MakeOptions,
        authenticated = true,
        retryCount = 0,
    ): Promise<Array<Response | Promise<Record<string, any>>>> {
        let headers = {};
        if (authenticated) {
            headers = {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                HMAC_SIGNED_SESSION: this.token,
                cookie: this.cookieJar,
            };
        }

        // Glue fix until the rest module supports retry-after
        sleep(this.config?.restOffset ?? 3500);
        let request;
        const requestOptions: any = {
            body: data.body ? JSON.stringify(data.body) : undefined,
            headers: {
                'content-type': 'application/json',
                ...headers,
            },
            method: data.method,
        };

        try {
            request = await fetch(this.apiURL + data.path, requestOptions);

            if (request.status < 200 || request.status > 299) {
                if (request.status === 429) {
                    if (retryCount >= (this.config?.maxRatelimitRetryLimit ?? 3)) {
                        throw new Error('MAX REQUEST RATELIMIT RETRY LIMIT REACHED.');
                    }

                    this.make(data, authenticated, retryCount++);
                }

                const parsedRequest = await request
                    .json()
                    .catch(() => ({ message: 'Cannot parse JSON Error Response.' }));
                throw new GuildedAPIError(parsedRequest.message, data.method, data.path, request.status);
            }

            return [request, request.json()];
        } catch (e) {
            throw e;
        }
    }

    public get<T extends Record<string, any>>(path: string, authenticated = true): Promise<T> {
        return this.make(
            {
                method: 'GET',
                path,
            },
            authenticated,
        ).then(x => (x[1] as Record<string, any>) as T);
    }

    public post<T extends Record<string, any>>(
        path: string,
        body: Record<string, any>,
        authenticated = true,
    ): Promise<T> {
        return this.make(
            {
                body,
                method: 'POST',
                path,
            },
            authenticated,
        ).then(x => (x[1] as Record<string, any>) as T);
    }

    public delete<T extends Record<string, any>>(
        path: string,
        body?: Record<string, any>,
        authenticated = true,
    ): Promise<T> {
        return this.make(
            {
                body,
                method: 'DELETE',
                path,
            },
            authenticated,
        ).then(x => (x[1] as Record<string, any>) as T);
    }

    public patch<T extends Record<string, any>>(
        path: string,
        body: Record<string, any>,
        authenticated = true,
    ): Promise<T> {
        return this.make(
            {
                body,
                method: 'PATCH',
                path,
            },
            authenticated,
        ).then(x => (x[1] as Record<string, any>) as T);
    }

    public put<T extends Record<string, any>>(
        path: string,
        body?: Record<string, any>,
        authenticated = true,
    ): Promise<T> {
        return this.make(
            {
                body,
                method: 'PUT',
                path,
            },
            authenticated,
        ).then(x => (x[1] as Record<string, any>) as T);
    }

    public async init(data: LoginData): Promise<Record<string, any>> {
        if (data.email && data.password) {
            const [loginData] = await this.make(
                {
                    body: {
                        email: data.email,
                        password: data.password,
                    },
                    method: 'POST',
                    path: '/login',
                },
                false,
            );
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.cookieJar = (loginData as Response).headers.get('Set-Cookie')!;
            if (!this.cookieJar) throw new Error('Incorrect Email/Pasword');
            const setCookies = this.cookieJar.split(' ');

            this.token = extractFromCookieJar(setCookies, 0);
            this.guildedMID = extractFromCookieJar(setCookies, 11);
            return loginData;
        } else {
            throw new Error('You must provide an email/password');
        }
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
    body?: Record<string, string> | undefined;
}

export interface LoginData {
    email: string;
    password: string;
}
