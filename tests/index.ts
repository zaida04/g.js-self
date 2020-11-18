import Client, { Message } from "../src";
import { ChatMessageCreated } from "../src/ws/payloads/ChatMessageCreated";
const gg = new Client();
gg.login({ email: "nico.03727@gmail.com", password: "Potatolife101"})

gg.on("ready", async () => {
    console.log("Ready!");
    //const team = await gg.teams.fetch("4R5kk6QE");
});
gg.on("messageCreate", (message: Message) => {
    console.log(message);
})

gg.on("raw", (data: ChatMessageCreated) => {
    // if (data.type === "ChatMessageCreated") {
        // console.log("NODES:");
        // console.log(data.message.content.document.nodes[ 1 ].nodes);
        // console.log("\nDATA:");
        // console.log(data.message.content.document.nodes[ 1 ].data);
    // }
})