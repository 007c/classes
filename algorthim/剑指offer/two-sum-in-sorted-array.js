//输入一个已经排序的数组和一个数字s， 从中找两个数， 使得它们的和正好是s;

/**
 * 双指针法， 起始指针从前往后寻找较大值， 末尾指针从后往前寻找较小值
 * 因为数组已经有序， 所以当索引项之和大于target时， 末尾指针向前移
 * 否则起始指针向后移，直到找到目标值
 * @param {number[]} numbers 
 * @param {number} target 
 */
function twoSumInSortedArray(numbers, target) {
    let start = 0, end = numbers.length - 1;
    while (start < end) {
        let ret = numbers[start] + numbers[end];
        if (ret > target) {
            end--;
        } else if (ret < target) {
            start++;
        } else {
            return [numbers[start], numbers[end]];
        }
    }

    return null;
}

const testSq = [1, 2, 4, 7, 11, 15];

console.log(twoSumInSortedArray(testSq, 15));