<div align="center">
<h1>Guilded.js</h1>
<p><b>A Node.js library for the <a href="https://www.guilded.gg/">Guilded.gg</a> API.</b></p>
<p>
    <a href="https://discord.gg/jf66UUN"><img src="https://img.shields.io/discord/732714723744940032.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2 "></a>
    <img src="https://github.com/zaida04/guilded.js-selfbot/actions/workflows/ci.yml/badge.svg" alt="CI">
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a><br>
</p>
</div>

```ts
const { Client } = require("@guildedjs/guilded.js");
// import { Client } from "@guildedjs/guilded.js";

const client = new Client();

client.on("ready", () => console.log(`Bot is successfully logged in`));

client.on("messageCreate", (message) => {
    if (message.content === "poggers") {
        return message.channel.send("poggers indeed");
    }
});

client.login({
    email: "email",
    password: "password",
});
```

## 📝 About

`@guildedjs/guilded.js` is a library written in TypeScript usable in either TypeScript or JavaScript projects. It provides structures, abstraction, and utilities for interaction between the guilded API and your userbot.

Off the bat there are very noticable similarities between this package and [`discord.js`](https://discord.js.org) structure-wise. This is intentional in order to make the migration or copying of your codebase to a Guilded bot smooth and predictable. We've adopted the same managers/cache structure that they've implemented because we find that it's what works well without complications. While our structure is **influenced** by them, there are underlying differences with how we handle things like websockets, events, and utilities. In addition to that, the library is split up into multiple packages (this being the main one) and written in TypeScript over JavaScript.

## 📥 Installation

<a href="https://npmjs.org/package/@guildedjs/guilded.js"><img src="https://nodei.co/npm/@guildedjs/guilded.js.png" alt="NPM"></a>

**Recommended that you use node v12+**

-   `npm install @guildedjs/guilded.js`
-   `yarn add @guildedjs/guilded.js`

## 📃 Documentation

Documentation is located [here](https://zaida04.github.io/guildedjs-selfbot-docs)

## 📦 Dependencies

-   [`@guildedjs/guilded-api-typings`](https://github.com/zaida04/guilded.js-selfbot/tree/main/packages/guilded-api-typings) (dev dep): used for typing the REST and WS payloads
-   [`@guildedjs/common`](https://github.com/zaida04/guilded.js-selfbot/tree/main/packages/common): Utilities between `@guildedjs` packages
-   [`@guildedjs/rest`](https://github.com/zaida04/guilded.js-selfbot/tree/main/packages/rest): Rest structure for `@guildedjs` packages
-   [`@guildedjs/embeds`](https://github.com/zaida04/guilded.js-selfbot/tree/main/packages/embeds): Embed builder/utility
-   [`@guildedjs/webhook-client`](https://github.com/zaida04/guilded.js-selfbot/tree/main/packages/webhook-client): Webhook Client
-   `@discordjs/collection`: Map utility
-   `ws`: WebSocket interaction

## ✋ Contributing

Please see the main [README.md](https://github.com/zaida04/guilded.js-selfbot) for info on how to contribute to this package or the other `@guildedjs` packages.

## 🤝 Acknowledgements

-   [`Discord.js`](https://discord.js.org/#/) - Inspiration and caching strategy

## ⚖️ LICENSING

Licensed under the [MIT License](https://github.com/zaida04/guilded.js-selfbot/blob/main/LICENSE)
