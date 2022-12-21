var Stack = function() {
     
    let internal = new Array(0);
    
    this.pop = () => {
        return internal.pop();
    };    
    
    this.push = (item) => {
        internal.push(item);
    }

    this.toString = () => {
        for(var i in internal)
        {
            console.log('[' + i + '] = ' + internal[i]);
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
    
    this.isEmpty = () => {
        return internal.length === 0;
    }
}

