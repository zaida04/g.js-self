export const extractFromCookieJar = (decodedCookieJar: string[], i: number) =>
    decodedCookieJar[i].split('=')[1].split(';')[0];
