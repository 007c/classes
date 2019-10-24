const partition = require("../剑指offer/partition");

function newQuickSort(arr, start, end) {
    if (start >= end) {
        return;
    }

    let baseIndex = partition(arr, start, end);
    newQuickSort(arr, start, baseIndex - 1);
    newQuickSort(arr, baseIndex + 1, end);
}

var arr = [2, 15, 2, 5, 20, 14, 3, 8, 4, 8, 5, 41, 585, 25]
newQuickSort(arr, 0, arr.length - 1)

console.log(arr);