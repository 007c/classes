const utils = require('./utils');
function fastSort(arr) {
    function sort(arr, left, right) {
        if (left >= right) {
            return;
        }
        let i = left
        let j = right
        let len = arr.length;
        let baseIndex = j;
        let base = arr[baseIndex];
        while (i < j) {

            while (i < j && i < len) {
                if (arr[i] > base) {
                    let tmp = arr[i];
                    arr[i] = arr[baseIndex];
                    arr[baseIndex] = tmp;
                    baseIndex = i;
                    break;
                }
                i++;
            }

            while (j >= 0 && j > i) {
                if (arr[j] < base) {
                    let tmp = arr[j];
                    arr[j] = base;
                    arr[baseIndex] = tmp;
                    baseIndex = j;
                    break;
                }
                j--;
            }
        }

        sort(arr, left, baseIndex - 1);
        sort(arr, baseIndex + 1, right);
    }
    sort(arr, 0, arr.length - 1);
    return arr;
}

let arr = utils.makeIntegerArray(200000, 0, 10);
console.time('run')
fastSort(arr);
console.timeEnd('run')