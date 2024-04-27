import { Stack } from './stack';

/**
 * CalculatorContext
 */
export let CalculatorContext = (function () {
    var operatorStack = null;               // this is an array operating as a stack
    var displayBuffer = null;               // new DisplayBuffer();
    var stateChangeListeners = [];          // event-listeners
    var tokens = null;                      // the combined operands into number tokens i.e. 42, 17.5 etc.
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
        tokens = new Stack();
        operatorStack = new Stack();
        this.context = ctx;
        onStateChange(this, "Ready state entered .. ");

        this.operandEntered = (operand) => {
            displayBuffer.clear();
            if (operand != "0") {
                state = new Operand1EnteringState();
                state.operandEntered(operand);
                return;
            }
        }
    }
    ReadyState.prototype = new State;

    /**
     * OperandEnteringState extends State
     */
    function Operand1EnteringState() {
        this.context = ctx;
        onStateChange(this, "Operand One Entering State");

        this.operandEntered = (operand) => {
            displayBuffer.insertChar(operand);
        };
        this.operatorEntered = (operator) => {
            state = new OperatorEnteredState();
            state.operatorEntered(operator);
            
        }
    }
    Operand1EnteringState.prototype = new State;

    /**
     * OperatorEnteredState extends State
     */
    function OperatorEnteredState() {
        this.context = ctx;
        onStateChange(this, "Operator Entered State");
        this.operator = null;
        this.token = displayBuffer.getValueAsFloat();   // store the token from previous state
        tokens.push(this.token);
        this.equalsentered = false;

        this.operandEntered = (operand) => {
            if(this.equalsentered)
            {
                state = new ReadyState();
                state.operandEntered(operand);
                return;
            }
            displayBuffer.clear();
            if (operand != "0") {
                operatorStack.push(this.operator);
                state = new Operand2EnteringState();
                state.operandEntered(operand);
                return;
            }
            displayBuffer.insertChar(0);
        };

        this.operatorEntered = (operator) => {
            console.log(operator);
            if(this.equalsentered) this.equalsentered = !this.equalsentered;
            
            this.operator = operator;
        }

        this.equalsEntered = (operator) => {
            if(!this.equalsentered) this.equalsentered = !this.equalsentered;
            if(!this.operator) return;
            // do '=' stuff
            operatorStack.push(this.operator);  
            tokens.push(this.token);
            doCalculate(tokens);
            displayBuffer.clear();
            displayBuffer.insertString(tokens.top());
        }
    }
    OperatorEnteredState.prototype = new State;

    /**
     * OperandEnteringState extends State
     * At this state the currentOperator is set
     */
    function Operand2EnteringState() {
        this.context = ctx;
        this.operator = null;
        this.topToken = this.bottomToken = 0;
        onStateChange(this, "Operand Two Entering State");
        this.equalsIsEntered = false;

        this.operandEntered = (operand) => {
            if (!this.equalsIsEntered)
                displayBuffer.insertChar(operand);
            else {
                state = new ReadyState();
                state.operandEntered(operand);
            }
        };

        this.operatorEntered = (operator) => {
            // at this state to operands exists 
            if(this.equalsIsEntered) {
                // result is allready in the tokens variable.
                console.log('do stuff');
                state = new Operand1EnteringState();
                state.operatorEntered(operator);
                return;
            }
            state = new OperatorEnteredState();
            state.operatorEntered(operator);
            doCalculate(tokens);
            displayBuffer.clear();
            displayBuffer.insertString(tokens.top());
        };

        this.equalsEntered = (operator) => {
            if(!this.equalsIsEntered) {
                this.topToken = displayBuffer.getValueAsFloat();
                this.operator = operatorStack.pop();
                this.equalsIsEntered=!this.equalsIsEntered;
            }
            operatorStack.push(this.operator);
            tokens.push(this.topToken);
            doCalculate(tokens);
            displayBuffer.clear();
            displayBuffer.insertString(tokens.top());
        }
    }
    Operand2EnteringState.prototype = new State;

    // -----------------------------------------

    // postfix notation calculation...
    function doCalculate(tokensstack) {
        
        let operator = operatorStack.pop();
        do {
            var op2 = parseFloat(tokensstack.pop());
            var op1 = parseFloat(tokensstack.pop());
            switch (operator) {
                case "+": tokensstack.push(op1 + op2); break;
                case "*": tokensstack.push(op1 * op2); break;
                case "/": tokensstack.push(op1 / op2); break;
                case "-": tokensstack.push(op1 - op2); break;
                default:
                    throw new Error('Operator not accepted: "' + operator + '"')
            }
        } while (operator = operatorStack.pop());
    };

    function reset() {
        displayBuffer.clear();
        displayBuffer.insertChar(0);
        operatorStack = new Stack;
        state = new ReadyState();
    };

    function onStateChange(state, msg) {
        for (var i in stateChangeListeners)
            stateChangeListeners[i](state, msg);
    };

    let buttonClicked = function (elemId) {

        switch (elemId) {
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

    return function (displaybuffer) {
        ctx = this;
        displayBuffer = displaybuffer;

        this.addOnInsertListener = (listener) => {
            displayBuffer.addOnInsertListener(listener);
        };
        this.addStateChangeListener = (listener) => {
            stateChangeListeners.push(listener);
        };
        this.initialize = reset;
        this.buttonClicked = buttonClicked;
        this.listTokens = () => {
            tokens.toString();
        }
    }
})();



