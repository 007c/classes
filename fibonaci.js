function fibo(n) {
    let [a, b] = [0, 1];
    while (n--) {
        [a, b] = [b, a + b];
    }

    return a;
}


//矩阵快速幂 
//  [                        [             [
//    [f(n), f(n - 1)],       [1, 1]         [f(n+1), f(n)],
//                        *             =
//    [f(n-1), f(n - 2)]      [1, 0]         [f(n), f(n - 1)]
//  ]                        ]             ]

function matrixSolution(n) {
    if (n <= 1) {
        return n;
    }
    const matrix = [[1, 1], [1, 0]];
    const mutiple = function (matrixA, matrixB) {
        let res = [[], []];

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                res[i][j] = 0;
                for (let m = 0; m < 2; m++) {
                    res[i][j] += matrixA[i][m] * matrixB[m][j];
                }
            }
        }

        return res;
    }
    const calc = function (n) {
        if (n <= 1) {
            return matrix;
        }
        if (n % 2 === 0) {
            let ret = calc(n / 2);
            return mutiple(ret, ret);
        } else {
            let ret = calc((n - 1) / 2)
            return mutiple(mutiple(ret, ret), matrix);
        }
    }

    let res = calc(n);
    return res[1][0];
}

const MAX = 12000;
console.time('linear');
for (let i = 0; i <= MAX; i++) {
    fibo(MAX)
}
console.timeEnd('linear');

console.time('Matrix');
for (let i = 0; i <= MAX; i++) {
    matrixSolution(i)
}
console.timeEnd('Matrix');
