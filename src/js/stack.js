function Stack() {

    let internal = new Array();

    this.pop = () => {
        return internal.pop();
    };

    this.push = (item) => {
        internal.push(item);
    }

    this.top = () => {
        if (internal.length > 0)
            return internal[internal.length - 1];
        return null;
    }

    this.bottom = () => {
        if (!this.isEmpty())
            return internal[0];
        return null;
    }

    this.isEmpty = () => {
        return internal.length === 0;
    }

    this.toString = () => {
        var str = [];
        for (var i in internal) {
            str.push(('[' + i + '] = ' + internal[i]) + ",");
        }
        return str.join(',');
    };
}

module.exports = Stack;