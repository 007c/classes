//找到数组中最小的k个数子;

const partition = require("./partition")
const { makeIntegerArray } = require("../../utils");
/**
 * O(n * k) 的解决办法， 借鉴快速排序的partation函数分离位置 k，但会改变原数组
 * @param {*} numbers 
 * @param {*} k 
 */
function findKLessNumbers(numbers, k) {
    if (numbers.length === 0) {
        return;
    }

    if (numbers.length <= k) {
        return numbers;
    }

    let index = numbers.length - 1, end = numbers.length - 1, start = 0;

    while (index !== k - 1) {
        index = partition(numbers, start, end);
        if (index > k - 1) {
            end = index - 1;
        } else {
            start = index + 1;
        }
    }

    return numbers.slice(0, k);
}

let testSq = makeIntegerArray(10, 1, 15);

console.log(testSq);

console.log(findKLessNumbers(testSq, 5));

