interface TreeNode {
    value: number;
    left?: TreeNode;
    right?: TreeNode;
}

const buildTree = function (depth: number): TreeNode {
    if (depth <= 0) {
        return null;
    }
    const node = {
        value: Math.floor(depth * 10 + Math.random() * 10),
        left: buildTree(--depth),
        right: buildTree(--depth),
    }

    return node;
}

const tree = buildTree(4);
console.log(tree);

const prevOrderTraversal = function (treeNode: TreeNode): number[] {
    let res: number[] = [];

    function traversal(treeNode: TreeNode) {
        if (!treeNode) {
            return;
        }

        res.push(treeNode.value);
        traversal(treeNode.left);
        traversal(treeNode.right);
    }
    traversal(treeNode);

    return res;
}

const levalOrderTraversal = function (treeNode: TreeNode): number[] {
    let res: number[] = [];

    function traversal(treeNode: TreeNode) {
        if (!treeNode) {
            return;
        }

        traversal(treeNode.left);
        res.push(treeNode.value);
        traversal(treeNode.right);
    }
    traversal(treeNode);
    return res;
}

const preRes = prevOrderTraversal(tree);
const levalRes = levalOrderTraversal(tree);

console.log(preRes, levalRes)

interface Dict {
    [props: string]: number;
}
const buildMap = function (res: number[]): Dict {
    let map = {};
    for (let i = 0; i < res.length; i++) {
        map[res[i]] = i;
    }
    return map;
}
const preResMap = buildMap(preRes);
const levalMap = buildMap(levalRes);

const findRightHeadIndex = function (preRes: number[], levalRes: number[], startIndex: number, endIndex: number) {
    let headIndex = -Infinity;

    for (let i = startIndex; i <= endIndex; i++) {
        let num = levalRes[i];
        headIndex = Math.max(headIndex, preResMap[num]);
    }

    return headIndex;
}
const reconstructorTree = function (
    preRes: number[],
    levalRes: number[],
    headIndex: number,
    headEndIndex: number,
    levalEndIndex: number,
    levalStartIndex: number
): TreeNode {
    if (levalStartIndex > levalEndIndex || headIndex > headEndIndex) {
        return null;
    }
    let headIndexInLeval: number = levalMap[preRes[headIndex]];
    let rightHeadIndex = findRightHeadIndex(preRes, levalRes, levalStartIndex, headIndexInLeval - 1);
    let headNode: TreeNode = {
        value: preRes[headIndex],
        left: reconstructorTree(preRes, levalRes, headIndex + 1, rightHeadIndex, headIndexInLeval - 1, levalStartIndex),
        right: reconstructorTree(preRes, levalRes, rightHeadIndex + 1, headEndIndex, levalEndIndex, headIndexInLeval + 1)
    }

    return headNode;
}

const newTree = reconstructorTree(preRes, levalRes, 0, levalRes.length - 1, levalRes.length - 1, 0);

const treeJson = JSON.stringify(tree);
const newTreeJson = JSON.stringify(newTree);

console.log(treeJson === newTreeJson);