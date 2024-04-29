//import { Stack } from './stack';
const Stack = require('./stack');
/**
 * CalculatorContext
 */
let CalculatorContext = (function () {
    var operatorStack = null;               // this is an array operating as a stack
    var displayBuffer = null;               // new DisplayBuffer();
    var stateChangeListeners = [];          // event-listeners
    var tokens = [];                      // the combined operands into number tokens i.e. 42, 17.5 etc.
    var state = null;
    var ctx = null;

    /**
     * Base State class
     */
    class State {
        constructor() {
            this.operatorEntered = (operator) => { console.log("default action - operator: " + operator); };
            this.operandEntered = (operand) => { console.log("default action - operand: " + operand); };
            this.equalsEntered = (equals) => { console.log("default action - equal: " + equals); };
        }
    };

    /**
     * ReadyState class extends State
     */
    class ReadyState extends State {
        constructor() {
            super();
            onStateChange(ctx, "Ready State Entered");
            tokens = new Stack();
            operatorStack = new Stack();
        }

        operandEntered = (operand) => {
            displayBuffer.clear();
            state = new Operand1EnteringState();
            state.operandEntered(operand);
        };
    }

    /**
     * OperandEnteringState extends State
     */
    class Operand1EnteringState extends State {
        constructor() {
            super();
            onStateChange(ctx, "Operand One State Entered");
        }

        operandEntered = (operand) => {
            displayBuffer.insertChar(operand);
        };

        operatorEntered = (operator) => {
            state = new OperatorEnteredState();
            state.operatorEntered(operator);
        };
    }

    /**
     * OperatorEnteredState extends State
     */
    class OperatorEnteredState extends State {
        constructor(operator) {
            super();
            onStateChange(ctx, "Operator State Entered");
            this.operator = null;
            this.equalsentered = false;
        }

        operandEntered = (operand) => {
            displayBuffer.clear();
            operatorStack.push(this.operator);
            state = new Operand2EnteringState();
            state.operandEntered(operand);
        };

        operatorEntered = (operator) => {
            this.token = displayBuffer.getValueAsFloat(); // store the token from previous state
            tokens.push(this.token);
            this.operator = operator;
        };

        equalsEntered = (operator) => {
            if (!this.equalsentered) {
                this.equalsentered = !this.equalsentered;
                this.token = displayBuffer.getValueAsFloat(); // store the token from previous state
                tokens.push(this.token);
            }
            // do '=' stuff
            operatorStack.push(this.operator);
            tokens.push(this.token);
            doCalculate(tokens);
            displayBuffer.clear();
            displayBuffer.insertString(tokens.top());
        };
    }

    /**
     * OperandEnteringState extends State
     * At this state the currentOperator is set
     */
    class Operand2EnteringState extends State {
        constructor() {
            super();
            onStateChange(ctx, "Operand Two State Entered");
            this.operator = null;
            this.topToken = 0;
            this.equalsIsEntered = false;
        }

        operandEntered = (operand) => {
            if (!this.equalsIsEntered)
                return displayBuffer.insertChar(operand);
            state = new ReadyState();
            state.operandEntered(operand);
        };

        operatorEntered = (operator) => {
            // at this state to operands exists 
            if (this.equalsIsEntered) {
                // result is allready in the tokens variable.
                state = new Operand1EnteringState();
                return state.operatorEntered(operator);
            }
            state = new OperatorEnteredState();
            state.operatorEntered(operator);
            doCalculate(tokens);
            displayBuffer.clear();
            displayBuffer.insertString(tokens.top());
        };

        equalsEntered = (operator) => {
            if (!this.equalsIsEntered) {
                if (operatorStack.isEmpty())
                    throw new Error('Operator stack must npt be empty!');
                this.equalsIsEntered = !this.equalsIsEntered;
                this.topToken = displayBuffer.getValueAsFloat();
                this.operator = operatorStack.pop();
            }
            operatorStack.push(this.operator);
            tokens.push(this.topToken);
            doCalculate(tokens);
            displayBuffer.clear();
            displayBuffer.insertString(tokens.top());
        };
    }

    // -----------------------------------------

    // postfix notation calculation...
    function doCalculate(tokensstack) {
        if (tokensstack.isEmpty())
            throw new Error('doCalculate: Can\'t calculate on an empty stack of tokens');
        if (operatorStack.isEmpty())
            throw new Error('doCalculate: Can\'t calculate on an empty stack of operators')

        do {
            let operator = operatorStack.pop();
            let op2 = parseFloat(tokensstack.pop());
            let op1 = parseFloat(tokensstack.pop());
            switch (operator) {
                case "+": tokensstack.push(op1 + op2); break;
                case "*": tokensstack.push(op1 * op2); break;
                case "/": tokensstack.push(op1 / op2); break;
                case "-": tokensstack.push(op1 - op2); break;
                default:
                    throw new Error('Operator not accepted: "' + operator + '"')
            }
        } while (!operatorStack.isEmpty());
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
        this.getTokens = () => tokens;
    }
})();

module.exports = CalculatorContext;