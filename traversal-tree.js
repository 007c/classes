var root = { "val": 3, "right": null, "left": { "val": 9, "right": { "val": 4, "right": { "val": 7, "right": null, "left": null }, "left": { "val": 15, "right": null, "left": null } }, "left": null } };


function recurTraversal(root) {
    if (!root) {
        return;
    }

    console.log('recursor', root.val);
    recurTraversal(root.left);
    recurTraversal(root.right);
}

recurTraversal(root)

//前序遍历
function traversal(root) {
    let rightStack = [];
    let node = root;

    while (node || rightStack.length !== 0) {
        if (!node) {
            node = rightStack.pop();
            continue;
        }
        console.log(node.val);
        rightStack.push(node.right);
        node = node.left;
    }
}

//中序遍历递归版
function recurLeveOrderTraversal(root) {
    if (!root) {
        return;
    }

    recurLeveOrderTraversal(root.left);
    console.log('recurLeveOrderTraversal: ', root.val);
    recurLeveOrderTraversal(root.right);
}

//中序遍历
function leveOrderTraversal(root) {
    // let leftStack = [];
    // let rightStack = [];
    let node = root;
    let stack = [];
    while (stack.length !== 0 || node) {
        if (node) {
            stack.push(node);
            node = node.left;
        }
        if (!node) {
            node = stack.pop();
            if (node) {
                console.log('leveOrderTraversal', node.val);
                node = node.right;
            }
        }
    }
}

traversal(root)
leveOrderTraversal(root)
recurLeveOrderTraversal(root)

//postOrderTraversal(root)