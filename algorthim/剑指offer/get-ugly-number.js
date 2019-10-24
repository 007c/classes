// 找到n个丑数
// 丑数: 乘法因子中只包含 2,3,5的数字

function getUglyNumbers(n) {
    if (n <= 0) {
        return 0;
    }

    const uglyNumbers = [1];
    let uglyIndex2 = 0, uglyIndex3 = 0, uglyIndex5 = 0;

    while (n > uglyNumbers.length) {
        let nextUglyNumber = Math.min(uglyNumbers[uglyIndex2] * 2, uglyNumbers[uglyIndex3] * 3, uglyNumbers[uglyIndex5] * 5);
        uglyNumbers.push(nextUglyNumber);

        while (uglyNumbers[uglyIndex2] * 2 <= nextUglyNumber) {
            uglyIndex2++;
        }
        while (uglyNumbers[uglyIndex3] * 3 <= nextUglyNumber) {
            uglyIndex3++;
        }
        while (uglyNumbers[uglyIndex5] * 5 <= nextUglyNumber) {
            uglyIndex5++;
        }
    }

    return uglyNumbers;
}

console.log(getUglyNumbers(100))