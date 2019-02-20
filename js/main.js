
	var input = null;
	var operand = "";
	var displayBuffer = new Array();
	var stack = new Array();

	var stateReady = true;

	var calc = new Calculator();

	function init()
	{

		input = $("#display");
		input.val(0);
		var buttons = document.getElementsByTagName("button");
		for(var i=0;i<buttons.length;i++)
			buttons.item(i).addEventListener("click", CalculatorContext.buttonClicked, false);
	}
	
	var CalculatorContext = (function() {
		function State(){
			this.enterOperator = (operator) => {
			       	operand = operator;	
				console.log(input.val());
				calc.add(parseInt(input.val()));
				displayBuffer = new Array();
				CalculatorContext.setState(new OperatorState());
				console.log("State: enterOperator -> OperatorState");
		       	};
			
		};
		
		function OperatorState() {
			this.enterOperator = (operator) => { 
				console.log("OperatorState: enterOperator " + operator);
				console.log(input.val());
				if(displayBuffer.length > 0) {
					switch(operator) {
						case "+":
							calc.add(parseInt(input.val()));	
							break;
						case "-":
							calc.subtract(parseInt(input.val()));
							break;
						case "*":
							calc.multiply(parseInt(input.val()));
							break;
						case "/":
							calc.division(parseInt(input.val()));
							break;
					}
					displayBuffer = new Array();
					input.val(calc.getAccumulator());
				}
				operand = operator;
			};
		};

		OperatorState.prototype = new State;
		
		function WorkingState() {
			this.enterOperator = (operator) => { 
				console.log("Hest operator " + operator);
				calc.add(parseInt(input.val()));
				operand = operator;
				input.val(calc.getAccumulator());
			};
		};

		WorkingState.prototype = new State;


		var state = new State();
	
		return {
			setState: function(s) {
				state = s;
			},
			buttonClicked: function(elem)
			{
				var elemId = elem.target.id;
				switch(elemId) {
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
					case "6":
					case "7":
					case "8":
					case "9":
					case "0":
						//var value = elem.target.id;
						
						displayBuffer.push(elemId);
						updateDisplay();
						
						//state.enterDigit(elemId);
						break;
					case "-":
					case "*":
					case "/":
					case "+": {
						state.enterOperator(elemId);
						/*if(stateReady) {
							// pre: value = input.val
							stack.push('+');
							stack.push(parseInt(input.val()));
							displayBuffer = new Array();
							updateDisplay();
							stateReady = !stateReady;
						} else {
							stack.push(input.val());
							var a = parseInt(stack.pop());
							var b = parseInt(stack.pop());
							var operand = stack.pop();
							
							var result = eval(a+operand+b);
							displayBuffer = new Array();
							
							stack.push('+');
							stack.push(result);
		
							console.log("Not ready");
						}*/
						break;
					}
					case "=": {
						state.enterOperator(elemId);
						break;
					}	
				}
			}
				
		}
	})();

	function updateDisplay(){
		var value = displayBuffer.join('');
		
		input.val(value);
		console.log(operand);
	}
	
	
		
