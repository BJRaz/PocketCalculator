// TODO - move to some kind of test-framework...

var tests = (function() {
	var infixStr = "";

	var calculateOperands = (s, token) => {
		var op2 = s.pop();var op1 = s.pop(); 
		switch(token) {
			case "+": s.push(op1 + op2); break;
			case "*": s.push(op1 * op2); break;					
			case "/": s.push(op1 / op2); break;					
			case "-": s.push(op1 - op2);break;					
		}
	}

	var infixNotation = (node) => {
		var value = node.value;
		if(value == '+' || value == '-' || value == '*' || value == '/')
			infixStr += ('(');
		if(node.left != null)
			infixNotation(node.left);
		infixStr += (value);
		if(node.right != null)
			infixNotation(node.right);
		if(value == '+' || value == '-' || value == '*' || value == '/')
			infixStr += (')');		
	}

	var constructTree = (tokens) => {
		var reverse = new Stack;
		var treeStack = new Stack;
		
		while(tokens.length > 0) {
			reverse.push(tokens.pop())
		}
		
		while(!reverse.isEmpty()) {
			var token = reverse.pop();
			
			if(token == '+' || token == '-' || token == '*' || token == '/')
			{
				//console.log(token);
				var n = new Node(token);
				n.right = treeStack.pop();
				n.left = treeStack.pop();
				treeStack.push(n);
			}
			else
			{
				var n = new Node(token);
				treeStack.push(n);
			}
		}
		return treeStack.pop();
	}

	return {
		printInfix: (node) => { 
			infixNotation(node);
			console.log(infixStr);			
		},
		constructExpressionTree: constructTree,
		testPostfix: () => {
			var tokens = [5,4, 8,"*","+"];
			var s = new Stack();
			for(var i in tokens) 
			{
				var token = tokens[i];
				if(!isNaN(token))
					s.push(token);
				else
				{
					calculateOperands(s, token);
				}
			}
			var tree = constructTree(tokens);
			infixStr = "";
			infixNotation(tree);
			console.log(infixStr);
			console.log("result : " + s.pop());	// should be 37 (5 + (4 * 8))
			
			tokens = [5,4,"+", 8, "*"];
			s = new Stack();
			for(var i in tokens) 
			{
				var token = tokens[i];
				if(!isNaN(token))
					s.push(token);
				else
				{
					calculateOperands(s, token);
				}
			}
			tree = constructTree(tokens);
			infixStr = "";
			infixNotation(tree);
			console.log(infixStr);
			console.log(s.pop());	// should be 72 (( 5 + 4 ) * 8 ) 
	
			tokens = [1,2,"-"];
			s = new Stack();
			for(var i in tokens) 
			{
				var token = tokens[i];
				if(!isNaN(token))
					s.push(token);
				else
				{
					calculateOperands(s, token);
				}
			}
			tree = constructTree(tokens);
			infixStr = "";
			infixNotation(tree);
			console.log(infixStr);
			console.log(s.pop());	// should be -1 ( 2 - 1 )
		},
		
	}
	
})();

