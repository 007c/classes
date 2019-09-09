/**
 * 79. Word Search
    Medium

    2153

    109

    Favorite

    Share
    Given a 2D board and a word, find if the word exists in the grid.

    The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

    Example:

    board =
    [
    ['A','B','C','E'],
    ['S','F','C','S'],
    ['A','D','E','E']
    ]

    Given word = "ABCCED", return true.
    Given word = "SEE", return true.
    Given word = "ABCB", return false.
 */


 //dfs solution
 /**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    let row = board.length, col = board[0].length;
    if(word.length > row * col) {
        return false;
    }
    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            if(search(board, i, j, word, 0)){
                return true;
            }
        }
    }
    
    
    
    function search(board, i, j, word, index, has) {
                
        if(i >= board.length || j >= board[0].length || i < 0 || j < 0) {
            return false;
        }

        
        if(board[i][j] !== word[index]) {
            return false;
        }
        
        if(index === word.length - 1) {
            return true;
        }   
        
        let ch = board[i][j]
        board[i][j] = "*";
            const dirs = [[0, -1], [0, 1], [1, 0], [-1, 0]];
            for(const [iadd, jadd] of dirs){
                let row = i + iadd, col = j + jadd;
                   if(search(board, row, col, word, index + 1)) {
                       return true
                   }
            }
        board[i][j] = ch;
        return false;
    }
    return false
};