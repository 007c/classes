function solution(options, target) {
    const stack = [options];
    let n;
    const ret = [];
    while(n = stack.pop()) {
        if(n.children) {
            stack.push(...n.children);
        }
        ret.push(n.id);
        if(n.id === target) {
            return [...ret];
        }
    }
}

console.log(solution({id: '1', children: [{id: '1.2'},{id: '1.1', children: [{id: '1.1.1'}, {id: '1.1.2'}]}]}, '1.2'));