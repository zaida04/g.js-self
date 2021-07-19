<div align="center">
<h1>Guilded.js</h1>
<p><b>A Node.js library for the <a href="https://www.guilded.gg/">Guilded.gg</a> API.</b></p>
<p>
    <a href="https://discord.gg/jf66UUN"><img src="https://img.shields.io/discord/732714723744940032.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2 "></a>
    <img src="https://github.com/zaida04/guilded.js/workflows/Linting/badge.svg" alt="Linting">
    <img src="https://github.com/zaida04/guilded.js/workflows/TypeScript/badge.svg" alt="TypeScript">
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a><br>
    <a href="https://github.com/zaida04/guilded.js/issues"><img src="https://img.shields.io/github/issues-raw/zaida04/guilded.js.svg?maxAge=25000" alt="Issues"></a>
    <a href="https://github.com/zaida04/guilded.js/pulls"><img src="https://img.shields.io/github/issues-pr/zaida04/guilded.js.svg?style=flat" alt="GitHub pull requests"></a><br>
</p>
</div>

```ts
const { Client } = require("@guildedjs/guilded.js");
// import { Client } from "@guildedjs/guilded.js";

const client = new Client();

client.on('ready', () => console.log(`Bot is successfully logged in`));

client.on("messageCreate", message => {
    if(message.content === "poggers") {
        return message.channel.send("poggers indeed");
    }
})

client.login({
    email: "email",
    password: "password"
});
```

## Table of Contents
* [About the Project](#about)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Documentation](#documentation)
* [TO:DO](#todo)
* [Contributing](#contributing)
* [License](#LICENSING)

## 📝 About
`@guildedjs/guilded.js` is a library written in TypeScript usable in either TypeScript or JavaScript projects. It provides structures, abstraction, and utilities for interaction between the guilded API and your userbot.

## 📥 Installation

<a href="https://npmjs.org/package/@guildedjs/guilded.js"><img src="https://nodei.co/npm/@guildedjs/guilded.js.png" alt="NPM"></a>

**Recommended that you use node v12+**
- `npm install @guildedjs/guilded.js`  
- `yarn add @guildedjs/guilded.js`

## 📃 Documentation
Documentation is located [here](https://guilded.js.org)

## 📦 Dependencies
- [`@guildedjs/guilded-api-typings`](https://github.com/zaida04/guilded.js/tree/main/packages/guilded-api-typings) (dev dep): used for typing the REST and WS payloads
- [`@guildedjs/common`](https://github.com/zaida04/guilded.js/tree/main/packages/common): Utilities between `@guildedjs` packages
- [`@guildedjs/rest`](https://github.com/zaida04/guilded.js/tree/main/packages/rest): Rest structure for `@guildedjs` packages
- [`@guildedjs/embeds`](https://github.com/zaida04/guilded.js/tree/main/packages/embeds): Embed builder/utility
- [`@guildedjs/webhook-client`](https://github.com/zaida04/guilded.js/tree/main/packages/webhook-client): Webhook Client
- `@discordjs/collection`: Map utility
- `ws`: WebSocket interaction
- `uuid` - Generate IDs for structures such as Messages

## ✋ Contributing
Please see the main [README.md](https://github.com/zaida04/guilded.js) for info on how to contribute to this package or the other `@guildedjs` packages.

## 🤝 Acknowledgements
- [`Discord.js`](https://discord.js.org/#/) - Inspiration and caching strategy
  
## ⚖️ LICENSING
Licensed under the [MIT License](https://github.com/zaida04/guilded.js/blob/main/LICENSE)  
