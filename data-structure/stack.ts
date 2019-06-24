class Stack<T> {
    private items: Array<T> = []
    push(item: T): void {
        this.items.push(item);
    }
    pop(): T {
        return this.items.pop();
    }
    peek(): T {
        return this.items[this.items.length - 1];
    }
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    clear(): void {
        this.items.length = 0;
    }
}

const stack = new Stack<number>();

stack.push(1);
stack.push(2);
stack.push(4);
console.log(stack.pop());
console.log(stack.pop());
stack.push(47);
console.log(stack.pop());