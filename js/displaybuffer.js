	/**
	 * class DisplayBuffer
	 */
	var DisplayBuffer = (function() {
		let buffer = new Array();
		let onInsert = new Array();	

		fireOnInsert = () => {						
			for(var i in onInsert)
				onInsert[i](this, valueAsFloat());
		};

		valueAsFloat = () => (buffer.join(''));

		return function() {
			this.clear = () => { buffer = new Array() };
			
			this.getValueAsFloat = valueAsFloat;
			
			this.insertChar = (char) => { 
				buffer.push(char);
				fireOnInsert(); 
			};
			
			this.insertString = (str) => {
				buffer = str.toString().split('');
				fireOnInsert();
			};

			this.getBuffer = () => buffer;

			this.addOnInsertListener = (listener) => {
				onInsert[onInsert.length] = listener;
			}
		};

	})();