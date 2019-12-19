// 统计一个数字在排序数组中出现的次数;

/**
 * 找到一个数在排序数组中第一次出现的位置
 * @param {number[]} numbers 
 * @param {number} target
 */
function getFirstIndex(numbers, target) {
    let start = 0; end = numbers.length - 1;

    while (start <= end) {
        let middle = start + Math.floor((end - start) / 2);
        if (numbers[middle] === target) {
            if (middle === 0 || numbers[middle - 1] !== target) {
                return middle;
            }

            end = middle - 1;
        } else if (numbers[middle] > target) {
            end = middle - 1;
        } else {
            start = middle + 1;
        }
    }

    return -1;
}

/**
 * 找到一个数在排序数组中最后一次出现的位置
 */
function getLastKindex(numbers, target) {
    let start = 0; end = numbers.length - 1;
    while (start <= end) {
        let middle = start + Math.floor((end - start) / 2);
        if (numbers[middle] === target) {
            if (middle === numbers.length - 1 || numbers[middle + 1] !== target) {
                return middle
            }

            start = middle + 1;
        } else if (numbers[middle] > target) {
            end = middle - 1;
        } else {
            start = middle + 1;
        }
    }

    return -1;
}


function countKInSortedArray(numbers, target) {
    let start = getFirstIndex(numbers, target),
        end = getLastKindex(numbers, target);
    if (start >= 0 && end >= 0) {
        return end - start + 1;
    }

    return 0;
}

const testSq = [1, 2, 3, 3, 3, 3, 5, 7, 8], testSq1 = [1]

console.log(countKInSortedArray(testSq, 3))
console.log(countKInSortedArray(testSq1, 2))