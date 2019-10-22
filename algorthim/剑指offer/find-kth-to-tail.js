
//找到一个链表的倒数第k个元素
const utils = require('../../utils');

const { buildLinkList } = utils;

function findKthToTail(linkList, k) {
    if (!linkList || k <= 0) {
        return null;
    }

    let kthNode = linkList;
    for (let i = 0; i < k - 1; i++) {
        kthNode = kthNode.next;
        if (!kthNode) {
            return null;
        }
    }

    let head = linkList;

    while (kthNode.next) {
        kthNode = kthNode.next;
        head = head.next;
    }

    return head;
}

var list = buildLinkList([1, 2, 3, 4, 5, 6]);

console.log(findKthToTail(list, 0));

console.log(findKthToTail(list, 3));

console.log(findKthToTail(list, 7));