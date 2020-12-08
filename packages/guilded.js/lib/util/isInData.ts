export function isInData(key: string, data: any): boolean {
    return key in data && data[key] !== undefined;
}
