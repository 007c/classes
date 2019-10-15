var index = 0;
var buildTree = function (depth) {
    if (depth <= 0) {
        return null;
    }
    var node = {
        value: Math.floor((index++) * 10 + Math.random() * 10),
        left: buildTree(--depth),
        right: buildTree(--depth)
    };
    return node;
};
var tree = buildTree(18);
console.log(tree);
var prevOrderTraversal = function (treeNode) {
    var res = [];
    function traversal(treeNode) {
        if (!treeNode) {
            return;
        }
        res.push(treeNode.value);
        traversal(treeNode.left);
        traversal(treeNode.right);
    }
    traversal(treeNode);
    return res;
};
var levalOrderTraversal = function (treeNode) {
    var res = [];
    function traversal(treeNode) {
        if (!treeNode) {
            return;
        }
        traversal(treeNode.left);
        res.push(treeNode.value);
        traversal(treeNode.right);
    }
    traversal(treeNode);
    return res;
};
var preRes = prevOrderTraversal(tree);
var levalRes = levalOrderTraversal(tree);
console.log(preRes, levalRes);
var buildMap = function (res) {
    var map = {};
    for (var i = 0; i < res.length; i++) {
        map[res[i]] = i;
    }
    return map;
};
var preResMap = buildMap(preRes);
var levalMap = buildMap(levalRes);
var findRightHeadIndex = function (preRes, levalRes, startIndex, endIndex) {
    var headIndex = -Infinity;
    for (var i = startIndex; i <= endIndex; i++) {
        var num = levalRes[i];
        headIndex = Math.max(headIndex, preResMap[num]);
    }
    return headIndex;
};
var reconstructorTree = function (preRes, levalRes, headIndex, headEndIndex, levalEndIndex, levalStartIndex) {
    if (levalStartIndex > levalEndIndex || headIndex > headEndIndex) {
        return null;
    }
    var headIndexInLeval = levalMap[preRes[headIndex]];
    var rightHeadIndex = findRightHeadIndex(preRes, levalRes, levalStartIndex, headIndexInLeval - 1);
    var headNode = {
        value: preRes[headIndex],
        left: reconstructorTree(preRes, levalRes, headIndex + 1, rightHeadIndex, headIndexInLeval - 1, levalStartIndex),
        right: reconstructorTree(preRes, levalRes, rightHeadIndex + 1, headEndIndex, levalEndIndex, headIndexInLeval + 1)
    };
    return headNode;
};
var newTree = reconstructorTree(preRes, levalRes, 0, levalRes.length - 1, levalRes.length - 1, 0);
var treeJson = JSON.stringify(tree);
var newTreeJson = JSON.stringify(newTree);
console.log(treeJson === newTreeJson);
