module.exports = {
    makeIntegerArray(count, min, max){
        let array = [];

        for(let i = 0; i < count; i++){
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
    }
}

// 找到单链表的倒数第N个节点

class LinkListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}


