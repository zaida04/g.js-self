import { APIGroup } from "@guildedjs/guilded-api-typings";
import Base from "./Base";
import Client from "./Client";
import TeamGroupChannelManager from "./managers/TeamGroupChannelManager";
import TeamGroupManager from "./managers/TeamGroupManager";
import Team from "./Team";

/**
 * A group residing within a Team that contains channels
 */
export default class Group extends Base<APIGroup> {
    /**
     * The channels that belong to this group
     */
    public channels: TeamGroupChannelManager;

    public constructor(client: Client, data: APIGroup, public team: Team | null) {
        super(client, data, false);
        this.channels = new TeamGroupChannelManager(this.client, this);

        this.patch(data);
    }

    /**
     * Update the data in this structure
     * @internal
     */
    public patch(data: APIGroup | Partial<APIGroup>) {
        return this;
    }
}