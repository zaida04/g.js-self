import Client from "../src/structures/Client";
const gg = new Client();
gg.login({ email: "email", password: "password"})
gg.emitter.on("disconnected", () => {
    console.log("bro im ded");
});

gg.emitter.on("ready", () => {
    console.log("i awaken");
});
