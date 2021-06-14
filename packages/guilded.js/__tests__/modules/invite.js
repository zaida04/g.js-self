module.exports = async (client, passed, failed, testText, errorText) => {
    let invite;
    try {
        console.log('...creating Invite');
        invite = await client.teams.createInvite(process.env.TEAM_ID);
        testText(`Successfully created invite! id: ${invite.id}`);
    } catch (e) {
        errorText(`Creating invite failed! ${e}`);
        console.log(e);
        throw e;
    }

    try {
        console.log('...deleting Invite');
        const responseID = await client.teams.deleteInvite(process.env.TEAM_ID, invite.id);
        testText(`Successfully deleted invite! response-id ${responseID}`);
    } catch (e) {
        errorText(`Deleting invite failed! ${e}`);
        console.log(e);
        throw e;
    }
};
