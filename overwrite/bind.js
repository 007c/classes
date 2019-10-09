function bind(fn, context, ...bindArgs) {
    return function(...args) {
        fn.apply(context, [...args, ...bindArgs]);
    }
}


const cn = {m: 1};

const fn = function(...args) {
    console.log(this.m);
    console.log(args)
}

const bindFn = bind(fn, cn, 3);

bindFn(5);