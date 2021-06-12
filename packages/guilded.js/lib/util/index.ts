export const sleep = (ms: number): Promise<unknown> => new Promise(r => setTimeout(r, ms));
export const extractFromCookieJar = (decodedCookieJar: string[], i: number) =>
    decodedCookieJar[i].split('=')[1].split(';')[0];
export * from './MessageUtil';
export * from './GenerateID';
export * from './Consts';
export * from './CacheCollection';
