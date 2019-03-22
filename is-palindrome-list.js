var isPalindrome = function(head) {
    if(!head){
        return false;
    }
    
    let fast = head;
    let slow = head;
    while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next;
    }
    
    //now slow is half of list;
    //and we should reverse the slow list
    let prev = null;
 
    while(slow){
        let tmp = slow.next;
        slow.next = prev;
        prev = slow;
        slow = tmp;
    }
    let current = head;
    while(prev){
        if(prev.val !== current.val){
            return false;
        }
        
        current = current.next;
        prev = prev.next;
    }
    
    return true;
};
var list = {"val":1,"next":{"val":2,"next":{"val":2,"next":{"val":1,"next":null}}}}
console.log(isPalindrome(list))