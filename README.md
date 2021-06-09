> ### ⚠️ This project is in the works, but is usable. Be weary of bugs. This library only works with selfbots for now. Selfbots are a gray zone in Guilded, so use this library at your own risk.

<div align="center">
    <img src="static/readme-header.png" width="546" alt="guildedjs"/>
    <p><b>Tools for interacting with the <a href="https://www.guilded.gg/">Guilded.gg</a> API. <br>Written in TS</b></p>  
    <p><a href="https://discord.gg/jf66UUN"><b>Join our Discord Server!</b></a> > <a href="https://guilded.js.org"><b>Documentation</b></a></p>
    <br />
    <p>
        <img src="https://github.com/zaida04/guilded.js/workflows/Linting/badge.svg" alt="Linting">
        <img src="https://github.com/zaida04/guilded.js/workflows/TypeScript/badge.svg" alt="TypeScript">
        <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
        <a href="https://github.com/zaida04/guilded.js/issues"><img src="https://img.shields.io/github/issues-raw/zaida04/guilded.js.svg?maxAge=25000" alt="Issues"></a>
        <a href="https://github.com/zaida04/guilded.js/pulls"><img src="https://img.shields.io/github/issues-pr/zaida04/guilded.js.svg?style=flat" alt="GitHub pull requests"></a><br>
        <a href="https://npmjs.org/package/@guildedjs/guilded.js"><img src="https://nodei.co/npm/@guildedjs/guilded.js.png" alt="NPM"></a>
    </p>
</div>

## Table of Contents
* [Example Usage](#usage)
* [About the Project](#about)
* [Packages](#packages)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Documentation](#documentation)
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
<!--ABOUT THE PROJECT-->

## About
This repo serves as a monorepo that houses several packages, mainly the `@guildedjs/guilded.js` package, which is a library for the Guilded API. Inspired heavily by [discord.js](https://github.com/discordjs/discord.js)

<!--EMD OF ABOUT THE PROJECT>

<!--GETTING STARTED-->

## Packages
* [`@guildedjs/guilded.js`](https://github.com/zaida04/guilded.js/tree/master/packages/guilded.js#readme) - main package that provides a lib for the guilded.gg api. Comes with built in caching, structures, etc.
* [`@guildedjs/itami`](https://github.com/zaida04/guilded.js/tree/master/packages/itami#readme) - official framework for `@guildedjs/guilded.js`, comes with highly customizable commands, listeners, and other abstractions.
* [`@guildedjs/guilded-api-types`](https://github.com/zaida04/guilded.js/tree/master/packages/guilded-api-typings#readme) - thinking of making your own guilded lib/wrapper? This package consists of typings for the guilded.gg api compiled together by the community. No need to write your own typings and reinventing the wheel.

## Getting Started

### Examples
You can find example projects [here](https://github.com/zaida04/guilded.js/tree/master/examples)

### Prerequisites
You are expected to have a reasonably supported version of node.js. Guildedjs is tested on node.js >12.0.0 and we make no guarantees that it will work on earlier versions

### Installation
- `npm install @guildedjs/guilded.js`  
- `yarn add @guildedjs/guilded.js`

### Documentation
Documentation is viewable here: https://guilded.js.org

<!--END GETTING STARTED-->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
As you start to contribute your beginner workflow should look similar to this:   
`fork repo & clone repo` ->  `npm install` -> `npm run bootstrap` -> `create new branch` -> `your code changes` -> `npm run build` -> `npm run lint` -> `commit, push, PR`

**Please ensure your commits pass the test, lint, and build scripts.**

**We make use of [lerna](https://lerna.js.org/) to manage our monorepo. The main commands used are below**
* `lerna add <module> [--scope=package-name]` - add npm module dependency to all/specific package(s)
* `lerna create <package>` - create a new package
* `npm run bootstrap` = `lerna bootstrap` - recursively install dependencies in all packages and symlink local packages
* `lerna run <npm-script>` - recursively execute command in all packages (must exist in each packages package.json)

## Acknowledgements
[Discord.js](https://github.com/discordjs/discord.js) - Main inspiration & lots of derived work.

## LICENSING  
> **Guilded.JS** © [zaida04](https://github.com/zaida04), Released under the [MIT](https://github.com/zaida04/guilded.js/blob/master/LICENSE) License. All subpackages are also released under the MIT License
