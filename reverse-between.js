/**
    92. Reverse Linked List II
    Share
    Reverse a linked list from position m to n. Do it in one-pass.

    Note: 1 ≤ m ≤ n ≤ length of list.

    Example:

    Input: 1->2->3->4->5->NULL, m = 2, n = 4
    Output: 1->4->3->2->5->NULL 
*/


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function (head, m, n) {
    let count = 1;
    let prev = null;
    let current = head;
    let before = null;
    let rear = head;
    while (current && count <= n) {
        let next;
        if (count < m) {
            before = current;
            current = current.next;
            rear = current;
        } else {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        count++;
    }

    if (!before) {
        head = prev;
    }
    rear.next = current
    if (before) {
        before.next = prev;
    }

    return head;
};