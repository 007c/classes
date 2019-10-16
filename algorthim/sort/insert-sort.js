const utils = require('./utils');
function insertSort(arr){
    for(let i = 1; i < arr.length; i++){
        let num = arr[i];
        let j = i-1;
        while(j > 0 && arr[j] < num){
            arr[j+1] = arr[j];
            j--;
        }
        arr[j] = num;
    }

    return arr;
}
let arr = utils.makeIntegerArray(11, 0, 1000);
console.time('run')
insertSort(arr);
console.log(arr)
console.timeEnd('run')