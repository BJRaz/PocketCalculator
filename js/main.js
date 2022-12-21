
	var input = null;
	var operand = "";
	let calculatorContext = null;
	
	function init()
	{
		input = $("#display");
		console.log("*******\nPocketcalculator 0.1\nBrian J. Rasmussen 2021\n*******")
		
		calculatorContext = new CalculatorContext();
		calculatorContext.addOnInsertListener(updateDisplay);
		calculatorContext.addStateChangeListener((sender, msg) => {
			console.log(msg);
			sender.context.listTokens();
		});
		calculatorContext.reset();
		
		var buttons = document.getElementsByTagName("button");
		for(var i=0;i<buttons.length;i++)
			buttons.item(i).addEventListener("click", calculatorContext.buttonClicked, false);
		
		//tests.testPostfix();
		
	}

	function updateDisplay(sender, value){				
		input.val(value);
	}



	