"use strict";
exports.__esModule = true;
var ListNode = /** @class */ (function () {
    function ListNode(val) {
        this.val = val;
    }
    return ListNode;
}());
exports.ListNode = ListNode;
var LinkList = /** @class */ (function () {
    function LinkList() {
        this.count = 0;
    }
    LinkList.prototype.append = function (node) {
        var current = this.head;
        if (!this.head) {
            this.head = node;
        }
        else {
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    };
    LinkList.prototype.insertBefore = function (node, pos) {
        if (pos < 0) {
            return;
        }
        if (pos > this.count - 1) {
            return this.append(node);
        }
        var current = this.head;
        var prev = null;
        while (pos--) {
            prev = current;
            current = current.next;
        }
        if (!prev) {
            var next = this.head;
            this.head = node;
            node.next = next;
        }
        else {
            prev.next = node;
            node.next = current;
        }
        this.count++;
    };
    LinkList.prototype.getElementAt = function (index) {
        if (index > this.count - 1 || index < 0) {
            return null;
        }
        var current = this.head;
        while (index--) {
            current = current.next;
        }
        return current;
    };
    LinkList.prototype.remove = function (node) {
        var current = this.head;
        var prev = null;
        while (current) {
            if (current === node) {
                if (!prev) {
                    this.head = current.next;
                }
                else {
                    prev.next = current.next;
                }
                this.count--;
                return current;
            }
            prev = current;
            current = current.next;
        }
        return null;
    };
    LinkList.prototype.removeAt = function (pos) {
        if (pos < 0 || pos > this.count - 1) {
            return null;
        }
        // let prev = null, current = this.head;
        // while (pos--) {
        //     prev = current;
        //     current = current.next;
        // }
        // if (!prev) {
        //     this.head = current.next;
        // } else {
        //     prev.next = current.next;
        // }
        var prev = this.getElementAt(pos - 1);
        var current;
        if (!prev) {
            this.head = this.head.next;
            current = this.head;
        }
        else {
            current = prev.next;
            prev.next = current.next;
        }
        this.count--;
        return current;
    };
    LinkList.prototype.size = function () {
        return this.count;
    };
    return LinkList;
}());
exports.LinkList = LinkList;
var linkList = new LinkList();
linkList.append(new ListNode(1));
linkList.append(new ListNode(2));
linkList.append(new ListNode(3));
var node = new ListNode(222);
linkList.insertBefore(node, 0);
console.log(linkList);
linkList.removeAt(0);
console.log(linkList);
console.log(linkList.getElementAt(2));
console.log('remove', linkList.remove(node));
console.log(linkList.getElementAt(2), linkList.size(), linkList);
