var arr =[['A','B'],['a','b'],[1,2]]

const solution = function(rets, ret, index) {
    if(ret.length === arr.length) {
        rets.push([...ret]);
        return;
    }
    for(let i = index; i < arr.length; i++) {
        for(let j = 0; j < arr[i].length; j++) {
            ret.push(arr[i][j]);
            solution(rets, ret, i+1);
            ret.pop();
        }
    }
}
const rets = [];

solution(rets, [], 0);
console.log('rets: ', rets);
