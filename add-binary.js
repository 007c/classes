var addBinary = function (a, b) {
    var maxLen = Math.max(a.length, b.length);
    for (var i = 0; i < maxLen; i++) {
        if (!a[i]) {
            a = '0' + a;
        }
        if (!b[i]) {
            b = '0' + b;
        }
    }

    var retArr = [];
    for (var i = maxLen - 1; i >= 0; i--) {
        var numA = parseInt(a[i]);
        var numB = parseInt(b[i]);
        retArr.unshift(numA + numB);
    }

    if (retArr[0] === 2) {
        retArr[0] -= 2;
        retArr.unshift(1);
    }

    for (var i = retArr.length - 1; i >= 0; i--) {
        if (retArr[i] >= 2) {
            retArr[i] -= 2;
            if (retArr[0] === 0) {
                retArr.unshift(1);
            } else {
                retArr[i - 1] += 1;
            }
        }
    }

    return retArr.join('');
};

console.log(addBinary("100", "110010"));