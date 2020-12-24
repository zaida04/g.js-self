/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch, { Response } from 'node-fetch';

import GuildedAPIError from './GuildedAPIError';

export default class RestManager {
    public apiURL: string;
    public baseDomain = 'api.guilded.gg';
    public token: string | undefined;
    public cookieJar: string | undefined;

    constructor(config?: RestManagerOptions) {
        this.apiURL = config?.apiURL ?? `https://${this.baseDomain}`;
    }
    /*
                Response["headers"]["set-cookie"].forEach(function (element) {
                    self.cookies += element.split(" ")[0];
                });
    */
    private async make(data: MakeOptions, authenticated = true): Promise<Response> {
        let headers = {};
        if (authenticated) {
            headers = {
                hmac_signed_session: this.token,
                cookie: this.cookieJar,
            };
        }

        const request = await fetch(this.apiURL + data.path, {
            method: data.method,
            body: data.body ? JSON.stringify(data.body) : undefined,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });
        if (request.status < 200 || request.status > 299) {
            const parsedRequest = await request.json();
            throw new GuildedAPIError(parsedRequest.message, data.method, data.path, request.status);
        }

        return request;
    }

    public get<T extends Record<string, any>>(path: string, authenticated = true): Promise<Record<string, any> | T> {
        return this.make(
            {
                method: 'GET',
                path: path,
            },
            authenticated,
        ).then(x => x.json());
    }

    public post<T extends Record<string, any>>(
        path: string,
        body: Record<string, any>,
        authenticated = true,
    ): Promise<Record<string, any> | T> {
        return this.make(
            {
                method: 'POST',
                body: body,
                path: path,
            },
            authenticated,
        ).then(x => x.json());
    }

    public delete<T extends Record<string, any>>(
        path: string,
        body?: Record<string, any>,
        authenticated = true,
    ): Promise<Record<string, any> | T> {
        return this.make(
            {
                method: 'DELETE',
                body: body,
                path: path,
            },
            authenticated,
        ).then(x => x.json());
    }

    public patch<T extends Record<string, any>>(
        path: string,
        body: Record<string, any>,
        authenticated = true,
    ): Promise<Record<string, any> | T> {
        return this.make(
            {
                method: 'PATCH',
                body: body,
                path: path,
            },
            authenticated,
        ).then(x => x.json());
    }

    public put<T extends Record<string, any>>(
        path: string,
        body?: Record<string, any>,
        authenticated = true,
    ): Promise<Record<string, any> | T> {
        return this.make(
            {
                method: 'PUT',
                body: body,
                path: path,
            },
            authenticated,
        ).then(x => x.json());
    }

    async init(data: LoginData): Promise<Record<string, any>> {
        if (data.email && data.password) {
            const loginData = await this.make(
                {
                    path: '/login',
                    method: 'POST',
                    body: {
                        email: data.email,
                        password: data.password,
                    },
                },
                false,
            );
            this.cookieJar = loginData.headers.get('Set-Cookie')!;
            if (!this.cookieJar) throw new Error('Incorrect Email/Pasword');
            const setCookies = this.cookieJar.split(' ');
            this.token = setCookies[0].split('=')[1].split(';')[0];
            return loginData.json();
        }
        throw new Error('You must provide an email/password');
    }

    public destroy(): void {
        this.cookieJar = undefined;
        this.token = undefined;
    }
}

export interface RestManagerOptions {
    apiURL?: string;
}

export interface MakeOptions {
    method: string;
    path: string;
    body?: Record<string, string>;
}

export interface LoginData {
    email: string;
    password: string;
}
