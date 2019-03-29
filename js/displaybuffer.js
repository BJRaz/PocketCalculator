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