/**
 *  Share
    Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. 
    Return the sum of the three integers. You may assume that each input would have exactly one solution.

    Example:

    Given array nums = [-1, 2, 1, -4], and target = 1.

    The sum that is closest to the target is 2. (-1 + 2 + 1 = 2). 
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {

    //traversal with two pointers use O(n^2) time space;
    nums.sort((a, b) => a - b);
    let closestSum = Infinity;
    for (let i = 0; i < nums.length; i++) {

        let left = i + 1; right = nums.length - 1;

        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];
            if (sum < target) {
                left++;
            } else if (sum > target) {
                right--
            } else {
                return sum;
            }

            if (Math.abs(target - sum) < Math.abs(target - closestSum)) {
                closestSum = sum;
            }
        }
    }

    return closestSum;


    //traversal and binary search use O(n^2logn) time space;

    //  nums.sort((a, b) => a - b);
    //     const findClosest = function(nums, num, _start){
    //         let start = _start, end = nums.length - 1;
    //         while(start < end){
    //             let middle = start + Math.floor((end - start)/2);
    //             if(nums[middle] < num){
    //                 start = middle + 1;
    //             }else{
    //                 end = middle;
    //             }
    //         }

    //         if(start > _start){
    //             if(Math.abs(nums[start] - num) > Math.abs(nums[start-1] - num)){
    //                 return nums[start-1];
    //             }
    //         }

    //         return nums[start];
    //     }
    //     let min = Infinity, output;
    //     for(let i = 0; i < nums.length-2; i++){
    //         for(let j = i+1; j < nums.length-1; j++){
    //             const sum = nums[i] + nums[j];
    //             const _add = findClosest(nums, target - sum, j+1);
    //             if(Math.abs(target - sum - _add) < min){
    //                 min = Math.abs(target - sum - _add);
    //                 output = sum + _add
    //             }
    //         }
    //     }

    //     return output;
};