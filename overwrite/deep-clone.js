function deepClone(target) {
    if (target && target.__cloned) {
        return Array.isArray(target.__cloned) ? [] : {};
    }
    let cloned;
    if (typeof target === "function") {
        cloned = function () {
            return target.apply(this, arguments);
        }
        cloneAttribute(target, cloned);

    } else if (typeof target === "object") {
        if (Array.isArray(target)) {
            cloned = [];
        } else {
            cloned = {};
        }
        cloneAttribute(target, cloned);
    } else {
        cloned = target;
    }
    return cloned;

}

function cloneAttribute(target, cloned) {
    const keys = Object.keys(target);
    target.__cloned = cloned;
    for (let key of keys) {
        cloned[key] = deepClone(target[key]);
    }

    delete target.__cloned;
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
console.log('clonedEx: ', clonedEx, clonedEx.mutiply);

var a = {c: 2};
var b = {};
a.b = b;
b.a = a;

var cloneda = deepClone(a);
console.log('cloneda: ', cloneda);

clonedA.b(6);