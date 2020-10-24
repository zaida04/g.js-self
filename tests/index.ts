import Client from "../src";
const gg = new Client();
gg.login({ email: "", password: ""})

gg.emitter.on("ready", async () => {
    console.log("Ready!");
    const team = await gg.teams.fetch("4R5kk6QE");
    console.log(team.channels.cache.size);
});
