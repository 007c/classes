const utils = require('./utils');
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    const quickSort = function(arr, start, end){
        if(start >= end){
            return;
        }
        
        let i = start, base = arr[end];
        for(let j = start; j <= end; j++){
            if(arr[j] < base){
                let tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
                i++;
            }
        }
        
        //keep pivot in end
        let tmp = arr[i];
        arr[i] = arr[end];
        arr[end] = tmp;
        
        quickSort(arr, start, i - 1);
        quickSort(arr, i + 1, end);
    }
    
    quickSort(nums, 0, nums.length - 1);
    return nums;
};
let arr = utils.makeIntegerArray(2000, 0, 10);
console.time('run')

sortArray(arr);
console.log(arr)
console.timeEnd('run')