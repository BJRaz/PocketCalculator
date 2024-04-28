const CalculatorContext = require('../calculatorcontext');
const DisplayBuffer = require('../displaybuffer');

test('do calculate', () => {
    var d = new DisplayBuffer();
    var c = new CalculatorContext(d);
    // c.addStateChangeListener((sender, msg) => {
	// 	console.log(msg);
	// 	//console.log(sender.context);
	// });
    c.initialize();
    c.buttonClicked('9');
    c.buttonClicked('*');
    c.buttonClicked('9');
    c.buttonClicked('=');
    
    expect(c.getTokens()).toBeDefined();
    expect(d.getValueAsFloat()).toBe('81');
});

test('calculation 2', () => {
    var d = new DisplayBuffer();
    var c = new CalculatorContext(d);
    // c.addStateChangeListener((sender, msg) => {
	// 	console.log(msg);
	// 	//console.log(sender.context);
	// });
    c.initialize();
    c.buttonClicked('9');
    c.buttonClicked('*');
    c.buttonClicked('=');
    
    expect(c.getTokens()).toBeDefined();
    expect(d.getValueAsFloat()).toBe('81');
});

test('calculation 3', () => {
    var d = new DisplayBuffer();
    var c = new CalculatorContext(d);
    // c.addStateChangeListener((sender, msg) => {
	// 	console.log(msg);
	// 	//console.log(sender.context);
	// });
    c.initialize();
    c.buttonClicked('9');
    c.buttonClicked('*');
    c.buttonClicked('=');
    c.buttonClicked('*');
    c.buttonClicked('2');
    c.buttonClicked('=');
    expect(c.getTokens()).toBeDefined();
    expect(d.getValueAsFloat()).toBe('162');
});

test('calculation 4', () => {
    var d = new DisplayBuffer();
    var c = new CalculatorContext(d);
    // c.addStateChangeListener((sender, msg) => {
	// 	console.log(msg);
	// 	//console.log(sender.context);
	// });
    c.initialize();
    c.buttonClicked('9');
    c.buttonClicked('*');
    c.buttonClicked('=');
    c.buttonClicked('=');
    expect(c.getTokens()).toBeDefined();
    expect(d.getValueAsFloat()).toBe('729');
});

test('calculation 5', () => {
    var d = new DisplayBuffer();
    var c = new CalculatorContext(d);
    // c.addStateChangeListener((sender, msg) => {
	// 	console.log(msg);
	// 	//console.log(sender.context);
	// });
    c.initialize();
    c.buttonClicked('9');
    c.buttonClicked('*');
    c.buttonClicked('=');
    c.buttonClicked('+');
    c.buttonClicked('4');
    c.buttonClicked('=');

    expect(c.getTokens()).toBeDefined();
    expect(d.getValueAsFloat()).toBe('85');
});