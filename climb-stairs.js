

//climbStairs(i,n)= climbStairs(i + 1, n) + climbStairs(i + 2, n)

//1 use recursion solution;

const stairs = 42;

const climbStairs = function (n) {
    if (n < 0) {
        return 0;
    }
    if (n === 0) {
        return 1;
    }

    return climbStairs(n - 1) + climbStairs(n - 2);
}
console.time('normal recursion')
console.log(climbStairs(stairs));
console.timeEnd('normal recursion')

//2 smart recursion using map cache;

let has = {};
const smartClimbStairs = function (n) {
    if (n < 0) {
        return 0;
    }
    if (n === 0) {
        return 1;
    }
    if (has[n]) {
        return has[n];
    }
    return has[n] = smartClimbStairs(n - 1) + smartClimbStairs(n - 2);
}
console.time('smart recursion')
console.log(smartClimbStairs(stairs));
console.timeEnd('smart recursion')

//fibonaci solution f(n) = f(n - 1) + f(n - 2);

const dpClimbStairs = function(n){
    let cur = 1, next = 1;
    while(n > 0){
        [cur, next] = [next, cur + next];
        n--;
    }
    return cur;
}

console.time('dp')
console.log(dpClimbStairs(stairs))
console.timeEnd('dp')
