
//输入一个整数数组，实现一个函数调整数组的顺序使得所有奇数位于数组的前半部分，偶数位于数组的后半部分
const arr = [1, 5, 8, 88, 4, 87, 3, 48, 4, 78, 65, 487, 7, 97]

function reorderOddEven(arr) {
    let start = 0, end = arr.length - 1;

    while (start < end) {
        while (start < end && arr[start] % 2 === 1) {
            start++;
        }

        while (start < end && arr[end] % 2 === 0) {
            end--;
        }

        let tmp = arr[start];
        arr[start] = arr[end];
        arr[end] = tmp;
        start++;
        end--;
    }
}

reorderOddEven(arr)
console.log(arr)

//  扩展 可实现多种情况下对于数据的分组
//  抽象出判断条件
function divide(arr, func) {
    let start = 0, end = arr.length - 1;

    while (start < end) {
        while (start < end && func(arr[start])) {
            start++;
        }

        while (start < end && !func(arr[end])) {
            end--;
        }

        let tmp = arr[start];
        arr[start] = arr[end];
        arr[end] = tmp;
        start++;
        end--;
    }
}
const positiveOrNeginativeArr = [3, -1, 2, -4, 8, 15];
divide(positiveOrNeginativeArr, function (num) { return num < 0 });
console.log(positiveOrNeginativeArr)

const oddOrEvenArr = [3,5,8,87,64,87,64,8,74,46]
divide(oddOrEvenArr, function (num) { return num % 2 === 1 });
console.log(oddOrEvenArr)