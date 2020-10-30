import fetch, { Response } from 'node-fetch';

import GuildedJSError from '../guildedjs/structures/GuildedJSError';
import GuildedAPIError from './GuildedAPIError';
import { LoginResponse } from './typings/api/LoginResponse';
import { LoginData } from './typings/LoginData';
import { MakeOptions } from './typings/MakeOptions';
import { RestManagerOptions } from './typings/RestManagerOptions';

export default class RestManager {
    public apiURL: string;
    public baseDomain = 'api.guilded.gg';
    public _token: string | undefined;
    public cookieJar: string | undefined;

    constructor(config?: RestManagerOptions) {
        this.apiURL = config?.apiURL ?? `https://${this.baseDomain}`;
    }
    /*
                Response["headers"]["set-cookie"].forEach(function (element) {
                    self.cookies += element.split(" ")[0];
                });
    */
    async make(data: MakeOptions, authenticated = true): Promise<Response> {
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

    get(path: string, authenticated = true): Promise<Record<string, any>> {
        return this.make(
            {
                method: 'GET',
                path: path,
            },
            authenticated,
        ).then(x => x.json());
    }

    post(path: string, body: Record<string, any>, authenticated = true): Promise<Record<string, any>> {
        return this.make(
            {
                method: 'POST',
                body: body,
                path: path,
            },
            authenticated,
        ).then(x => x.json());
    }

    delete(path: string, body?: Record<string, any>, authenticated = true): Promise<Record<string, any>> {
        return this.make(
            {
                method: 'DELETE',
                body: body,
                path: path,
            },
            authenticated,
        ).then(x => x.json());
    }

    patch(path: string, body: Record<string, any>, authenticated = true): Promise<Record<string, any>> {
        return this.make(
            {
                method: 'PATCH',
                body: body,
                path: path,
            },
            authenticated,
        ).then(x => x.json());
    }

    put(path: string, body?: Record<string, any>, authenticated = true): Promise<Record<string, any>> {
        return this.make(
            {
                method: 'PUT',
                body: body,
                path: path,
            },
            authenticated,
        ).then(x => x.json());
    }

    async init(data: LoginData): Promise<LoginResponse> {
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
            const setCookies = loginData.headers.get('Set-Cookie')?.split(' ');
            if (!setCookies) throw new GuildedJSError('Incorrect Email/Pasword');
            this._token = setCookies[0].split('=')[1];
            this.cookieJar = loginData.headers.has('Set-Cookie') ? loginData.headers.get('Set-Cookie')! : undefined;
            return loginData.json();
        }
        throw new Error('You must provide an email/password');
    }

    get token(): string | undefined {
        return this._token;
    }
}
