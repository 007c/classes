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
    HashTableSpreadChain.prototype.get = function (key) {
        var hashCode = this.hashCode(key);
        if (!this.items[hashCode]) {
            return null;
        }
        var head = this.items[hashCode].head;
        while (head) {
            if (head.key === key) {
                return head.val;
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
        var head = this.items[hashCode].head;
        var prev = null;
        while (head) {
            if (head.key === key) {
                if (!prev) {
                    this.items[hashCode].head = head.next;
                }
                else {
                    prev.next = head.next;
                }
                return;
            }
            prev = head;
            head = head.next;
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
console.log(hashTable.get('zzp'));
console.log(hashTable.get('yihuli'));
console.log(hashTable.get('wangmuba'));
console.log(hashTable.get('Sue'));
console.log(hashTable.get('Aethelwulf'));
hashTable.remove('Aethelwulf');
console.log(hashTable.get('Aethelwulf'));
