# This project is currently in a Work In Progress stage and is not ready for usage yet.

<div align="center">
    <img src="static/readme-header.png" width="546" alt="guildedjs"/>
    <p><b>A Node.js wrapper for the <a href="https://www.guilded.gg/">Guilded.gg</a> API. <br>Written in TS</b></p><br>
    <p><a href="https://discord.gg/jf66UUN"><b>Join our Discord Server!</b></a></p>
    <br />
    <p>
        <img src="https://github.com/guildedjs/guildedjs/workflows/Linting/badge.svg" alt="Linting">
        <img src="https://github.com/guildedjs/guildedjs/workflows/TypeScript/badge.svg" alt="TypeScript">
        <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
        <a href="https://github.com/guildedjs/guildedjs/issues"><img src="https://img.shields.io/github/issues-raw/guildedjs/guildedjs.svg?maxAge=25000" alt="Issues"></a>
        <a href="https://github.com/guildedjs/guildedjs/pulls"><img src="https://img.shields.io/github/issues-pr/guildedjs/guildedjs.svg?style=flat" alt="GitHub pull requests"></a><br>
        <a href="https://npmjs.org/package/@guildedjs/guildedjs"><img src="https://nodei.co/npm/@guildedjs/guildedjs.png" alt="NPM"></a>
    </p>
</div>

## Table of Contents
* [Example Usage](#usage)
* [About the Project](#about)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Documentation](#documentation)
* [Contributing](#contributing)
* [TODO](#todo)
* [License](#LICENSING)
* [Acknowledgements](#acknowledgements)


## Usage

```ts
import Client from "guildedjs";
// Or const { Client } = require("guildedjs");
const client = new Client();

client.on('ready', () => {
  console.log(`Bot is successfully logged in`);
});

client.on("messageCreate", message => {
    if(message.content === "pogger") {
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

`guildedjs` is an API wrapper for Guilded.gg, a discord alternative. This was created due to the lack of an api wrapper written in TS for the guilded api. 

### Built With
* `node-fetch` - make HTTP requests
* `ws` - make WS connections

<!--EMD OF ABOUT THE PROJECT>

<!--GETTING STARTED-->

## Getting Started

### Prerequisites
You are expected to have an updated version of node.js. Guildedjs is tested on node.js >12.0.0 and we make no guarantees that it will work on earlier versions

### Installation
1. Install through NPM `(recommended)`
- `npm install @guildedjs/guildedjs`  

2. Clone the repo and build
- `git clone https://github.com/guildedjs/guildedjs`
- `cd guildedjs`
- `npm i`  
- `npm run bootstrap`  
- `npm run build`  

Then proceed to move the related dirs to your `node_modules`


### Documentation
`Documentation will be coming once the project is at a usable state.`

<!--END GETTING STARTED-->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Please ensure your commits pass the tests, lints, and builds. This means you should test it locally before pushing.**

**We make use of [lerna](https://lerna.js.org/) to manage our monorepo. The main commands used are below**
* `lerna add <module> [--scope=package-name]` - add npm module dependency to all/specific package(s)
* `lerna create <package>` - create a new package
* `npm run bootstrap` = `lerna bootstrap` - recursively install dependencies in all packages and symlink local packages
* `lerna run <npm-script>` - recursively execute command in all packages (must exist in each packages package.json)

## TODO
* Finish Typings for the Guilded API/WS 🚧
* Rest Util ✅
* Main Package:
  * Structures 🚧
  * GET Request Coverage ❌
  * POST Request Coverage ❌
  * PATCH Request Coverage ❌
  * DELETE Request Coverage ❌
  * Caching System
    * Built-In Caching System ✅
    * Allow custom caches ❌
  

## LICENSING  
  
> **guildedjs** © [zaida04](https://github.com/zaida04), [aesthetical](https://github.com/Sxmurai), Released under the [MIT](https://github.com/guildedjs/guildedjs/blob/master/LICENSE) License.  

## Acknowledgements
This project was inspired by [Chixel's guilded api wrapper](https://github.com/Chixel/guilded.js). Through their project, I was able to deduce how the WS gateway works, and how to structure my project. A big thank you to them, without them this project wouldn't exist.
