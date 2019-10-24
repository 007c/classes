//找到数组中出现次数超过一半的数字

//count
/**
 * 计数法求解
 * 当我们遍历到下一个数字的时候，如果跟之前保存的数字相同，则次数+1， 否则 -1
 * 如果次数为0, 则重新保存数字， 因为要找的数字比其他所有数字之和还要多， 所以
 * 最后保存的数字即为我们要找的数字
 * @param {number[]} numbers 
 */
function findMorethanHalf(numbers) {
    if (numbers.length <= 0) {
        return null;
    }
    let times = 1, ret = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        if (times === 0) {
            times = 1;
            ret = numbers[i];
        } else if (numbers[i] === ret) {
            times++;
        } else {
            times--;
        }
    }

    return ret;
}

const testSq = [1, 3, 2, 5, 4, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1]

console.log(findMorethanHalf(testSq))