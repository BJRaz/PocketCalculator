const CalculatorContext = require('../calculatorcontext');
const DisplayBuffer = require('../displaybuffer');

let ctx = null;   // calculator context
let display = null;   // reference to displayBuffer

beforeEach(() => {
    display = new DisplayBuffer();
    ctx = new CalculatorContext(display);
})

test('do calculate', () => {
    // c.addStateChangeListener((sender, msg) => {
	// 	console.log(msg);
	// 	//console.log(sender.context);
	// });
    ctx.initialize();
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('9');
    ctx.buttonClicked('=');
    
    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsFloat()).toBe('81');
});

test('calculation 2', () => {
   
    ctx.initialize();
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('=');
    
    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsFloat()).toBe('81');
});

test('calculation 3', () => {
   
    ctx.initialize();
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('=');
    ctx.buttonClicked('*');
    ctx.buttonClicked('2');
    ctx.buttonClicked('=');
    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsFloat()).toBe('162');
});

test('calculation 4', () => {
    
    ctx.initialize();
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('=');
    ctx.buttonClicked('=');
    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsFloat()).toBe('729');
});

test('calculation 5', () => {
    
    ctx.initialize();
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('=');
    ctx.buttonClicked('+');
    ctx.buttonClicked('4');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsFloat()).toBe('85');
});

test('calculation 6', () => {
    
    ctx.initialize();
    ctx.buttonClicked('0');
    ctx.buttonClicked('*');
    ctx.buttonClicked('=');
    ctx.buttonClicked('+');
    ctx.buttonClicked('0');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsFloat()).toBe('0');
});

test('calculation 7', () => {
    
    ctx.initialize();
    ctx.buttonClicked('0');
    ctx.buttonClicked('+');
    ctx.buttonClicked('0');
    ctx.buttonClicked('=');
    
    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsFloat()).toBe('0');
});

test('calculation 8', () => {
   
    ctx.initialize();
    ctx.buttonClicked('0');
    ctx.buttonClicked('+');
    ctx.buttonClicked('3');
    ctx.buttonClicked('=');
    
    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsFloat()).toBe('3');
});

test('calculation 9', () => {
   
    ctx.initialize();
    ctx.buttonClicked('0');
    ctx.buttonClicked('+');
    ctx.buttonClicked('3');
    ctx.buttonClicked('=');
    ctx.buttonClicked('0');
    ctx.buttonClicked('+');
    ctx.buttonClicked('3');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsFloat()).toBe('3');
});


test('calculation 10', () => {
   
    ctx.initialize();
    ctx.buttonClicked('0');
    ctx.buttonClicked('+');
    ctx.buttonClicked('3');
    ctx.buttonClicked('=');
    ctx.buttonClicked('3');
    ctx.buttonClicked('+');
    ctx.buttonClicked('0');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsFloat()).toBe('3');
});

test('calculation 10', () => {
   
    ctx.initialize();
    ctx.buttonClicked('0');
    ctx.buttonClicked('+');
    ctx.buttonClicked('3');
    ctx.buttonClicked('=');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsFloat()).toBe('6');
});

test('calculation 11', () => {
    ctx.initialize();
    ctx.buttonClicked('3');
    ctx.buttonClicked('+');
    ctx.buttonClicked('0');
    ctx.buttonClicked('=');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsFloat()).toBe('3');
});

test('calculation 12', () => {
    ctx.initialize();
    ctx.buttonClicked('3');
    ctx.buttonClicked('+');
    ctx.buttonClicked('ca');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsFloat()).toBe('0');
});

test('calculation 13', () => {
    ctx.initialize();
    ctx.buttonClicked('3');
    ctx.buttonClicked('ca');
    ctx.buttonClicked('+');
    ctx.buttonClicked('1');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsFloat()).toBe('1');
});