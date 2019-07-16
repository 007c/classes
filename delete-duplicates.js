/**
    82. Remove Duplicates from Sorted List II
    Medium

    Share
    Given a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.

    Example 1:

    Input: 1->2->3->3->4->4->5
    Output: 1->2->5
    Example 2:

    Input: 1->1->1->2->3
    Output: 2->3 
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
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    if(!head){
        return null;
    }
    let slow = head;
    let next = head.next;
    let prev = null;
    while(next && slow){
        if(next.val === slow.val){
            let val = slow.val;
            while(slow && val === slow.val){
                slow = slow.next;
            }
            if(!prev){
                head = slow;
            }else{
                prev.next = slow;
            }
            slow && (next = slow.next)
        }else{
            prev = slow;
            slow = slow.next;
            next = next.next;
        }

    }
    return head;
};