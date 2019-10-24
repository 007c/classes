// 将二叉搜索树转换为双向链表

const utils = require('../../utils');

const { buildBinaryTree } = utils;

let tree = buildBinaryTree([10, 6, 14, 4, 8, 12, 16])

//console.log(tree)

function convertBSTToDBLinklist(tree) {
    //keep preNode reference
    let preNode = null;
    let head = null;
    convert(tree);
    function convert(tree) {
        if (!tree) {
            return;
        }
        const currentNode = tree;
        convert(tree.left);
        currentNode.left = preNode;
        if (preNode) {
            preNode.right = currentNode;
        }
        preNode = currentNode;
        convert(tree.right);
        if (!head) {
            head = currentNode;
        }
    }

    return head
}
let head = convertBSTToDBLinklist(tree)
console.log(head);


while (head) {
    console.log(head.val);
    head = head.right;
}