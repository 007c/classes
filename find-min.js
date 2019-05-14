/**
153. Find Minimum in Rotated Sorted Array
Medium

935

157

Favorite

Share
Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e.,  [0,1,2,4,5,6,7] might become  [4,5,6,7,0,1,2]).

Find the minimum element.

You may assume no duplicate exists in the array.

Example 1:

Input: [3,4,5,1,2] 
Output: 1
Example 2:

Input: [4,5,6,7,0,1,2]
Output: 0
 */

 /**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let startVal = nums[0];
    if(startVal < nums[nums.length - 1]){
        return startVal;
    }
    
    let start = 0, end = nums.length - 1;
    while(start < end){
        let middle = start + Math.floor((end - start)/2);
        if(nums[middle-1] > nums[middle]){
            return nums[middle];
        }
        if(nums[middle] > nums[middle+1]){
            return nums[middle+1]
        }
        if(nums[middle] > startVal){
            start = middle + 1;
        }else{
            end = middle;
        }
    }
    return nums[start]
};

console.log(findMin([2, 3, 4, 5, 6, 19, 0, 1]))