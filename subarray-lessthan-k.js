/**
 * 
    713. Subarray Product Less Than K
    Medium
    Your are given an array of positive integers nums.

    Count and print the number of (contiguous) subarrays where the product of all the elements in the subarray is less than k.

    Example 1:
    Input: nums = [10, 5, 2, 6], k = 100
    Output: 8
    Explanation: The 8 subarrays that have product less than 100 are: [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6].
    Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.
 */


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
    //using slider window
    if (k <= 1) {
        return 0;
    }
    let left = 0, right = left, count = 0, pro = 1
    while (right < nums.length) {
        pro *= nums[right];
        while (pro >= k) {
            pro /= nums[left];
            left++;
        }

        // for every new num in subarray,
        // it will produce the length of it new subset;
        count += right - left + 1;
        right++;
    }
    return count
};