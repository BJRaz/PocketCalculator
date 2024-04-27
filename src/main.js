
import { CalculatorContext } from './calculatorcontext';
// import { CalculatorContext } from './testmodule';
import './css/styles.css';
import { DisplayBuffer } from './displaybuffer';

var input = null;
var operand = "";
let calculatorContext = null;

function init() {
	input = $("#display");
	console.log("*******\nPocketcalculator 0.1\nBrian J. Rasmussen 2021\n*******")

	calculatorContext = new CalculatorContext(new DisplayBuffer());
	calculatorContext.addOnInsertListener(updateDisplay);
	calculatorContext.addStateChangeListener((sender, msg) => {
		console.log(msg);
		//sender.context.listTokens();
	});
	calculatorContext.initialize();
	

	var buttons = document.getElementsByTagName("button");
	for (var i = 0; i < buttons.length; i++)
		buttons.item(i).addEventListener("click", (elem) => calculatorContext.buttonClicked(elem.target.id), false);

	//tests.testPostfix();

}

window.onload = init;

function updateDisplay(sender, value) {
	input.val(value);
}



