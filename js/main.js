
	var input = null;
	var operand = "";
	//var displayBuffer = new Array();	
	
	
	function init()
	{
		input = $("#display");
		console.log("Pocketcalculator 0.1")
		
		var calculatorContext = new CalculatorContext();
		calculatorContext.addOnInsertListener(updateDisplay);
		calculatorContext.addStateChangeListener((msg) => console.log(msg));
		calculatorContext.reset();

		var buttons = document.getElementsByTagName("button");
		for(var i=0;i<buttons.length;i++)
			buttons.item(i).addEventListener("click", calculatorContext.buttonClicked, false);
		
			//testPostfix();
	}

	function updateDisplay(value){				
		input.val(value);
	}



	