var longestCommonPrefix = function(strs) {
    var str = '';
    var len = strs[0].length;
    var arr = [];      
    for(var j = 0; j < len; j++){
        arr[j] = [];
    }
    for(var i = 0; i < strs.length; i++){
       for(var j = 0; j < len; j++){
           arr[j][i] = strs[i][j];
       }
    }
    
    for(var i = 0; i < len; i++){
        var j_0 = arr[i][0];
        var isEqual = true;
        for(var j = 0; j < arr[i].length; j++){
            
            if(j_0 !== arr[i][j]){
                isEqual = false;
            }
        }
        if(isEqual){
            str += j_0;
        }else{
            return str;
        }
    }
    
    return str;

};

console.log(longestCommonPrefix(["aca","bca"]));