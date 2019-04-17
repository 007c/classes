var levelOrderBottom = function (root) {
    let output = [];
    let getNodeVal = function (leftNode, rightNode) {
        let pushItem = [];
        if (!leftNode && !rightNode) {
            return [];
        }
        if (leftNode && !rightNode) {
            return [leftNode.val];
        }

        if (rightNode && !leftNode) {
            return [rightNode.val];
        }

        let left = getNodeVal(leftNode.left, leftNode.right);
        let right = getNodeVal(rightNode.left, rightNode.right);
        pushItem = left.concat(right);
        pushItem.length !== 0 && output.push(pushItem)
        return [leftNode.val, rightNode.val];
    }
    getNodeVal(root.left, root.right)
    return output;
};
var root = { "val": 3, "right": null, "left": { "val": 9, "right": { "val": 4, "right": { "val": 7, "right": null, "left": null }, "left": { "val": 15, "right": null, "left": null } }, "left": null } };
console.log(levelOrderBottom(root));