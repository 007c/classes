/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    const ret = [];
    let cur = head;
    while(cur) {
        ret.push(cur);
        cur = cur.next;
    }
    
    let newHead = ret.shift();
    while(ret.length != 0 && newHead) {
        newHead.next = ret.pop();
        newHead = newHead.next;
        if(newHead && ret.length !== 0) {
            newHead.next = ret.shift();
            newHead = newHead.next;
        }
    }

    newHead.next = null;
    
    return head;
};

reorderList({val: 1, next: {val: 2, next: {val: 3, next: {val: 4, next: null}}}})
console.log('reorderList({val: 1, next: {val: 2, next: {val: 3, next: {val: 4, next: null}}}}): ', JSON.stringify(reorderList({val: 1, next: {val: 2, next: {val: 3, next: {val: 4, next: null}}}})));