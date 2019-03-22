/**
 * Given an array of integers and an integer k, 
 * you need to find the total number of continuous subarrays whose sum equals to k. 
 * Example 1:
 * Input:nums = [1,1,1], k = 2
 * Output: 2
 * */
const utils = require('./utils');
function subarraySum(arr, k){
    let sumMaps = {'0': 1};
    let sum = 0;
    let count = 0;
    for(let i = 0; i < arr.length; i++){
        //找到两个索引之间差值为k的数量，这个数量的加总则为所有满足条件的
        //子数组数量
        sum += arr[i];
        if(sumMaps[sum - k]){
            count += sumMaps[sum - k];
        }
        if(!sumMaps[sum]){
            sumMaps[sum] = 1;
        }else{
            sumMaps[sum]++;
        }
    }

    return count;
}

const arr = utils.makeIntegerArray(3, 1, 3);
console.log(arr);
console.log(subarraySum(arr, 3));