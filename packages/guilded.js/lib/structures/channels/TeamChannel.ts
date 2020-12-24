import { APITeamChannel } from "@guildedjs/guilded-api-typings";
import Client from "../Client";
import Channel from "./Channel";
import Team from "../Team";
import Group from "../Group";

export default class TeamChannel extends Channel<APITeamChannel> {
    public teamID!: string;
    public groupID!: string;
    public name!: string;

    constructor(client: Client, data: APITeamChannel, public readonly team: Team | null, public readonly group: Group | null) {
        super(client, data);
    }

    patch(data: APITeamChannel | Partial<APITeamChannel>): this {
        if ("teamId" in data && data.teamId !== undefined) {
            this.teamID = data.teamId
        } else if (this.team) {
            this.teamID = this.team.id;
        }

        if ("groupId" in data && data.groupId !== undefined) {
            this.groupID = data.groupId;
        } else if (this.group) {
            this.groupID = this.group.id;
        }

        if ("name" in data && data.name !== undefined) {
            this.name = data.name;
        }
        return this;
    }
    
    setName(name: string) {
        return this.client.rest.put(`/teams/${this.team?.id ?? this.teamID}/groups/${this.groupID}/channels/${this.id}/info`, { name: name }).then(x => {
            this.name = x.name;
            return this;
        })
    }
}