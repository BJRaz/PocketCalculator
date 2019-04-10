/**
	 * CalculatorContext
	 */
	var CalculatorContext = (function() {
		var currentOperator = null;
		var displayBuffer = new DisplayBuffer();
		var stateChange = new Array();              // event-listeners
		var tokens = new Stack();
        var state = null;
        var ctx = null;
        
        /**
         * Base State class
         */
        function State() {
            this.operatorEntered = (operator) => { console.log("default action - operator: " + operator); };
            this.operandEntered = (operand) => { console.log("default action - operand: " + operand); }
            this.equalsEntered = (equals) => { console.log("default action - equal: " + equals); };
            this.context = new Object();
        };

        /**
         * ReadyState class extends State
         */
        function ReadyState() {
            
            onStateChange("Ready state entered .. ");
            tokens = new Stack();
            
            this.operandEntered = (operand) => {
                displayBuffer.clear();
                if (operand != "0") {
                    displayBuffer.insertChar(operand);

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

            this.operandEntered = (operand) => {
                displayBuffer.insertChar(operand);
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

            this.operandEntered = (operand) => {
                displayBuffer.clear();
                if (operand != "0") {
                    state = new Operand2EnteringState();
                    state.operandEntered(operand);
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
            
            this.equalsIsEntered = false;

            this.operandEntered = (operand) => {
                
                if(!this.equalsIsEntered)
                    displayBuffer.insertChar(operand);
                else {
                    
                    state = new ReadyState();
                    state.operandEntered(operand);
                }                   
            };

            this.operatorEntered = (operator) => {
                if(!this.equalsIsEntered) {
                    tokens.push(displayBuffer.getValueAsFloat());
                    doCalculate(tokens, currentOperator);
                }
                displayBuffer.insertString(tokens.first());
                state = new OperatorEnteredState(operator);
                //} else 
                //    alert(tokens.pop());               
            };
            this.first = 0;
            this.equalsEntered = (operator) => {
                if(!this.equalsIsEntered) {
                    this.equalsIsEntered = true;
                    this.last = tokens.last();
                    
                    tokens.push(displayBuffer.getValueAsFloat());
                    this.first = tokens.first();
                    doCalculate(tokens, currentOperator);
                    displayBuffer.clear();
                    displayBuffer.insertString(tokens.first());
                } else {
                    //alert(this.first + " " + tokens.first() + " " + tokens.last());
                    tokens.push(this.first);
                    doCalculate(tokens, currentOperator);
                    displayBuffer.clear();
                    displayBuffer.insertString(tokens.first());
                }
                tokens.list();
                
                //displayBuffer.clear();
                //state = new ReadyState();
                //state = new Operand1EnteringState();
            }
        }
        Operand2EnteringState.prototype = new State;

        // -----------------------------------------

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

		reset = () => {			
			displayBuffer.clear();
			displayBuffer.insertChar(0);			
            currentOperator = null;
            
			state = new ReadyState();
		};
		
		return function() {
            ctx = this;
			setState = function(s) {
				state = s;
			};

			onStateChange = (msg) => {
				for(var i in stateChange)
					stateChange[i](this, msg);
			};	
            
            this.tokens = tokens;

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
			this.addStateChangeListener = (listener) => {
				stateChange.push(listener);
			};
			this.reset = reset;
		}
	})();

	
	
		
