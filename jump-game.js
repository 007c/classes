/**
 * 
 * 55. Jump Game
    Medium
    Given an array of non-negative integers, you are initially positioned at the first index of the array.

    Each element in the array represents your maximum jump length at that position.

    Determine if you are able to reach the last index.

    Example 1:

    Input: [2,3,1,1,4]
    Output: true
    Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
    Example 2:

    Input: [3,2,1,0,4]
    Output: false
    Explanation: You will always arrive at index 3 no matter what. Its maximum
    jump length is 0, which makes it impossible to reach the last index.
 */


/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    if (nums.length <= 1) {
        return true;
    }
    //find all zeros index;
    const zeroPositions = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            zeroPositions.push(i);
        }
    }


    for (let i = 0; i < zeroPositions.length; i++) {
        let canJump = false
        for (let j = 0; j < zeroPositions[i]; j++) {
            // if jump length minus the offset between zero and num great than zero
            // or can reach the eage then can jump it over
            if (j + nums[j] - zeroPositions[i] > 0 || (zeroPositions[i] === nums.length - 1 && j + nums[j] - zeroPositions[i] === 0)) {
                canJump = true;
            }
        }
        if (!canJump) {
            return false;
        }
    }

    return true;
};