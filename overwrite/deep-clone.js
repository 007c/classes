function deepClone(target) {

    if(typeof target !== 'object' || target === null) {
        return target;
    }
    if (target.__cloned) {
        return target.__cloned;
    }
    const type = Object.prototype.toString.call(target);

    const processor = TYPE_PROCESSORS[type] || cloneAttribute;
    return processor(target);
}

const TYPE_PROCESSORS = {
    "[object Object]": cloneAttribute,
    "[object Array]": cloneArray,
    "[object Map]": function (target) {
        const cloned = new Map();
        const keys = [...target.keys()];

        target.__cloned = cloned;

        for(const key of keys) {
            cloned.set(key, deepClone(target.get(key)))
        }

        delete target.__cloned;
        return cloned;
    },
    "[object Function]": function(target) {
        const cloned = function(...args) {
            return target.apply(this, args);
        }

        const keys = Object.keys(target);
        target.__cloned = cloned;

        for(const key of keys) {
            cloned[key] = deepClone(target[key]);
        }

        delete target.__cloned;
        return cloned;
    },
    "[object Set]": function(target) {
        const cloned = new Set();
        const values = [...target.values()];
        target.__cloned = cloned;
        for(const value of values) {
            cloned.add(deepClone(value));
        }
        delete target.__cloned;

        return cloned;
    }
}

function cloneAttribute(target) {
    const keys = Object.keys(target);
    const cloned = {};
    target.__cloned = cloned;
    for (let key of keys) {
        cloned[key] = deepClone(target[key]);
    }

    delete target.__cloned;

    return cloned;
}

function cloneArray(target) {
    const cloned = [];
    target.__cloned = cloned;
    for (const item of target) {
        cloned.push(deepClone(item));
    }

    delete target.__cloned;
    return cloned;
}

var a = {
    value: 1,
    b: function (value) {
        console.log(value);
    },
    isNumber: false,
    count: 2,
    bytes: {
        d: 5,
        c: {
            xMax: 15
        }
    },
    lof: "right",
}

class Exapmles {
    constructor() {
        this.filed = undefined;
    }

    mutiply() {
        return "multiply"
    }
}

const ex = new Exapmles();

const map = new Map();
map.set('field', 1);

var clonedMap = deepClone(map);
console.log('clonedMap: ', clonedMap);



var clonedA = deepClone(a);
console.log('clonedA: ', clonedA);

var clonedEx = deepClone(ex);
clonedEx.filed = 5;
console.log('clonedEx: ', clonedEx);

console.log('ex: ', ex);

var a = { c: 2 };
var b = {};
a.b = b;
b.a = a;

var cloneda = deepClone(a);
console.log('cloneda: ', cloneda);

clonedA.b(6);

clonedMap.set('field', 2);
console.log('clonedMap: ', clonedMap);
console.log('map: ', map);

const set = new Set();
set.add(5);
console.log(set)
const clonedSet = deepClone(set);

console.log('clonedSet', clonedSet)

