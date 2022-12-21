/**
 * CalculatorContext
 */
var CalculatorContext = (function() {
    var currentOperator = [];
    var displayBuffer = new DisplayBuffer();
    var stateChangeListeners = [];              // event-listeners
    var tokens = new Stack();
    var state = null;
    var ctx = null;
    var newest = '';
    
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
        tokens = new Stack();
        this.context = ctx;
        onStateChange(this, "Ready state entered .. ");

        this.operandEntered = (operand) => {
            displayBuffer.clear();
            if (operand != "0") {
                displayBuffer.insertChar(operand);

                state = new Operand1EnteringState(operand);
                return;
            }
            
        }
        
    }
    ReadyState.prototype = new State;

    /**
     * OperandEnteringState extends State
     */
    function Operand1EnteringState(operand) {
        this.context = ctx;
        onStateChange(this, "Operand One Entering State");
        let hasDot = operand === '.';


        this.operandEntered = (operand) => {
            if(!hasDot && operand === '.')
                hasDot = true;
            else if(hasDot && operand === '.')
                return;
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
        this.context = ctx;
        onStateChange(this, "Operator Entered State");
        currentOperator.push(operator);

        this.operandEntered = (operand) => {
            displayBuffer.clear();
            if (operand != "0") {
                state = new Operand2EnteringState();
                displayBuffer.insertChar(operand);
                //state.operandEntered(operand);
                return;
            }
            displayBuffer.insertChar(0);
        };

        this.operatorEntered = (operator) => {
            currentOperator.push(operator);
        }
    }
    OperatorEnteredState.prototype = new State;

    /**
     * OperandEnteringState extends State
     * At this state the currentOperator is set
     */
    function Operand2EnteringState(operand) {
        this.context = ctx;
        onStateChange(this, "Operand Two Entering State");
        let hasDot = operand === '.';
        this.equalsIsEntered = false;

        this.operandEntered = (operand) => {
            if(!hasDot && operand === '.')
                hasDot = true;
            else if(hasDot && operand === '.')
                return;
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
                switch(currentOperator[currentOperator.length - 1]) {
                    case '-':
                    case '+':
                        {
                            //currentOperator.push(operator);
                            break;
                        }
                    default:
                        {
                            doCalculate(tokens, currentOperator);            
                        }
                        
                }
                
            }
            displayBuffer.insertString(tokens.first());
            state = new OperatorEnteredState(operator);
                        
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
                tokens.push(this.first);
                currentOperator.push(newest);
                doCalculate(tokens, currentOperator);
                displayBuffer.clear();
                displayBuffer.insertString(tokens.first());
                
            }
            tokens.toString();
            
        }
    }
    Operand2EnteringState.prototype = new State;

    // -----------------------------------------

    // postfix notation calculation...
    function doCalculate(stack, operator) {
        stack.toString();
        newest = operator = currentOperator.pop();
        do {
            var op2 = parseFloat(stack.pop());
            var op1 = parseFloat(stack.pop()); 
            switch(operator) {
                case "+": stack.push(op1 + op2); break;
                case "*": stack.push(op1 * op2); break;					
                case "/": stack.push(op1 / op2); break;					
                case "-": stack.push(op1 - op2);break;					
            }
        } while(operator = currentOperator.pop());
        //currentOperator.push(newest);
    };

    function reset() {			
        displayBuffer.clear();
        displayBuffer.insertChar(0);			
        currentOperator = [];
        state = new ReadyState();
    };
    
    function onStateChange(state, msg) {
        for(var i in stateChangeListeners)
            stateChangeListeners[i](state, msg);
    };	
    
    buttonClicked = function(elem)
    {				
        var elemId = elem.target.id;
        
        switch(elemId) {
            case "0": 
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case ".":
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

    return function() {
        ctx = this;
        
        this.addOnInsertListener = (listener) => {				
            displayBuffer.addOnInsertListener(listener);				
        };	
        this.addStateChangeListener = (listener) => {
            stateChangeListeners.push(listener);
        };
        this.reset = reset;
        this.buttonClicked = buttonClicked;
        this.listTokens = () => {
            tokens.toString();
        }
    }
})();


	
		
