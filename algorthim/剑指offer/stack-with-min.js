//构建一个包含最小值的栈， 且 push, pop, min都是 O(1)的复杂度
class StackWithMin {
    constructor() {
        this.data = [];
        this.mins = [];
    }
    push(val) {
        let min;
        if (this.mins.length === 0) {
            min = val;
        } else {
            min = Math.min(val, this.mins[this.mins.length - 1]);
        }
        this.data.push(val);
        this.mins.push(min);
    }
    pop() {
        this.mins.pop();
        return this.data.pop();
    }
    min() {
        return this.mins[this.mins.length - 1];
    }
}

let stack = new StackWithMin();

stack.push(3);
stack.push(2);
stack.push(4);
console.log(stack.min());
stack.pop();
stack.pop();
console.log(stack.min());
stack.push(0);
console.log(stack.min());