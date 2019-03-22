var searchInsert = function(nums, target) {
    var start = 0;
    var end = nums.length;
    
    while(start < end){
        var middle = Math.floor(start + (end - start)/2);
        if(nums[middle] >= target){
            end = middle;
        }else{
            start = middle + 1;
        }
    }
    
    return start;
};

console.log(searchInsert([1,3,5,6], 2))