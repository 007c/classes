// 输入一颗树和书中的两个结点， 找到两个结点的最近的公共父节点
// 将问题转化为求链表的首个公共结点
const node1 = {
    "val": 10,
    "left": null, "right": null
};

const node2 = { val: 2, left: null, right: null }
const tree = {
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
            "left": node1,
        }, "right": { "val": 13, "left": node2, "right": null }
    }
}


function findLastCommonNode(tree, node1, node2) {
    const path1 = [], path2 = [];
    getNodePath(tree, node1, path1);
    getNodePath(tree, node2, path2);


    let path1Len = path1.length;
    let path2Len = path2.length;
    let path1Start = 0, path2Start = 0;
    let commonNode;
    while (path1Start < path1Len && path2Start < path2Len) {
        if (path1[path1Start] === path2[path2Start]) {
            commonNode = path1[path1Start];
        }
        path1Start++;
        path2Start++;
    }

    return commonNode;
}

/**
 * 获取从根节点到子节点的路径
 * @param {Tree} tree 
 * @param {TreeNode} node 
 * @param {Array<TreeNode>} path 
 */
function getNodePath(tree, node, path) {
    if (!tree) {
        return false;
    }
    if (tree === node) {
        return true;
    }

    path.push(tree);

    let found = getNodePath(tree.left, node, path)
    if (!found) {
        found = getNodePath(tree.right, node, path);
    }

    if (!found) {
        path.pop();
    }

    return found;
}

console.log(findLastCommonNode(tree, node1, node2))