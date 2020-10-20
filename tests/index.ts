import Client from "../src/structures/Client";
const gg = new Client();
gg.login({ email: "Nico.03727@gmail.com", password: "Hhz@450450"})
gg.emitter.on("disconnected", () => {
    console.log("bro im ded");
});

gg.emitter.on("ready", () => {
    console.log("i awaken");
});
