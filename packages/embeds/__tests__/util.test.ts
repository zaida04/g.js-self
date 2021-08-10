import { resolveColor } from '..';

test('parse Hexadecimal string', () => {
    expect(resolveColor('#f5c400')).toStrictEqual(0xf5c400);
});
test('parse Color string', () => {
    expect(resolveColor('GUILDED')).toStrictEqual(0xf5c400);
});
test('parse RGB value', () => {
    expect(resolveColor([245, 196, 0])).toStrictEqual(0xf5c400);
});
test('test RANDOM value', () => {
    expect(typeof resolveColor('RANDOM')).toEqual('number');
});
test('Get error on out of range number', () => {
    expect(() => resolveColor(0xfffffff)).toThrow(new RangeError('COLOR_RANGE'));
});
test('Get error on bad string input', () => {
    expect(() => resolveColor('SIUDFHUISDHFIUHSDUDIFHIUSDHFUISDI')).toThrow(new TypeError('COLOR_CONVERT'));
});
