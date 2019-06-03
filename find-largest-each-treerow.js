/**
 * 
    515. Find Largest Value in Each Tree Row
    Medium

    487

    44

    Favorite

    Share
    You need to find the largest value in each row of a binary tree.

    Example:
    Input: 

            1
            / \
            3   2
        / \   \  
        5   3   9 

    Output: [1, 3, 9]
 */

 /**
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function(root) {
    let ans = [];
    const findMax = function(treeNode, depth){
        if(!treeNode){
            return;
        }
        if(ans[depth] === undefined || ans[depth] < treeNode.val){
            ans[depth] = treeNode.val;
        }
        findMax(treeNode.left, depth+1);
        findMax(treeNode.right, depth+1);
    }
    findMax(root, 0);
    return ans;
};