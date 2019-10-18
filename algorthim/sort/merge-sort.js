const utils = require('../../utils');

function mergeSort(arr, start, end){
    if(start >= end){
        return;
    }

    //divide
    /**---------------- */
    let middle = start + Math.floor((end - start)/2);
    mergeSort(arr, start, middle);
    mergeSort(arr, middle+1, end);
    /**---------------- */

    //conquer
    merge(arr, start, middle, end);
}

function merge(arr, start, middle, end){
    let leftArr = [];
    let rightArr = [];
    //复制原数组的备份以对原数组做覆盖
    for(let i = 0; i <= middle - start; i++){
        leftArr[i] = arr[start + i];
    }
    for(let i = 0; i < end - middle; i++){
        rightArr[i] = arr[middle + i + 1];
    }
    
    let i = 0, j = 0, k = start;

    //merge
    while(k <= end){

        //复制剩余元素
        /**--------------------------- */
        if(i >= leftArr.length){
            arr[k] = rightArr[j];
            j++;
            k++;
            continue;
        }

        if(j >= rightArr.length){
            arr[k] = leftArr[i];
            i++;
            k++;
            continue;
        }

        /**--------------------------- */


        //排序比较，复制对应元素
        if(leftArr[i] < rightArr[j]){
            arr[k] = leftArr[i];
            i++;
        }else{
            arr[k] = rightArr[j]
            j++;
        }
        k++;
    }
}
let arr = utils.makeIntegerArray(11, 0, 20000);
console.time('run');
mergeSort(arr, 0, arr.length - 1);
console.timeEnd('run')