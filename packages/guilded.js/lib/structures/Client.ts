/*
Adapted from: https://github.com/Chixel/guilded.js/blob/master/src/Guilded.js#L54
Guilded.js - ChixelRT <https://github.com/Chixel>
*/
import { APIClientUser } from '@guildedjs/guilded-api-typings';
import { RestManager } from '@guildedjs/guildedjs-rest';
import { EventEmitter } from 'events';

import ClientGatewayHandler from '../ws/ClientGatewayHandler';

export default class Client extends EventEmitter {
    public rest: RestManager;
    // Public user: User | null = null;
    public gateway: ClientGatewayHandler | null;
    public pingTimeout: (() => unknown) | null;

    // Public teams = new TeamManager(this);
    // public channels = new ChannelManager(this);
    // public users = new UserManager(this);

    public constructor(public options?: Partial<ClientOptions>) {
        super();
        this.rest = new RestManager({
            apiURL: this.options?.rest?.apiURL,
        });
        this.gateway = null;
        this.pingTimeout = null;
    }

    public async login(options: LoginOptions): Promise<undefined> {
        const ClientUser = await this.rest.init(options);
        // This.user = new User(this, ClientUser.user as APIClientUser);

        /*
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
        */

        this.gateway = new ClientGatewayHandler(this);
        this.emit('debug', 'Gateway initialized');
        return undefined;
    }
    public destroy(): void {
        this.rest.destroy();
        this.gateway?.destroy();
        this.emit('debug', 'Client destroyed!');
        this.emit('disconnected');
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
