const utils = require('./utils');
function dividePlus(arr, start, end){
    if(start === end){
        return arr[end];
    }

    let mid = start + Math.floor((end - start)/2);

    return dividePlus(arr, start, mid) + dividePlus(arr, mid + 1, end);
}

function normalPlus(arr, n){
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        sum += arr[i];
    }

    return sum;
}


console.time('O(logn)')
// console.log(dividePlus(arr, 0, arr.length - 1));
for(let i = 0; i < 1000; i++){
    let arr = utils.makeIntegerArray(10000000, 0, 1000);
    dividePlus(arr, 0, arr.length - 1);
}
console.timeEnd('O(logn)')

console.time('O(n)')
for(let i = 0; i < 1000; i++){
    let arr = utils.makeIntegerArray(10000000, 0, 1000);
    normalPlus(arr);
}
console.timeEnd('O(n)')