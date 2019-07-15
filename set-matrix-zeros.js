/**
 * 
    73. Set Matrix Zeroes
    Example 1:

    Input: 
    [
    [1,1,1],
    [1,0,1],
    [1,1,1]
    ]
    Output: 
    [
    [1,0,1],
    [0,0,0],
    [1,0,1]
    ]} matrix 
 */


/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    let isCol = false;
    const rowLen = matrix.length, colLen = matrix[0].length;

    // see if first col needs set
    for(let i = 0; i < rowLen; i++){
        if(matrix[i][0] === 0){
            isCol = true;
        }
    }
    // for constant space solution, 
    // we needs mark grid[row][0] and grid[0][col] to zero 
    // for every grid[row][col] equal zero except row and col on zero index;
 
    for(let i = 0; i < rowLen; i++){
        //mark row and col to 0;
        for(let j = 1; j < colLen; j++){
            if(matrix[i][j] === 0){
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    
    for(let i = 1; i < rowLen; i++){
        for(let j = 1; j < colLen; j++){
            if(matrix[i][0] === 0 || matrix[0][j] === 0){
                matrix[i][j] = 0;
            }
        }
    }
    //if first row needs to be set to zero
    if(matrix[0][0] === 0){
        for(let i = 0; i < colLen; i++){
            matrix[0][i] = 0;
        }
    }
    
    //if first col needs to be set to zero
    if(isCol){
        for(let i = 0; i < rowLen; i++){
            matrix[i][0] = 0;
        }
    }
    
};