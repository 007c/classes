enum Compare {
    "BIGGER_THAN",
    "EQUAL",
    "LESS_THAN"
}

interface CompareFn {
    (a: number, b: number): Compare;
}

function swap(source: number[], from: number, to: number) {
    if (from === to) {
        return;
    }

    const tmp = source[from];
    source[from] = source[to];
    source[to] = tmp;
}

class MinHeap {
    compareFn: CompareFn;
    heap: number[];
    constructor(compareFn: CompareFn) {
        this.compareFn = compareFn;
        this.heap = [];
    }

    getLeftIndex(index: number): number {
        return 2 * index + 1;
    }

    getRightIndex(index: number): number {
        return 2 * index + 2;
    }

    getParentIndex(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    insert(val: number) {
        this.heap.push(val);
        this.siftUp(this.heap.length - 1);
    }
    extract() { }
    findMinNum() {
        return this.heap[0];
    }
    // 移动新插入的值， 直到父节点小于这个插入的值
    siftUp(index: number) {
        let parentIndex = this.getParentIndex(index);
        const compareRet = this.compareFn(this.heap[parentIndex], this.heap[index]);
        while (index > 0 && compareRet === Compare.BIGGER_THAN) {
            swap(this.heap, parentIndex, index);
            index = parentIndex;
            parentIndex = this.getParentIndex(parentIndex);
        }
    }
}

const compareFn: CompareFn = function (a, b) {
    if (a > b) {
        return Compare.BIGGER_THAN;
    }

    if (a === b) {
        return Compare.EQUAL;
    }

    return Compare.LESS_THAN;
}

const minHeap = new MinHeap(compareFn);

minHeap.insert(2);
minHeap.insert(3);
minHeap.insert(4);
minHeap.insert(5);
minHeap.insert(1);

console.log(minHeap.heap);
