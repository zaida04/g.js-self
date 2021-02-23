<div align="center">
<img src="../../media/readme-header.png" width="546" alt="guildedjs"/>

<p><a href="https://github.com/guildedjs/guildedjs/blob/master/LICENSE"><img src="https://img.shields.io/github/license/guildedjs/guilded.js" alt="GitHub"></a>
<a href="https://www.npmjs.com/package/@guildedjs/guilded.js"><img src="https://img.shields.io/npm/v/@guildedjs/guilded.js?color=crimson&amp;logo=npm" alt="npm"></a>
<a href="https://github.com/guildedjs/guilded.js/actions/workflows/typescript.yml"><img src="https://github.com/guildedjs/guilded.js/actions/workflows/typescript.yml/badge.svg" alt="TypeScript"></a></p>

<p><a href="https://guilded.js.org/modules/guilded_js.html"><b>Documentation</b></a></p>

A Node.js library for the [Guilded.gg](https://www.guilded.gg/) API.
</div>

## Table of Contents
* [Example Usage](#usage)
* [About the Project](#about)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Documentation](#documentation)
* [Contributing](#contributing)
* [License](#LICENSING)

## About
`@guildedjs/guilded.js` is an OOP library written in TypeScript usable in either TypeScript or JavaScript projects. 

## Prerequisites
You are expected to have a reasonably supported version of node.js. Guildedjs is tested on node.js >12.0.0 and we make no guarantees that it will work on earlier versions

## Installation
- `npm install @guildedjs/guilded.js`
- `yarn add @guildedjs/guilded.js`

## Documentation
Documentation is located [here](https://guilded.js.org)

## Dependencies
- `@discordjs/collection`: Map utility
- `ws`: WebSocket interaction
- `@guildedjs/guilded-api-typings` (DEV DEP ONLY): used for typing the REST and WS payloads
- `@guildedjs/guildedjs-rest`: Rest Util
- `uuid` - Generate IDs for structures such as Messages

## Contributing
Please see the main [README.md](https://github.com/guildedjs/guilded.js) for info on how to contribute to this package or the other `@guildedjs` packages.

## Acknowledgements
- [`Discord.js`](https://discord.js.org/#/) - Inspiration and caching strategy

## LICENSE
Licensed under the [MIT License](https://github.com/guildedjs/guildedjs/blob/master/LICENSE)