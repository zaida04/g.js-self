<div align="center">
<h1>Guilded.js</h1>

<p><a href="https://github.com/zaida04/guilded.js/blob/main/LICENSE"><img src="https://img.shields.io/github/license/guildedjs/guilded.js" alt="GitHub"></a>
<a href="https://www.npmjs.com/package/@guildedjs/guilded.js"><img src="https://img.shields.io/npm/v/@guildedjs/guilded.js?color=crimson&amp;logo=npm" alt="npm"></a>
<a href="https://github.com/zaida04/guilded.js/actions/workflows/typescript.yml"><img src="https://github.com/zaida04/guilded.js/actions/workflows/typescript.yml/badge.svg" alt="TypeScript"></a></p>
 
<p><a href="https://guilded.js.org/modules/guilded_js.html"><b>Documentation</b></a></p>

A Node.js library for the [Guilded.gg](https://www.guilded.gg/) API.
</div>

## Table of Contents
* [Example Usage](#usage)
* [About the Project](#about)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Documentation](#documentation)
* [TO:DO](#todo)
* [Contributing](#contributing)
* [License](#LICENSING)

## Usage
```ts
// commonJS:
const { Client } = require("@guildedjs/guilded.js");

/*
 * ES6:
 * import { Client } from "@guildedjs/guilded.js";
 */

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

## About
`@guildedjs/guilded.js` is an OOP library written in TypeScript usable in either TypeScript or JavaScript projects. It provides interaction between the Guilded.gg REST API and WS gateway, with a numerous amount of features.

## Prerequisites
You are expected to have a reasonably supported version of node.js. Guildedjs is tested on node.js >12.0.0 and we make no guarantees that it will work on earlier versions

## Installation
You can install this package from [NPM](https://www.npmjs.com/package/@guildedjs/guilded.js)

- `npm install @guildedjs/guilded.js`
- `yarn add @guildedjs/guilded.js`

## Documentation
Documentation is located [here](https://guilded.js.org)

## Dependencies
- `@discordjs/collection`: Map utility
- `ws`: WebSocket interaction
- `@guildedjs/guilded-api-typings` (DEV DEP ONLY): used for typing the REST and WS payloads
- `uuid` - Generate IDs for structures such as Messages

## TODO
- [x] Structures (Channels, Messages, Users, Teams, etc...)
- [x] Managers separating cache from API methods
- [x] Caching (messages, teams, channels) 
- [x] Send & Receive messages 
- [x] Message parsing utils
- [x] API typings (@guildedjs/guilded-api-typings)
- [x] Ratelimit retry
- [ ] Ratelimit delaying/waiting 
- [X] CI/CD
- [X] Documentation
- [X] WS Event handling structures (does NOT mean all events are covered)
- [X] Permissions & Role structures
- [ ] Full API Coverage 
- [X] Caching Control
- [X] Handles WS reconnections and connection destructions
- [ ] Framework (@guildedjs/itami)
- [ ] Guide

## Contributing
Please see the main [README.md](https://github.com/zaida04/guilded.js) for info on how to contribute to this package or the other `@guildedjs` packages.

## Acknowledgements
- [`Discord.js`](https://discord.js.org/#/) - Inspiration and caching strategy
  
## LICENSE
Licensed under the [MIT License](https://github.com/zaida04/guilded.js/blob/main/LICENSE)  
