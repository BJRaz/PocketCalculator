
    // TODO - move to some kind of test-framework...
    function testPostfix() {
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
		var result = s.pop();
		alert('Result (5 + (4 * 8): ' + result + ' Passed: ' + (result == 37));	// should be 37 (5 + (4 * 8))

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
		result = s.pop();
		alert('Result (( 5 + 4 ) * 8 ): ' + result + ' Passed: ' + (result == 72));	// should be 72 (( 5 + 4 ) * 8 ) 

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
		result = s.pop();
		alert('Result ( 2 - 1 ): ' + result + ' Passed: ' + (result == -1));		// should be -1 ( 2 - 1 )
    };
    
    function calculateOperands(s, token) {
        var op2 = s.pop();var op1 = s.pop(); 
        switch(token) {
            case "+": s.push(op1 + op2); break;
            case "*": s.push(op1 * op2); break;					
            case "/": s.push(op1 / op2); break;					
            case "-": s.push(op1 - op2);break;					
        }
    };