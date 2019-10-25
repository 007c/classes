//输入一个数组， 数组中其他数字都出现了两次， 除了两个数字
// 找出这两个数字

function findTwoNumsAppearOnce(numbers) {
    if (numbers.length < 2) {
        return numbers;
    }
    let xorRet = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        xorRet = xorRet ^ numbers[i];
    }

    let bit = 0;
    while (xorRet) {
        if (xorRet & 1 === 1) {
            break;
        }
        xorRet = xorRet >>> 1;
        bit++;
    }

    let part1 = [], part2 = [];

    for (let i = 0; i < numbers.length; i++) {
        if ((numbers[i] >>> bit) & 1 === 1) {
            part1.push(numbers[i]);
        } else {
            part2.push(numbers[i]);
        }
    }

    let ret = [];
    let part1Xor = part1[0];
    let part2Xor = part2[0]
    for (let i = 1; i < part1.length; i++) {
        part1Xor = part1Xor ^ part1[i];
    }

    ret.push(part1Xor)
    for (let i = 1; i < part2.length; i++) {
        part2Xor = part2Xor ^ part2[i];
    }

    ret.push(part2Xor)

    return ret;
}

const testSq = [2, 4, 3, 6, 3, 2, 5, 5]

console.log(findTwoNumsAppearOnce(testSq))