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

var Node = function(v) {
	this.left = null;
	this.right = null;
	this.value = v;
};

