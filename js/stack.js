var Stack = (function() {
    var internal = new Array(0);
    
    return function() {
        this.pop = () => {
            return internal.pop();
        };    
        this.push = (item) => {
            internal.push(item);
        };
        this.list = () => {
            for(var i in internal)
            {
                console.log(internal[i] + "," + i);
            }
        };
        this.first = () => {
            return internal[internal.length - 1];
        }
    };
})();


