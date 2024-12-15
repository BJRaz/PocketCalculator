/**
 * class DisplayBuffer
 */
let DisplayBuffer = (function () {
	let buffer = new Array();
	let onInsert = new Array();
	let hasDot = false;
	let _me = null;

	let fireOnInsert = () => {
		for (var i in onInsert)
			onInsert[i](_me, valueAsString());
	};

	let valueAsString = () => (buffer.join(''));

	return function () {
		_me = this;
		this.clear = () => { 
			buffer = new Array();	
			hasDot = false; 
		};

		this.getValueAsString = valueAsString;

		this.insertChar = (char) => {
			if(!char) char = '0';
			switch(char) {
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
					{
						break;
					}
				case ".":
					{
						if(hasDot)
							return;
						hasDot = !hasDot;
						break;
					}
				default:
					throw new Error('DisplayBuffer: character "' + char + '" is not accepted');
			}
			buffer.push(char);
			fireOnInsert();
		};

		this.insertString = (str) => {
			buffer = str.toString().split('');
			fireOnInsert();
		};

		this.getBuffer = () => buffer;

		this.addOnInsertListener = (listener) => {
			onInsert.push(listener);
		}
	};

})();

module.exports = DisplayBuffer;
