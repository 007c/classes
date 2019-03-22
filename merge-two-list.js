function ListNode(val) {
    this.val = val;
    this.next = null;
}

var mergeTwoLists = function (l1, l2) {

    if (l1 == null && l2 == null) {
        return null;
    }
    if (!l1) {
        return l2;
    }

    if (!l2) {
        return l1;
    }
    var l1_next = l1;
    var l2_next = l2;
    var firstNode;

    if (l1.val < l2.val) {
        firstNode = l1;
        l1_next = l1.next;
    } else {
        firstNode = l2;
        l2_next = l2.next;
    }

    var list = new ListNode(firstNode.val);
    var cur = list;
    while (l1_next !== null || l2_next !== null) {
        var val;
        console.log('l1_next', l1_next)
        console.log('l2_next', l2_next)
        console.log(list)
        if (l1_next === null) {

            val = l2_next.val;
            l2_next = l2_next.next;
            cur.next = new ListNode(val);
            cur = cur.next;
            continue;
        }

        if (l2_next === null) {
            val = l1_next.val;
            l1_next = l1_next.next;
            cur.next = new ListNode(val);
            cur = cur.next
            continue;
        }

        if (l1_next.val < l2_next.val) {
            val = l1_next.val;
            l1_next = l1_next.next;
        } else {
            val = l2_next.val;
            l2_next = l2_next.next;
        }

        cur.next = new ListNode(val);
        cur = cur.next;
    }

    return list;
};

var l1 = {
    val: 1,
    next: {
        val: 2,
        next: null
    }
}


var l2 = {
    val: 2,
    next: {
        val: 3,
        next: null
    }
}

console.log(mergeTwoLists(l1, l2));