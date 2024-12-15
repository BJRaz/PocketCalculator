const DisplayBuffer = require('../js/displaybuffer');

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

test('display test 4', () => {
    display.insertChar('1');
    display.insertChar('.');
    display.insertChar('0');
    expect(display.getValueAsString()).toBe('1.0');
});

test('display test 5', () => {
    display.insertChar('1');
    display.insertChar('.');
    display.insertChar('.');
    expect(display.getValueAsString()).toBe('1.');
});

test('display test 6', () => {
    display.insertChar('1');
    display.insertChar('.');
    display.insertChar('.');
    display.insertChar('0');
    expect(display.getValueAsString()).toBe('1.0');
});

test('display test 7', () => {
    display.insertString('10');
    expect(display.getValueAsString()).toBe('10');
});

test('display test 8', () => {
    expect(() => display.insertString(null)).toThrow(Error);;
});