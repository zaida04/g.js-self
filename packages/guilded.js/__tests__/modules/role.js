module.exports = async (client, passed, failed, testText, errorText) => {
    try {
        console.log('...adding role');
        await client.teams.addRoleToMember(process.env.TEAM_ID, process.env.GUINEAPIG_ID, process.env.ROLE_ID);
        testText('Role successfully added.');
    } catch (e) {
        errorText(`Role adding failed! ${e}`);
        throw e;
    }

    try {
        console.log('...removing role');
        await client.teams.removeRoleFromMember(process.env.TEAM_ID, process.env.GUINEAPIG_ID, process.env.ROLE_ID);
        testText('Role successfully removed.');
    } catch (e) {
        errorText(`Role removal failed! ${e}`);
        throw e;
    }
};
