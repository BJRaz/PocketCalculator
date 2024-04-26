/**
 * class DisplayBuffer
 */
export let DisplayBuffer = (function () {
	let buffer = new Array();
	let onInsert = new Array();
	let hasDot = false;

	let fireOnInsert = () => {
		for (var i in onInsert)
			onInsert[i](this, valueAsFloat());
	};

	let valueAsFloat = () => (buffer.join(''));

	return function () {
		this.clear = () => { 
			buffer = new Array();	
			hasDot = false; 
		};

		this.getValueAsFloat = valueAsFloat;

		this.insertChar = (char) => {
			if (!hasDot && char === '.')
                hasDot = true;
            else if (hasDot && char === '.')
                return;
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

