// 判断一个输入序列是否是一个二叉搜索树后续遍历的结果

var testSq = [5, 7, 6, 9, 11, 10, 13,12,8], testSq1 = [7, 6, 4, 5], testSq2 = [1, 2, 3, 4, 5], testSq4 = [5,4,3,2,1];

function verifySquenceOfBST(squence, start, end) {
    if (start > end) {
        return false;
    }
    let root = squence[end];
    let i
    for (i = start; i < end; i++) {
        if (squence[i] > root) {
            break;
        }
    }

    let j = i;
    for (; j < end; j++) {
        if (squence[j] < root) {
            return false;
        }
    }

    let left = true;
    //存在左子树
    if (i > start) {
        left = verifySquenceOfBST(squence, start, i - 1)
    }
    let right = true;
    //存在右子树
    if (i < end - 1) {
        right = verifySquenceOfBST(squence, i, end - 1);
    }
    return left && right;
}

console.log(verifySquenceOfBST(testSq, 0, testSq.length - 1));
console.log(verifySquenceOfBST(testSq1, 0, testSq1.length - 1));
console.log(verifySquenceOfBST(testSq2, 0, testSq2.length - 1));
console.log(verifySquenceOfBST(testSq4, 0, testSq4.length - 1));