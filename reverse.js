function reverse(arr){
    let start = 0, end = arr.length - 1;

    while(start < end){
        let tmp = arr[end];
        arr[end] = arr[start];
        arr[start] = tmp;
        start++;
        end--;
    }
}
let arr = [3,6,7,1,123,4,6,71,2,4]
reverse(arr);
console.log(arr)