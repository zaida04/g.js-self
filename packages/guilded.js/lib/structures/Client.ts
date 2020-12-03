/* eslint-disable @typescript-eslint/no-non-null-assertion */
/*
Adapted from: https://github.com/Chixel/guilded.js/blob/master/src/Guilded.js#L54
Guilded.js - ChixelRT <https://github.com/Chixel>
*/
import { APIClientUser } from '@guildedjs/guilded-api-typings';
import { RestManager } from '@guildedjs/guildedjs-rest';
import { EventEmitter } from 'events';

import ClientGatewayHandler from '../ws/ClientGatewayHandler';
import Channel from './Channel';
import ChannelManager from './managers/ChannelManager';
import TeamManager from './managers/TeamManager';
import UserManager from './managers/UserManager';
import Team from './Team';
import User from './User';

export default class Client extends EventEmitter {
    public rest: RestManager;
    public user: User | null = null;
    public ws: GatewayHandler | null = new GatewayHandler(this);
    public pingTimeout: (() => unknown) | null;

    public teams = new TeamManager(this);
    public channels = new ChannelManager(this);
    public users = new UserManager(this);

    public constructor(public options?: Partial<ClientOptions>) {
        super();
        this.rest = new RestManager({
            apiURL: this.options?.rest?.apiURL,
        });
        this.ws = null;
        this.pingTimeout = null;
    }

    public async login(options: LoginOptions): Promise<undefined> {
        const ClientUser = await this.rest.init(options);
        this.user = new User(this, ClientUser.user as APIClientUser);

        const fetch_me = await this.rest.get('/me');
        this.emit('debug', 'Initial ME data recieved');

        for (const team_data of fetch_me.teams) {
            const team = new Team(this, team_data);
            this.teams.add(team);
        }
        const fetch_dms = await this.rest.get(`/users/${this.user.id}/channels`);
        for (const dm_data of fetch_dms.channels) {
            const dm = new Channel(this, null, dm_data);
            this.channels.add(dm);
        }
        this.emit('debug', 'Initial DM Channel data recieved');

        this.ws = new ClientGatewayHandler(this);
        this.emit('debug', 'Gateway initialized');
        return undefined;
    }
}

// Add all client events here
export type ClientEvent = 'messageCreate' | 'ready' | 'messageDelete' | 'messageUpdate';

export interface ClientOptions {
    ws: {
        heartbeatInterval: number;
    };
    rest: {
        apiURL: string;
    };
}

export interface LoginOptions {
    email: string;
    password: string;
}
