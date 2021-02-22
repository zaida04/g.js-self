import * as MessageUtil from "./MessageUtil"

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export default {
    sleep,
    MessageUtil
}