const DisplayBuffer = require('../displaybuffer');

let display = null;   // reference to displayBuffer

beforeEach(() => {
    display = new DisplayBuffer();
});

afterEach(() => {
    display.clear();
});

test('display test 1', () => {
    display.insertChar(null);
    expect(display.getValueAsString()).toBe('0');
});

test('display test 2', () => {
    expect(() => display.insertChar('h')).toThrow(Error);
});

test('display test 3', () => {
    display.insertChar('.');
    display.insertChar('1');
    expect(display.getValueAsString()).toBe('.1');
});