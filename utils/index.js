module.exports = {
    makeIntegerArray(count, min, max) {
        let array = [];

        for (let i = 0; i < count; i++) {
            let num = min + Math.round(Math.random() * (max - min));
            array.push(num)
        }

        return array;
    },
    buildLinkList(arr) {
        let head, cur;
        for (let i = 0; i < arr.length; i++) {
            let node = new LinkListNode(arr[i]);
            if (!head) {
                head = node;
                cur = node;
            } else {
                cur.next = node;
                cur = cur.next;
            }
        }

        return head;
    },
    buildBinaryTree(arr) {
        let start = 0, end = arr.length - 1, queue = [], root;
        while (start <= end) {
            let parent = queue.shift();
            let node = new TreeNode(arr[start++]);
            if (!parent) {
                root = node;
                queue.push(root);
            } else {
                parent.left = node;
                parent.right = new TreeNode(arr[start++]);
                queue.push(node);
                queue.push(parent.right);
            }
        }

        return root;
    }
}

// 找到单链表的倒数第N个节点

class LinkListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null
    }
}


