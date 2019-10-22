// 将二叉搜索树转换为双向链表

const utils = require('../../utils');

const { buildBinaryTree } = utils;

let tree = buildBinaryTree([10, 6, 14, 4, 8, 12, 16])

//console.log(tree)

function convertBSTToDBLinklist(tree) {
    //keep preNode reference
    let preNodeWarp = { preNode: null };
    let head = null;
    convert(tree, preNodeWarp);
    function convert(tree, preNodeWarp) {
        if (!tree) {
            return;
        }
        const currentNode = tree;
        let leftNode = tree.left
        convert(leftNode, preNodeWarp);
        currentNode.left = preNodeWarp.preNode;
        if (preNodeWarp.preNode) {
            preNodeWarp.preNode.right = currentNode;
        }
        preNodeWarp.preNode = currentNode;
        convert(tree.right, preNodeWarp);
        if (!head) {
            head = currentNode;
        }
    }

    return head
}
let warp = convertBSTToDBLinklist(tree)
console.log(warp);


while (warp) {
    console.log(warp.val);
    warp = warp.right;
}