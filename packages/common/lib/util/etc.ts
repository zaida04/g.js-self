export { v4 as generateUUID } from 'uuid';
export const extractFromCookieJar = (decodedCookieJar: string[], i: number) =>
    decodedCookieJar[i].split('=')[1].split(';')[0];
export const sleep = (ms: number): Promise<unknown> => new Promise(r => setTimeout(r, ms));
