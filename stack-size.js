'use strict'
const utils  = require('./utils');
function stackSize(arr, n, total){
    if(n < 0){
        return total;
    }

    return stackSize(arr, n - 1, arr[n] + total);
}

const arr = utils.makeIntegerArray(10000,0, 30);
console.log(stackSize(arr, arr.length - 1, 0))