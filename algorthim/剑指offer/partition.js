function swap(arr, left, right) {
    if (left === right) {
        return;
    }
    let tmp = arr[left];
    arr[left] = arr[right];
    arr[right] = tmp;
}

//partation 用于将数组内所有比基准值小的移到它的左边，
//比它大的移动到右边，并返回新的拆分位置，以便递归的运行 quickSort;
module.exports = function partition(arr, start, end) {
    let base = arr[end];
    for (let i = start; i <= end; i++) {
        if (arr[i] < base) {
            swap(arr, i, start);
            start++;
        }
    }
    //将base 移动到 合适的位置使得数组满足结构 left < base <= right
    swap(arr, start, end);
    return start;
}