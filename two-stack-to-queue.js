class Queue {
    constructor(){
        this.stack1 = [];
        this.stack2 = [];
    }

    push(val){
        this.stack1.push(val);
    }

    shift(){
        if(this.stack2.length === 0){
            while(this.stack1.length){
                this.stack2.push(this.stack1.pop());
            }
        }1

        return this.stack2.pop();
    }
}

const queue = new Queue();

queue.push(1);
queue.push(2);
queue.push(3);
console.log(queue.shift());
console.log(queue.shift());
queue.push(4);
console.log(queue.shift());
console.log(queue.shift());
queue.push(2);
console.log(queue.shift());