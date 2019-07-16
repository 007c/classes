/**
    19. Remove Nth Node From End of List
    Medium

    1951

    145

    Favorite

    Share
    Given a linked list, remove the n-th node from the end of list and return its head.

    Example:

    Given linked list: 1->2->3->4->5, and n = 2.

    After removing the second node from the end, the linked list becomes 1->2->3->5.
    Note:

    Given n will always be valid.

    Follow up:

    Could you do this in one pass? 
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    // const cache = [];
    // let current = head;
    // while(current){
    //     cache.push(current);
    //     current = current.next;
    // }
    // let len = cache.length;
    // if(len == n){
    //     return head.next;
    // }
    // cache[len - n - 1].next = cache[len - n + 1];
    // return head;
    let cur = head;
    while(n--){
        cur = cur.next;
    }
    let newCur = head;
    let prev = null;
    while(cur){
        prev = newCur;
        newCur = newCur.next;
        cur = cur.next;
    }
    if(!prev){
        return head.next;
    }
    prev.next = newCur.next;
    return head;
};