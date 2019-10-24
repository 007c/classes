//找出数组中所有子数组的和的最大值

function continousSubarrayMaxSum(numbers) {
    if (numbers.length <= 0) {
        return 0;
    }

    let max = numbers[0], sum = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        if (sum + numbers[i] < numbers[i]) {
            sum = numbers[i];
        } else {
            sum += numbers[i];
        }
        max = Math.max(max, sum);

    }
    return max;
}

const testSq = [1, -2, 3, 10, -4, 7, 2, -5]
console.log(continousSubarrayMaxSum(testSq))