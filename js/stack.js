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
            if(internal.length > 0)
                return internal[internal.length - 1];
            return null;
        }
        this.last = () => {
            if(internal.length > 0)
                return internal[0];
            return null;
        }
    };
})();


