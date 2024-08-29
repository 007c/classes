function solution(m, n) {
    // f(m, n) = f(m - 1, n) + f(m, n - 1);
    // f(1, 1) = 1;
    const dp = [];
    for(let i = 0; i < m; i++) {
        dp[i] = [1]
    }

    for(let j = 0; j < n; j++) {
        dp[0][j] = 1
    }



    for(let i = 1; i < m; i++) {
        if(!dp[i]) {
            dp[i] = []
        }
        for(let j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }

    console.log(dp)
    return dp[m - 1][n - 1];
}

console.log(solution(4, 6));