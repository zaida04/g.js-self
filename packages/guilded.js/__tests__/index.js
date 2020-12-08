const { config } = require('dotenv');
const { join } = require('path');
const Guilded = require('..');

config({
    path: join(`${__dirname}/../../../testing.env`),
});
const client = new Guilded.Client();

client.on('ready', () => {
    console.log(`ready!`);
    console.log(client.teams);
})
client.on('raw', str => {
    console.log(`raw: ${JSON.stringify(str)}`);
});


if (!process.env.EMAIL) throw new Error('Must supply email for testing');
if (!process.env.PASSWORD) throw new Error('Must supply password for testing');

client.login({
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
});
