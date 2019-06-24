"use strict";
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
exports.__esModule = true;
var link_list_1 = require("./link-list");
var NodeItem = /** @class */ (function (_super) {
    __extends(NodeItem, _super);
    function NodeItem(key, val) {
        var _this = _super.call(this, key) || this;
        _this.value = val;
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
    HashTable.prototype.entries = function () {
        var keys = Object.keys(this.items);
        var entries = "";
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var item = keys_1[_i];
            entries += item + ': [';
            var head = this.items[item].head;
            while (head) {
                entries += head.val + '=>' + head.value + ',';
                head = head.next;
            }
            entries = entries.slice(0, -1);
            entries += '],';
        }
        return entries.slice(0, -1);
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
        var linkList = this.items[hashCode];
        var current = linkList.head;
        var node = new NodeItem(key, value);
        var nodeIndex = linkList.indexOf(key);
        if (nodeIndex === -1) {
            linkList.append(node);
        }
        else {
            var node_1 = linkList.getElementAt(nodeIndex);
            node_1.value = value;
        }
    };
    HashTableSpreadChain.prototype.get = function (key) {
        var hashCode = this.hashCode(key);
        if (!this.items[hashCode]) {
            return null;
        }
        var head = this.items[hashCode].head;
        while (head) {
            if (head.val === key) {
                return head.value;
            }
            head = head.next;
        }
        return null;
    };
    HashTableSpreadChain.prototype.remove = function (key) {
        var hashCode = this.hashCode(key);
        if (!this.items[hashCode]) {
            return;
        }
        var linkList = this.items[hashCode];
        var nodeIndex = linkList.indexOf(key);
        if (nodeIndex === -1) {
            return;
        }
        linkList.removeAt(nodeIndex);
        if (linkList.isEmpty()) {
            delete this.items[hashCode];
        }
    };
    return HashTableSpreadChain;
}(HashTable));
var hashTable = new HashTableSpreadChain();
hashTable.put('zzp', 25);
hashTable.put('lihongwang', 45);
hashTable.put('yihuli', 36);
hashTable.put('Sue', 38);
hashTable.put('Aethelwulf', 98);
hashTable.put('master', 25);
hashTable.put('master', 28);
console.log(hashTable.entries());
console.log(hashTable.get('zzp'));
console.log(hashTable.get('yihuli'));
console.log(hashTable.get('wangmuba'));
console.log(hashTable.get('Sue'));
console.log(hashTable.get('Aethelwulf'));
console.log(hashTable.get('master'));
hashTable.remove('Aethelwulf');
hashTable.remove('master');
hashTable.remove('Sue');
console.log(hashTable.get('Aethelwulf'));
console.log(hashTable.get('master'));
console.log(hashTable.entries());
