/**
 * 1091. Shortest Path in Binary Matrix
    Medium

    107

    19

    Favorite

    Share
    In an N by N square grid, each cell is either empty (0) or blocked (1).

    A clear path from top-left to bottom-right has length k if and only if it is composed of cells C_1, C_2, ..., C_k such that:

    Adjacent cells C_i and C_{i+1} are connected 8-directionally (ie., they are different and share an edge or corner)
    C_1 is at location (0, 0) (ie. has value grid[0][0])
    C_k is at location (N-1, N-1) (ie. has value grid[N-1][N-1])
    If C_i is located at (r, c), then grid[r][c] is empty (ie. grid[r][c] == 0).
    Return the length of the shortest such clear path from top-left to bottom-right.  If such a path does not exist, return -1.

    Input: [[0,1],[1,0]]

    Output: 2
 */



 //bfs solution
 /**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function(grid) {
    const maxRow = grid.length - 1, maxCol = grid[0].length - 1;
    if(grid[maxRow][maxCol] !== 0) {
        return -1;
    }
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [1, -1], [1, 1], [-1, 1]];
    let queue = [[0, 0]];
    let step = 0;
    while(queue.length) {
        let copy = queue;
        queue = [];
        for(let item of copy) {
            let [row, col] = item;
            if(row === maxRow && col === maxCol) {
                return ++step;
            }
            if(row < 0 || col < 0 || row > maxRow || col > maxCol ||grid[row][col] !== 0) {
                continue;
            }
            
            grid[row][col] = 1;
            for(const dir of dirs) {
                queue.push([row +dir[0], col +dir[1]])
            }
        }
        step++;
    }
    return -1
};