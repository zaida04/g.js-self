export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
export * from "./MessageUtil";
export * from "./GenerateID";
export * from "./Consts";
export * from "./CacheCollection";