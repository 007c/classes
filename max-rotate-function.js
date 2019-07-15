/**
    396. Rotate Function
    Share
    Given an array of integers A and let n to be its length.

    Assume Bk to be an array obtained by rotating the array A k positions clock-wise, we define a "rotation function" F on A as follow:

    F(k) = 0 * Bk[0] + 1 * Bk[1] + ... + (n-1) * Bk[n-1].

    Calculate the maximum value of F(0), F(1), ..., F(n-1).

    Note:
    n is guaranteed to be less than 105.

    Example:

    A = [4, 3, 2, 6]

    F(0) = (0 * 4) + (1 * 3) + (2 * 2) + (3 * 6) = 0 + 3 + 4 + 18 = 25
    F(1) = (0 * 6) + (1 * 4) + (2 * 3) + (3 * 2) = 0 + 4 + 6 + 6 = 16
    F(2) = (0 * 2) + (1 * 6) + (2 * 4) + (3 * 3) = 0 + 6 + 8 + 9 = 23
    F(3) = (0 * 3) + (1 * 2) + (2 * 6) + (3 * 4) = 0 + 2 + 12 + 12 = 26

    So the maximum value of F(0), F(1), F(2), F(3) is F(3) = 26.
 */

/**
 * @param {number[]} A
 * @return {number}
 */
var maxRotateFunction = function(A) {
    let lastSum = 0, len = A.length, n = 1, sum = 0;
    for(let i = 0; i < len; i++){
        lastSum += i * A[i];
        sum += A[i];
    }
    
    //f(n) = f(n - 1) + sum - length * A[length - n];
    let max = lastSum;
    while(n < len){
      lastSum = (lastSum + sum - (len) * A[len - n]);
      max = Math.max(max, lastSum)
      n++
    }
    
    return max;
};