var isValid = function(s) {
    var strs = s.split('');
    var stack = []
    var chars = {
        '(': ')',
        '{': '}',
        '[': ']',
    }
    var len = strs.length;
    
    for(var i = 0; i < len; i++){
        var top = stack.pop();
        if(chars[top] !== strs[i]){
            top && stack.push(top);
            stack.push(strs[i])
        }
    }
    // console.log(stack)
    return stack.length === 0;
};
console.log(isValid("{[]}{}{}[][]"))