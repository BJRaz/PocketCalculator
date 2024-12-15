const CalculatorContext = require('../calculatorcontext');
const DisplayBuffer = require('../displaybuffer');

let ctx = null;   // calculator context
let display = null;   // reference to displayBuffer

beforeEach(() => {
    display = new DisplayBuffer();
    ctx = new CalculatorContext(display);
})

test('do calculate', () => {
    // ctx.addStateChangeListener((sender, msg) => {
	// 	console.log(msg);
	// });
    ctx.initialize();
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('9');
    ctx.buttonClicked('=');
    
    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('81');
});
test('do calculate 1', () => {
    // ctx.addStateChangeListener((sender, msg) => {
	// 	console.log(msg);
	// });
    ctx.initialize();
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('9');
    ctx.buttonClicked('1');
    ctx.buttonClicked('=');
    
    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('819');
});

test('calculation 2', () => {
   
    ctx.initialize();
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('=');
    
    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('81');
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
    expect(display.getValueAsString()).toBe('162');
});

test('calculation 4', () => {
    
    ctx.initialize();
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('=');
    ctx.buttonClicked('=');
    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('729');
});

test('calculation 4.1', () => {
    
    ctx.initialize();
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('=');
    ctx.buttonClicked('=');
    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('531441');
});

test('calculation 4.2', () => {
    
    ctx.initialize();
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('=');
    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('6561');
});

test('calculation 4.3', () => {
    
    ctx.initialize();
    ctx.buttonClicked('8');
    ctx.buttonClicked('9');
    ctx.buttonClicked('+');
    ctx.buttonClicked('3');
    ctx.buttonClicked('=');
    ctx.buttonClicked('+');
    ctx.buttonClicked('2');
    ctx.buttonClicked('=');
    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('94');
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
    expect(display.getValueAsString()).toBe('85');
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
    expect(display.getValueAsString()).toBe('0');
});

test('calculation 7', () => {
    
    ctx.initialize();
    ctx.buttonClicked('0');
    ctx.buttonClicked('+');
    ctx.buttonClicked('0');
    ctx.buttonClicked('=');
    
    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('0');
});

test('calculation 8', () => {
   
    ctx.initialize();
    ctx.buttonClicked('0');
    ctx.buttonClicked('+');
    ctx.buttonClicked('3');
    ctx.buttonClicked('=');
    
    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('3');
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
    expect(display.getValueAsString()).toBe('3');
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
    expect(display.getValueAsString()).toBe('3');
});

test('calculation 10', () => {
   
    ctx.initialize();
    ctx.buttonClicked('0');
    ctx.buttonClicked('+');
    ctx.buttonClicked('3');
    ctx.buttonClicked('=');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('6');
});

test('calculation 11', () => {
    ctx.initialize();
    ctx.buttonClicked('3');
    ctx.buttonClicked('+');
    ctx.buttonClicked('0');
    ctx.buttonClicked('=');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('3');
});

test('calculation 12', () => {
    ctx.initialize();
    ctx.buttonClicked('3');
    ctx.buttonClicked('+');
    ctx.buttonClicked('ca');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('0');
});

test('calculation 13', () => {
    ctx.initialize();
    ctx.buttonClicked('3');
    ctx.buttonClicked('ca');
    ctx.buttonClicked('+');
    ctx.buttonClicked('1');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('1');
});

test('calculation 14', () => {
    ctx.initialize();
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('9');
    ctx.buttonClicked('+');
    ctx.buttonClicked('2');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('83');
});

test('calculation 15', () => {
    ctx.initialize();
    ctx.buttonClicked('2');
    ctx.buttonClicked('+');
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('9');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('83');
});

test('calculation 15.1', () => {
    ctx.initialize();
    ctx.buttonClicked('2');
    ctx.buttonClicked('+');
    ctx.buttonClicked('9');
    ctx.buttonClicked('/');
    ctx.buttonClicked('9');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('3');
});

test('calculation 15.2', () => {
    ctx.initialize();
    ctx.buttonClicked('2');
    ctx.buttonClicked('*');
    ctx.buttonClicked('3');
    ctx.buttonClicked('*');
    ctx.buttonClicked('3');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('18');
});

test('calculation 15.3', () => {
    ctx.initialize();
    ctx.buttonClicked('2');
    ctx.buttonClicked('/');
    ctx.buttonClicked('3');
    ctx.buttonClicked('/');
    ctx.buttonClicked('3');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('0.2222222222222222');
});


test('calculation 16', () => {
    ctx.initialize();
    ctx.buttonClicked('2');
    ctx.buttonClicked('+');
    ctx.buttonClicked('3');
    ctx.buttonClicked('*');
    ctx.buttonClicked('9');
    ctx.buttonClicked('*');
    ctx.buttonClicked('1');
    ctx.buttonClicked('0');
    ctx.buttonClicked('=');

    expect(ctx.getTokens()).toBeDefined();
    expect(display.getValueAsString()).toBe('272');
});