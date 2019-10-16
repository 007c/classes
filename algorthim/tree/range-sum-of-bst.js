/*
Given the root node of a binary search tree, return the sum of values of all nodes with value between L and R (inclusive).

The binary search tree is guaranteed to have unique values.

 

Example 1:

Input: root = [10,5,15,3,7,null,18], L = 7, R = 15
Output: 32
Example 2:

Input: root = [10,5,15,3,7,13,18,1,null,6], L = 6, R = 10
Output: 23
*/


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
/** it's looks like a easy level problem, but tagged as medium */
var rangeSumBST = function(root, L, R) {
    let total = 0;
    const search = function(treeNode){
        if(!treeNode){
            return;
        }
        
        if(treeNode.val > R){
            search(treeNode.left);
        }else if(treeNode.val < L){
            search(treeNode.right);
        }else{
            search(treeNode.left);
            search(treeNode.right);
            total += treeNode.val;
        }
    }
    
    search(root);
    return total;
};