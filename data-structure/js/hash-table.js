var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("link-list", ["require", "exports"], function (require, exports) {
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
});
define("hash-table", ["require", "exports", "link-list"], function (require, exports, link_list_1) {
    "use strict";
    exports.__esModule = true;
    var NodeItem = /** @class */ (function (_super) {
        __extends(NodeItem, _super);
        function NodeItem(key, val) {
            var _this = _super.call(this, val) || this;
            _this.key = key;
            return _this;
        }
        return NodeItem;
    }(link_list_1.ListNode));
    var HashTable = /** @class */ (function () {
        function HashTable() {
            this.items = {};
        }
        HashTable.prototype.put = function (key, value) {
            var hashCode = this.hashCode(key);
            this.items[hashCode] = value;
        };
        HashTable.prototype.hashCode = function (key) {
            var hash = 0;
            for (var i = 0; i < key.length; i++) {
                hash += key[i].charCodeAt(0);
            }
            hash %= 37;
            return hash;
        };
        HashTable.prototype.get = function (key) {
            var hashCode = this.hashCode(key);
            return this.items[hashCode];
        };
        HashTable.prototype.remove = function (key) {
            var hashCode = this.hashCode(key);
            delete this.items[hashCode];
        };
        return HashTable;
    }());
    var HashTableSpreadChain = /** @class */ (function (_super) {
        __extends(HashTableSpreadChain, _super);
        function HashTableSpreadChain() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HashTableSpreadChain.prototype.put = function (key, value) {
            var hashCode = this.hashCode(key);
            if (!this.items[hashCode]) {
                this.items[hashCode] = new link_list_1.LinkList();
            }
            var current = this.items[hashCode].head;
            var node = new NodeItem(key, value);
            if (!current) {
                this.items[hashCode].head = node;
            }
            else {
                while (current.next) {
                    if (current.key === key) {
                        current.val = value;
                        return;
                    }
                    current = current.next;
                }
                current.next = node;
            }
        };
        return HashTableSpreadChain;
    }(HashTable));
    var hashTable = new HashTable();
    hashTable.put('zzp', 25);
    hashTable.put('lihongwang', 45);
    hashTable.put('yihuli', 36);
    hashTable.put('Sue', 38);
    hashTable.put('Aethelwulf', 98);
    console.log(hashTable.get('zzp'));
    console.log(hashTable.get('yihuli'));
    console.log(hashTable.get('wangmuba'));
    console.log(hashTable.get('Sue'));
    console.log(hashTable.get('Aethelwulf'));
});
