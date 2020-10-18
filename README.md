# This project is currently in a Work In Progress stage and is not ready for usage yet.

<div align="center">
    <img src="readme-header.png" width="546" alt="guildedjs"/>
    <p><b>A Node.js wrapper for the <a href="https://www.guilded.gg/">Guilded.gg</a> API. <br>Written in TS</b></p>
    <br />
    <p>
        <img src="https://github.com/zaida04/guildedjs/workflows/Linting/badge.svg" alt="Linting">
        <img src="https://github.com/zaida04/guildedjs/workflows/TypeScript/badge.svg" alt="TypeScript">
        <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
        <a href="https://github.com/zaida04/guildedjs/issues"><img src="https://img.shields.io/github/issues-raw/zaida04/guildedjs.svg?maxAge=25000" alt="Issues"></a>
        <a href="https://github.com/zaida04/guildedjs/pulls"><img src="https://img.shields.io/github/issues-pr/zaida04/guildedjs.svg?style=flat" alt="GitHub pull requests"></a><br>
        <a href="https://npmjs.org/package/@zaida04/guildedjs"><img src="https://nodei.co/npm/@zaida04/guildedjs.png" alt="NPM"></a>
    </p>
</div>

## About

`guildedjs` is an API wrapper for Guilded.gg, a discord alternative. This was created due to the lack of an api wrapper written in TS for the guilded api. This library is heavily influenced by [discord.js](https://github.com/discordjs/discord.js). Thank you to the amazing team over there.

## Installation

> `guildedjs` is tested on nodejs >12.0.0  
- `npm install @zaida04/guildedjs`  

## Example usage

```ts
import { Client } from "guildedjs";
// Or const { Client } = require("guildedjs");
const GuildedClient = Client();

GuildedClient.on('ready', () => {
  console.log(`Bot is successfully logged in`);
});

GuildedClient.on("messageCreate", message => {
    if(message.content === "pogger") {
        return message.channel.send("poggers indeed");
    }
})

GuildedClient.login('token');
```

## Contributing

We welcome contributions from people of all skill levels. Please refer to our [contributing guide](https://github.com/zaida04/guildedjs/blob/master/.github/CONTRIBUTING.md) for more info.

## LICENSING  

Created ~10/18/2020  
**guildedjs** © [zaida04](https://github.com/zaida04), Released under the [MIT](https://github.com/zaida04/guildedjs/blob/master/LICENSE) License.  
Authored by zaida04.

> GitHub [@zaida04](https://github.com/zaida04) 