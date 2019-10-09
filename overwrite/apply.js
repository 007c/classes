Function.prototype._apply_ = function (context, argsArray = []) {
    const fn = this;
    if (!context) {
        return fn(...argsArray);
    }

    let contextOb = context;
    // transform basic type to object
    // eg 1 => Number {1};
    if (typeof context !== "object") {
        contextOb = Object(context);
    }

    contextOb.fn = fn;

    contextOb.fn(...argsArray);

    delete contextOb.fn;
}


function m(...args) {
    console.log(this.m, args);
}

m._apply_(null);

m._apply_(1, [2, 3]);

m._apply_({m: 3}, [3, 5]);