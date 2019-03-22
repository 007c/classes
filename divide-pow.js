function dividePow(n) {
    if (n === 1) {
        return 2
    }
    if (n % 2 === 1) {
        return 2 * dividePow((n - 1) / 2) * dividePow((n - 1) / 2) % 10000;
    }
    return dividePow(n / 2) * dividePow(n / 2) % 10000;
}

function normalPow(n) {
    if (n === 1) {
        return 2;
    }

    return 2 * normalPow(n - 1) % 10000;
}

function normalLoopPow(n) {
    let ret = 1;

    for (let i = 0; i < n; i++) {
        ret *= 2;
        ret %= 10000;
    }

    return ret;
}

console.time('O(logn)')
console.log(dividePow(1024000000))
console.timeEnd('O(logn)')

console.time('O(n)')
console.log(normalLoopPow(1024000000))
console.timeEnd('O(n)')