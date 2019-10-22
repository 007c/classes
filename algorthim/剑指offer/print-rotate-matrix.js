// 旋转打印矩阵;

function printRotateMatrix(matrix) {
    if (!matrix) {
        return;
    }
    const rows = matrix.length;
    if (rows <= 0) {
        return;
    }

    const columns = matrix[0].length;
    if (columns <= 0) {
        return;
    }

    let start = 0;
    // 每一圈旋转打印都是以 (start, start)为起点开始,
    // 只要满足 rows > start * 2 && colums > start * 2 就表明还能继续打印
    while (rows > start * 2 && columns > start * 2) {
        printMatrixInCircle(matrix, rows, columns, start);
        start++;
    }

}

/**
 * 打印矩阵以 (start, start) 为起点的一圈
 * @param {Array[][]} matrix 需要打印的矩阵 
 * @param {number} rows 矩阵的行数
 * @param {*} columns 矩阵的列数
 * @param {*} start  起始点
 */
function printMatrixInCircle(matrix, rows, columns, start) {
    const endX = columns - start - 1;
    const endY = rows - start - 1;

    //从左至右打印 -
    if (start <= endX) {
        for (let i = start; i <= endX; i++) {
            console.log(matrix[start][i]);
        }
    }
    //从上至下打印  | 
    if (start < endY) {
        for (let i = start + 1; i <= endY; i++) {
            console.log(matrix[i][endX]);
        }
    }

    //从右至左打印
    if (start < endX && start < endY) {
        for (let i = endX - 1; i >= start; i--) {
            console.log(matrix[endY][i])
        }
    }

    //从下至上打印
    if (start < endY - 1 && start < endX) {
        for (let i = endY - 1; i >= start + 1; i--) {
            console.log(matrix[i][start]);
        }
    }
}

var matrix = [
    [1, 2, 3, 4],
    [10, 11, 12, 5],
    [9, 8, 7, 6]
]


printRotateMatrix(matrix);