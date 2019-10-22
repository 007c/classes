//合并两个增序的链表为一个新的递增链表
const utils = require('../../utils');

const { buildLinkList, makeIntegerArray } = utils;

const list1 = buildLinkList([1, 3, 5]);
const list2 = buildLinkList([2, 4, 6]);

function mergeTwoLinklistInorder(list1, list2) {
    let p1 = list1, p2 = list2, cur, head;

    while (p1 || p2) {
        let nextNode;
        if (!p1) {
            nextNode = p2;
            p2 = p2.next;
        } else if (!p2) {
            nextNode = p1;
            p1 = p1.next;
        } else if (p1.val > p2.val) {
            nextNode = p2;
            p2 = p2.next;
        } else {
            nextNode = p1;
            p1 = p1.next;
        }

        if (!cur) {
            cur = nextNode;
            head = cur;
        } else {
            cur.next = nextNode;
            cur = cur.next;
        }
    }

    return head;
}

console.log(JSON.stringify(mergeTwoLinklistInorder(list1, list2)))