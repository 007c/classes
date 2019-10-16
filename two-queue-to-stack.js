class Stack {
    constructor() {
        this.queue1 = [];
        this.queue2 = [];
    }

    push(val) {
        if(this.queue2.length !== 0) {
            this.queue2.push(val);
        }else{
            this.queue1.push(val);
        }
    }

    pop() {
        let pushQueue, popQueue;
        if(this.queue1.length !== 0) {
            pushQueue = this.queue2;
            popQueue = this.queue1;
        }else {
            pushQueue = this.queue1;
            popQueue = this.queue2;
        }
        const len = popQueue.length - 1;
        for(let i = 0; i < len; i++) {
            pushQueue.push(popQueue.shift());
        }
        return popQueue.shift();
    }
}

var stack = new Stack();

stack.push(1);
stack.push(2);
console.log(stack.pop());
console.log(stack.pop());
stack.push(3);

console.log(stack.pop());
