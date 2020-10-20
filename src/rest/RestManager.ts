import { MakeOptions } from '../typings/MakeOptions';
import { RestManagerOptions } from '../typings/RestManagerOptions';

import fetch, { Response } from 'node-fetch';
import { LoginData } from '../typings/LoginData';
import GuildedJSError from '../structures/GuildedJSError';
import { LoginResponse } from '../typings/gateway-responses/LoginResponse';

export default class RestManager {
    public apiURL: string;
    public baseDomain = 'api.guilded.gg';
    public _token: string | undefined;

    constructor(config?: RestManagerOptions) {
        this.apiURL = config?.apiURL ?? `https://${this.baseDomain}`;
    }
    /*
                Response["headers"]["set-cookie"].forEach(function (element) {
                    self.cookies += element.split(" ")[0];
                });
    */
    make(data: MakeOptions, authenticated = true): Promise<Response> {
        let headers = {};
        if (authenticated) {
            headers = {
                hmac_signed_session: this.token,
            };
        }
        return fetch(this.apiURL + data.path, {
            method: data.method,
            body: data.body ? JSON.stringify(data.body) : undefined,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });
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
            return loginData.json();
        }
        throw new Error('You must provide an email/password');
    }

    get token(): string | undefined {
        return this._token;
    }
}
