
	var input = null;
	var operand = "";
	//var displayBuffer = new Array();	
	var tokens = new Stack();
	
	function init()
	{
		input = $("#display");
		console.log("Pocketcalculator 0.1")
		
		var calculatorContext = new CalculatorContext();
		calculatorContext.addOnInsertListener(updateDisplay);
		calculatorContext.stateChange.push((msg) => console.log(msg));
		calculatorContext.reset();

		var buttons = document.getElementsByTagName("button");
		for(var i=0;i<buttons.length;i++)
			buttons.item(i).addEventListener("click", calculatorContext.buttonClicked, false);
		
		//	testPostfix();
	}

	function updateDisplay(value){				
		input.val(value);
	}

	/**
	 * class DisplayBuffer
	 */
	var DisplayBuffer = (function() {
		var buffer = new Array();

		return function() {
			this.clear = () => { buffer = new Array() };
			
			this.insertChar = (char) => { 
				buffer.push(char);
				fireOnInsert(); 
			};

			this.getValueAsFloat = () => parseFloat(buffer.join(''));
			
			this.onInsert = new Array();	
			
			this.insertString = (str) => {
				buffer = str.toString().split('');
				fireOnInsert();
			};

			fireOnInsert = () => {						
				for(var i in this.onInsert)
					this.onInsert[i](this.getValueAsFloat());
			};
			
		};

		

	})();

	/**
	 * CalculatorContext
	 */
	var CalculatorContext = (function() {
		var currentOperator = null;
		var displayBuffer = new DisplayBuffer();
		
		// postfix notation calculation...
		function doCalculate(stack, operator) {
			var op2 = stack.pop();var op1 = stack.pop(); 
			switch(operator) {
				case "+": stack.push(op1 + op2); break;
				case "*": stack.push(op1 * op2); break;					
				case "/": stack.push(op1 / op2); break;					
				case "-": stack.push(op1 - op2);break;					
			}
		};

		/**
		 * Base State class
		 */
		function State() {	
			this.operatorEntered = (operator) => { console.log("default action - operator: " + operator); };
			this.operandEntered = (operand) => { console.log("default action - operand: " + operand); }
			this.equalsEntered = (equals) => { console.log("default action - equal: " + equals); };			
		};

		/**
		 * ReadyState class extends State
		 */
		function ReadyState() {
			onStateChange("Ready state entered .. ");
			
			this.operandEntered = (o) => {
				displayBuffer.clear();
				if(o != "0") {
					displayBuffer.insertChar(o);
					
					state = new Operand1EnteringState();
					return;
				}		
				displayBuffer.insertChar(0);	
				
			}	
		}
		ReadyState.prototype = new State;

		/**
		 * OperandEnteringState extends State
		 */
		function Operand1EnteringState() {
			onStateChange("Operand1Entering state entered .. ");
			
			this.operandEntered = (o) => {
				displayBuffer.insertChar(o);				
			};

			this.operatorEntered = (operator) => {
				state = new OperatorEnteredState(operator);
				tokens.push(displayBuffer.getValueAsFloat());
			}
		}
		Operand1EnteringState.prototype = new State;

		/**
		 * OperatorEnteredState extends State
		 */
		function OperatorEnteredState(operator) {
			onStateChange("OperatorEntered state entered .. ");
			currentOperator = operator;
			
			this.operandEntered = (o) => {
				displayBuffer.clear();
				if(o != "0") {
					state = new Operand2EnteringState();
					state.operandEntered(o);
					return;
				}
				displayBuffer.insertChar(0);				
			};

			this.operatorEntered = (operator) => {				
				currentOperator = operator;
			}
		}
		OperatorEnteredState.prototype = new State;

		/**
		 * OperandEnteringState extends State
		 * At this state the currentOperator is set
		 */
		function Operand2EnteringState() {
			onStateChange("Operand2Entering state entered .. ");
			this.operandEntered = (o) => {				
				displayBuffer.insertChar(o);					
			};

			this.operatorEntered = (operator) => {			
				tokens.push(displayBuffer.getValueAsFloat());				
				doCalculate(tokens, currentOperator);												
				displayBuffer.insertString(tokens.first());		
															// NB. foreign ref.
				state = new OperatorEnteredState(operator);				
			};

			this.equalsEntered = (operator) => {
				tokens.push(displayBuffer.getValueAsFloat());				
				doCalculate(tokens, currentOperator);				
				displayBuffer.clear();
				displayBuffer.insertChar(tokens.pop());				
				displayBuffer.clear();
				state = new ReadyState();				
			}
		}
		Operand2EnteringState.prototype = new State;

		// -----------------------------------------

		reset = () => {			
			displayBuffer.clear();
			displayBuffer.insertChar(0);			
			currentOperator = null;
			state = new ReadyState();
		};
		
		return function() {
			setState = function(s) {
				state = s;
			};
			onStateChange = (msg) => {
				for(var i in this.stateChange)
					this.stateChange[i](msg);
			};	
			
			this.stateChange = new Array();

			this.buttonClicked = function(elem)
			{				
				var elemId = elem.target.id;
				console.log(elemId);
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
						state.operandEntered(elemId);						
						break;
					case "-":
					case "*":
					case "/":
					case "+": {
						state.operatorEntered(elemId);
						break;
					}
					case "=": {
						state.equalsEntered(elemId);
						break;
					}	
					case "ca":
						reset();
						break;
					default:
						alert("Not implemented");
					
				}
			};
			this.addOnInsertListener = (listener) => {				
				displayBuffer.onInsert.push(listener);				
			};	
			this.reset = reset;
		}
	})();

	
	
		
