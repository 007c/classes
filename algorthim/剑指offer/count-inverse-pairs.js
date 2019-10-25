//统计数组中的逆序对

/**
 * 运用归并排序的思想，在合并左右子数组时统计逆序对的数目
 * @param {number[]} numbers 
 * @param {number} start 
 * @param {number} end 
 */
function countInverseParis(numbers, start, end) {
    if (start >= end) {
        return 0;
    }

    const middle = start + Math.floor((end - start) / 2);

    let left = countInverseParis(numbers, start, middle);
    let right = countInverseParis(numbers, middle + 1, end);

    let count = countParis(numbers, start, middle, end);

    return left + right + count;
}

/**
 * 合并子数组并统计逆序对的数量
 * @param {*} numbers 
 * @param {*} left 
 * @param {*} middle 
 * @param {*} right 
 */
function countParis(numbers, left, middle, right) {
    let leftcopy = [], rightcopy = [];
    let count = 0;
    for (let i = left; i <= middle; i++) {
        leftcopy.push(numbers[i]);
    }

    for (let i = middle + 1; i <= right; i++) {
        rightcopy.push(numbers[i]);
    }

    let leftEnd = leftcopy.length - 1, rightEnd = rightcopy.length - 1;
    //从子数组的末端开始合并
    while (leftEnd >= 0 && rightEnd >= 0) {
        //如果左边的子数组项 > 右边， 则右边末尾索引前的数都小于左边子数组的
        //当前索引项， 则存在 rightEnd + 1个逆序对
        if (leftcopy[leftEnd] > rightcopy[rightEnd]) {
            count += rightEnd + 1;
            numbers[right--] = leftcopy[leftEnd--];
        } else {
            numbers[right--] = rightcopy[rightEnd--];
        }
    }
    for (; leftEnd >= 0; leftEnd--) {
        numbers[right--] = leftcopy[leftEnd];
    }
    for (; rightEnd >= 0; rightEnd--) {
        numbers[right--] = rightcopy[rightEnd];
    }

    return count;
}

var testSq = [7, 5, 6, 4], testSq1 = [1, 2, 3, 4, 5], testSq3 = [1];

console.log(countInverseParis(testSq, 0, testSq.length - 1));
console.log(countInverseParis(testSq1, 0, testSq1.length - 1));
console.log(countInverseParis(testSq3, 0, testSq3.length - 1));
