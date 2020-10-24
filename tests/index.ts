import Client from "../src";
const gg = new Client();
gg.login({ email: "nico.03727@gmail.com", password: "Potatolife101"})

gg.emitter.on("ready", async () => {
    console.log("Ready!");
    const team = await gg.teams.fetch("4R5kk6QE");
    console.log(team.channels.cache.size);
});
