function Command()
{
    this.execute = function() {};
    this.unexecute = function() { alert(0); };
}

function MyCommand()
{
    this.execute = function() {
        alert("Executing");
    }
}

MyCommand.prototype = new Command;

var Calculator = (function(){
	var accumulator = 0;
	var operator = null;

	return function(){
		this.getAccumulator = () => accumulator;	
		this.add = (value) => accumulator += value;
		this.subtract = (value) => accumulator -= value;
		this.multiply = (value) => accumulator *= value;
		this.division = (value) => accumulator /= value;
		this.clear = () => accumulator = 0;
	};
})();
/*

   var x = new Calculator();

   CalculatorContext.add(10);


CalculatorContext.add(10);

CalculatorContext.add(10);

CalculatorContext.subtract(20);

CalculatorContext.multiply(2);

CalculatorContext.division(5);

CalculatorContext.hest = 200;

console.log(CalculatorContext.getAccumulator());
*/
