
//判断一个树是不是另一颗树的子树
const utils = require('../../utils');

const { buildBinaryTree } = utils;


const tree = buildBinaryTree([1, 2, 3, 4, 5, 6, 7, 8]);
const subTree = buildBinaryTree([2, 4, 5]);

console.log(tree, subTree)

function hasSubTree(tree, subTree) {
    if (!tree || !subTree) {
        return false;
    }

    let ret = false;
    if (tree.val === subTree.val) {
        ret = hasSameStruct(tree, subTree);
    }

    if (!ret) {
        ret = hasSubTree(tree.left, subTree);
    }

    if (!ret) {
        ret = hasSubTree(tree.right, subTree);
    }

    return ret;
}

function hasSameStruct(tree, subTree) {
    if (!subTree) {
        return true;
    }

    if (!tree) {
        return false;
    }

    if (tree.val !== subTree.val) {
        return false;
    }

    return hasSameStruct(tree.left, subTree.left) && hasSameStruct(tree.right, subTree.right);
}

console.log('does tree has subtree: ', hasSubTree(tree, subTree));
console.log('does tree has subtree: if subtree is "NULL"', hasSubTree(tree, null))