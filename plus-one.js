var plusOne = function (digits) {
    digits[digits.length - 1] += 1;
    for (var i = digits.length - 1; i >= 0; i--) {
        if (digits[i] >= 10) {
            digits[i] -= 10;
            i > 0 && (digits[i - 1] += 1);
        }
        if (digits[0] === 0) {
            digits.unshift(1);
        }
    }
    return digits;
};

console.log(plusOne([9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,4,5,6,9, 7, 7, 7]))