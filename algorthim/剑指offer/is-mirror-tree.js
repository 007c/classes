

//判断一颗二叉树是不是另一颗二叉树的镜像

const utils = require('../../utils');

const { buildBinaryTree } = utils;


const tree = buildBinaryTree([1, 2, 3, 4, 5, 6, 7]);
const mirrorTree = buildBinaryTree([1, 3, 2, 7, 6, 5, 4]);

console.log(tree, mirrorTree)


function isMirrorTree(tree, mirrorTree) {
    if (!tree && !mirrorTree) {
        return true;
    }

    if (!tree || !mirrorTree) {
        return false;
    }

    if (tree.val !== mirrorTree.val) {
        return false;
    }

    return isMirrorTree(tree.left, mirrorTree.right) && isMirrorTree(tree.right, mirrorTree.left)
}

console.log(isMirrorTree(tree, mirrorTree))