/**
    238. Product of Array Except Self
    Medium
    Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

    Example:

    Input:  [1,2,3,4]
    Output: [24,12,8,6]
    Note: Please solve it without division and in O(n).

    Follow up:
    Could you solve it with constant space complexity? (The output array does not count as extra space for the purpose of space complexity analysis.)
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    //O(n) space solution

    //const leftRes = [], rightRes = [], res = [];
    // let leftSum = 1, rightSum = 1;
    // for(let i = 0; i < nums.length; i++){
    //     leftSum *= nums[i]
    //     leftRes.push(leftSum)
    // }
    // for(let i = nums.length - 1; i >= 0; i--){
    //     rightSum *= nums[i]
    //     rightRes[i] = rightSum;
    // }
    // console.log(leftRes, rightRes)
    // let len = nums.length - 1;
    // for(let i = 0; i < leftRes.length; i++){
    //     const left = i - 1 < 0 ? 1 : leftRes[i - 1];
    //     const right = i + 1 > len ? 1 : rightRes[i+1];
    //     res.push(left * right);
    // }


    // constant space solution
    const res = []
    let sum = 1, len = nums.length;
    for (let i = 0; i < len; i++) {
        sum *= nums[i];
        res[i] = sum;
    }

    sum = 1;
    for (let i = len - 1; i >= 0; i--) {
        res[i] = i - 1 < 0 ? sum : sum * res[i - 1]
        sum *= nums[i];
    }

    return res;
};