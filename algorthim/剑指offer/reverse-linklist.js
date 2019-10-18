const utils = require('../../utils');

const { buildLinkList, makeIntegerArray } = utils;

const list = buildLinkList([1, 2, 3, 4, 5]);

//console.log(list);

function reverseLinklist(linklist) {
    let pre = null, cur = linklist;
    while (cur) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }

    return pre;
}

function reverseLinklistRecurserly(linklist, pre) {
    if (!linklist) {
        return pre;
    }
    let next = linklist.next;
    linklist.next = pre;

    return reverseLinklistRecurserly(next, linklist);
}

//console.log(reverseLinklist(list))

//console.log(reverseLinklist(null))
var newList = reverseLinklistRecurserly(list, null);
console.log('newList：', newList);