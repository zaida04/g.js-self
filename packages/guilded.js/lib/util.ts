import type { Client, PartialChannel, Team, User } from './structures';

export function retrieveTeamFromStructureCache({
    client,
    _team,
    teamID,
}: {
    client: Client;
    _team: Team | null;
    teamID: string | null;
}): Team | null {
    if (_team) return _team;
    if (!teamID) return null;
    const cachedTeam = client.teams.cache.get(teamID);
    return cachedTeam ?? null;
}

export function retrieveChannelFromStructureCache({
    client,
    _channel,
    channelID,
}: {
    client: Client;
    _channel: PartialChannel | null;
    channelID: string | null;
}): PartialChannel | null {
    if (_channel) return _channel;
    if (!channelID) return null;
    const cachedChannel = client.channels.cache.get(channelID);
    return cachedChannel ?? null;
}

export function retrieveCreatorFromStructureCache({
    client,
    _createdBy,
    createdByID,
}: {
    client: Client;
    _createdBy: User | null;
    createdByID: string | null;
}): User | null {
    if (_createdBy) return _createdBy;
    if (!createdByID) return null;
    const cachedUser = client.users.cache.get(createdByID);
    return cachedUser ?? null;
}
