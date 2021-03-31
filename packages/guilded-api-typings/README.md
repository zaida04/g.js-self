# `@guildedjs/guilded-api-typings`  

[![GitHub](https://img.shields.io/github/license/guildedjs/guilded.js)](https://github.com/guildedjs/guilded.js/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/@guildedjs/guilded-api-typings?color=crimson&logo=npm)](https://www.npmjs.com/package/@guildedjs/guilded-api-typings)
[![TypeScript](https://github.com/guildedjs/guilded.js/actions/workflows/typescript.yml/badge.svg)](https://github.com/guildedjs/guilded.js/actions/workflows/typescript.yml)

TypeScript Typings for the Guilded.gg API.

> ⚠️ If you intend to use `@guildedjs/guilded.js` you won't need to install this, as it's already a dependency of that package.

## Installation
You can install this package from [NPM](https://www.npmjs.com/package/@guildedjs/guilded-api-typings)

- `npm install @guildedjs/guilded-api-typings`  
- `yarn add @guildedjs/guilded-api-typings`

## Structure
- `lib/rest` - Response from REST reqs to the API. Typings here are prefixed with `API`, then the `HTTP METHOD` that the request uses, then the request title. So for example `APIGetAPIChannels`, `APIGetChannelMessage`. If the request contains a body or query, the typings will have either `Result`, `Body`, or `Query` appended to the end of the typing name. E.x. `APIPostChannelMessagesBody`, `APIPostChannelMessagesResult`. `Body` is the body of the request you send, while `Result` is the response you get back from the API, and `Query` is the URL queries that you will put into the URL.  
- `lib/ws` - Payloads from the WS Gateway. Typings here are prefixed with `WS`.  
- `lib/common` - Common structures that may be sent by either WS or REST. Typings here are prefixed with `API`.  

## Contributing
Please see the main [README.md](https://github.com/guildedjs/guilded.js) for info on how to contribute to this package or the other `@guildedjs` packages.

## Credits
Huge thank you to [Shay](https://github.com/shayypy) and the rest of the [Unofficial GuildedAPI Team](https://github.com/GuildedAPI). The third rewrite of these API typings were based entirely on https://guildedapi.com/, which they built.

Thank you to [Vlad](https://github.com/vladfrangu) and the rest of the contributors at https://github.com/discordjs/discord-api-types for the structure in which I based my typings on.
  
## LICENSE
Licensed under the [MIT License](https://github.com/guildedjs/guildedjs/blob/master/LICENSE)
  