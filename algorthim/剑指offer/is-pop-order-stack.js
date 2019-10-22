// 输入两个整数序列。 第一个表示栈的压入序列， 判断第二个序列是否为栈的弹出序列
// eg: [1, 2, 3, 4, 5], [4, 5, 3, 2, 1] => true
//     [1, 2, 3, 4, 5], [4, 3, 5, 1, 2] => false



const testSq1 = [1, 2, 3, 4, 5], testSq2 = [4, 5, 3, 2, 1], testSq3 = [4, 3, 5, 1, 2];


function isPopOrder(pushSq, popSq) {
    let stack = [];
    let pushStart = 0, popEnd = popSq.length - 1, popStart = 0, pushEnd = pushSq.length - 1;
    while (pushSq[pushStart] !== popSq[popStart]) {
        stack.push(pushSq[pushStart]);
        pushStart++;
    }
    while (popStart <= popEnd) {
        if (popSq[popStart] === pushSq[pushStart]) {
            pushStart++;
        } else if (popSq[popStart] === stack[stack.length - 1]) {
            stack.pop();
        } else {
            return false;
        }
        popStart++;
    }

    return true;
}

console.log(isPopOrder(testSq1, testSq2))
console.log(isPopOrder(testSq1, testSq3))