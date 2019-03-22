var twoSum = function(nums, target) {
    var numMap = {};
    for(var i = 0; i < nums.length; i++){
        numMap[nums[i]] = i;
    }

    console.log(numMap);
    
    for(var i = 0; i < nums.length; i++){
        var first = nums[i];
        var second = target - first;
       
        if(numMap[second] !== undefined && numMap[second] !== i){
            return [i, numMap[second]]
        }
    }
    
    return null;
};

console.log(twoSum([3,2,4], 6))