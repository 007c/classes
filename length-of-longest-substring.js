/**3. Longest Substring Without Repeating Characters
Medium

5202

273

Favorite

Share
Given a string, find the length of the longest substring without repeating characters.

Example 1:

Input: "abcabcbb"
Output: 3 
Explanation: The answer is "abc", with the length of 3. 
Example 2:

Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
Note that the answer must be a substring, "pwke" is a subsequence and not a substring. */

/**
 * @param {string} s
 * @return {number}
 */

 //leetcode 03
 //sliding window
var lengthOfLongestSubstring = function(s) {
    let noRepeatLen = 0, L = 0, R = 0, charMap = {};
    while(R < s.length){
        if(charMap[s[R]] !== undefined && charMap[s[R]] >= L){
            L = charMap[s[R]] + 1;
        }
        noRepeatLen = Math.max(noRepeatLen, R - L+1);
        charMap[s[R]] = R;
        R++;
    }

        return noRepeatLen;
//     let ans = 0, L = 0, R = 0, len = s.length;
//     let chars = {};
//     while(L < len && R < len){
//         if(!chars[s[R]]){
//             chars[s[R]] = true;
//             R++;
//             ans = Math.max(ans, R - L);
//         }else{
//             delete chars[s[L]];
//             L++;
//         }
//     }
    
//     return ans;
};