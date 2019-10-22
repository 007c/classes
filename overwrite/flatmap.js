
function flatMap(arr, mapFunc, depth=1) {
    let ret = [];
    if (depth <= 0) {
        return arr;
    }
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            ret = ret.concat(flatMap(arr[i], mapFunc, depth - 1));
        } else {
            ret.push(mapFunc(arr[i]));
        }
    }

    return ret;
}

var arr = [1, 2, [1, 3], [4, [2, 3, [4, 6]]]];

console.log(flatMap(arr, function (item) { return item * item }));