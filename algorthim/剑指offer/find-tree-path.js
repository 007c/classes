// 输入一个二叉树和一个整数， 输出所有和为这个整数的路径

const utils = require('../../utils');

//const { buildBinaryTree, makeIntegerArray } = utils;
//let tree = buildBinaryTree(makeIntegerArray(12, 4, 15));

let tree = {
    "val": 10,
    "left": {
        "val": 13,
        "left": {
            "val": 7,
            "left": {
                "val": 13,
                "left": null,
                "right": null
            },
            "right": {
                "val": 8,
                "left": null,
                "right": null
            }
        },
        "right": {
            "val": 5,
            "left": {
                "val": 8,
                "left": null,
                "right": null
            },
            "right": {
                "val": 8,
                "left": null,
                "right": null
            }
        }
    },
    "right": {
        "val": 12,
        "left": {
            "val": 5,
            "left": {
                "val": 10,
                "left": null, "right": null
            },
        }, "right": { "val": 13, "left": { val: 2, left: null, right: null }, "right": null }
    }
}

function findTreePath(tree, num) {
    let paths = [];

    if (!tree) {
        return paths;
    }

    find(tree, num, [], paths);

    return paths;
}

function find(tree, num, path, paths) {
    if (num < 0) {
        return;
    }
    path.push(tree.val)

    if (!tree.left && !tree.right && tree.val === num) {
        paths.push([...path])
    }

    if (tree.left) {
        find(tree.left, num - tree.val, path, paths);
    }
    if (tree.right) {
        find(tree.right, num - tree.val, path, paths);
    }

    path.pop();
}

console.log(findTreePath(tree, 37))
console.log(findTreePath(tree, 43))
console.log(findTreePath(tree, 47))
console.log(findTreePath(null, 47))