var Compare;
(function (Compare) {
    Compare[Compare["BIGGER_THAN"] = 0] = "BIGGER_THAN";
    Compare[Compare["EQUAL"] = 1] = "EQUAL";
    Compare[Compare["LESS_THAN"] = 2] = "LESS_THAN";
})(Compare || (Compare = {}));
function swap(source, from, to) {
    if (from === to) {
        return;
    }
    var tmp = source[from];
    source[from] = source[to];
    source[to] = tmp;
}
var MinHeap = /** @class */ (function () {
    function MinHeap(compareFn) {
        this.compareFn = compareFn;
        this.heap = [];
    }
    MinHeap.prototype.getLeftIndex = function (index) {
        return 2 * index + 1;
    };
    MinHeap.prototype.getRightIndex = function (index) {
        return 2 * index + 2;
    };
    MinHeap.prototype.getParentIndex = function (index) {
        return Math.floor((index - 1) / 2);
    };
    MinHeap.prototype.insert = function (val) {
        this.heap.push(val);
        this.siftUp(this.heap.length - 1);
    };
    MinHeap.prototype.extract = function () { };
    MinHeap.prototype.findMinNum = function () { };
    // 移动新插入的值， 直到父节点小于这个插入的值
    MinHeap.prototype.siftUp = function (index) {
        var parentIndex = this.getParentIndex(index);
        var compareRet = this.compareFn(this.heap[parentIndex], this.heap[index]);
        while (index > 0 && compareRet === Compare.BIGGER_THAN) {
            swap(this.heap, parentIndex, index);
            index = parentIndex;
            parentIndex = this.getParentIndex(parentIndex);
        }
    };
    return MinHeap;
}());
var compareFn = function (a, b) {
    if (a > b) {
        return Compare.BIGGER_THAN;
    }
    if (a === b) {
        return Compare.EQUAL;
    }
    return Compare.LESS_THAN;
};
var minHeap = new MinHeap(compareFn);
minHeap.insert(2);
minHeap.insert(3);
minHeap.insert(4);
minHeap.insert(5);
minHeap.insert(1);
console.log(minHeap.heap);
