
	var input = null;
	var operand = "";
	var displayBuffer = new Array();	
	var tokens = new Stack();
	
	function init()
	{
		input = $("#display");
		console.log("Pocketcalculator 0.1")
		var calculatorContext = new CalculatorContext();
		calculatorContext.stateChange.push((msg) => console.log(msg));
		var buttons = document.getElementsByTagName("button");
		for(var i=0;i<buttons.length;i++)
			buttons.item(i).addEventListener("click", calculatorContext.buttonClicked, false);
		
		//	testPostfix();
	}

	function updateDisplay(){
		var value = displayBuffer.join('');
		input.val(value);
	}

	/**
	 * CalculatorContext
	 */
	var CalculatorContext = (function() {
		var currentOperator = null;
		
		// postfix notation calculation...
		function calculateOperands(s, token) {
			var op2 = s.pop();var op1 = s.pop(); 
			switch(token) {
				case "+": s.push(op1 + op2); break;
				case "*": s.push(op1 * op2); break;					
				case "/": s.push(op1 / op2); break;					
				case "-": s.push(op1 - op2);break;					
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
				displayBuffer = new Array(0);
				if(o != "0") {
					displayBuffer.push(o);
					updateDisplay();
					state = new Operand1EnteringState();
					return;
				}		
				displayBuffer.push(0);	
				updateDisplay();
			}	
		}
		ReadyState.prototype = new State;

		/**
		 * OperandEnteringState extends State
		 */
		function Operand1EnteringState() {
			onStateChange("Operand1Entering state entered .. ");
			this.operandEntered = (o) => {
				displayBuffer.push(o);
				updateDisplay();
			};
			this.operatorEntered = (operator) => {
				state = new OperatorEnteredState(operator);
				tokens.push(parseFloat(displayBuffer.join('')));
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
				displayBuffer = new Array(0);
				if(o != "0") {
					state = new Operand2EnteringState();
					state.operandEntered(o);
					return;
				}
				displayBuffer.push(0);
				updateDisplay();	
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
				displayBuffer.push(o);
				updateDisplay();				
			};

			this.operatorEntered = (operator) => {			
				tokens.push(parseFloat(displayBuffer.join('')));				
				calculateOperands(tokens, currentOperator);								
				input.val(tokens.first());
				state = new OperatorEnteredState(operator);				
			};

			this.equalsEntered = (operator) => {
				tokens.push(parseFloat(displayBuffer.join('')));				
				calculateOperands(tokens, currentOperator);				
				displayBuffer = new Array(0);
				displayBuffer.push(tokens.pop());
				updateDisplay();
				displayBuffer = new Array(0);
				state = new ReadyState();				
			}
		}
		Operand2EnteringState.prototype = new State;

		// -----------------------------------------

		reset = () => {			
			displayBuffer = new Array(0);
			displayBuffer.push(0);
			updateDisplay();
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
			reset();	
		}
	})();

	
	
		
