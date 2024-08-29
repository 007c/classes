// mincoins = min(amount - coins[i], mincoins)


function minCoins(coins, amount) {
    const dp = {}
    function solution(amount) {
        if(amount < 0) {
            return -1;
        }
        if(amount == 0) {
            return 0;
        }

        if(dp[amount] !== undefined) {
            return dp[amount];
        }

        let ret = Infinity;
        for(let coin of coins) {
            const sub = solution(amount - coin) + 1;
            if(sub <= 0) {
                continue;
            }
            ret = Math.min(sub, ret);
        }

        return dp[amount] = ret;
    }

    solution(amount);

    return dp[amount];
}

console.log(minCoins([1, 2, 3, 5, 6], 10));