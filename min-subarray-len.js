/**Given an array of n positive integers and a positive integer s, 
 * find the minimal length of a contiguous subarray of which the sum ≥ s. 
 * If there isn't one, return 0 instead.

Example: 

Input: s = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: the subarray [4,3] has the minimal length under the problem constraint.
Follow up:
If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log n).  */

//using slider window algorithim
const minSubarrayLen = function(s, nums){
    let L = 0, R = 0, total = nums[L], distance = nums.length + 1;
    while(R < nums.length){
        if(total < s){
            total += (nums[++R] || 0);
        }else{
            total -= nums[L];
            distance = Math.min(distance, R - L + 1);
            L++;
        }
    }

    return distance <= nums.length ? distance : 0;
}

console.log(minSubarrayLen(7, [2,3,1,2,4,3, 7]));