var Stack = /** @class */ (function () {
    function Stack() {
        this.items = [];
    }
    Stack.prototype.push = function (item) {
        this.items.push(item);
    };
    Stack.prototype.pop = function () {
        return this.items.pop();
    };
    Stack.prototype.peek = function () {
        return this.items[this.items.length - 1];
    };
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    Stack.prototype.clear = function () {
        this.items.length = 0;
    };
    Stack.prototype.size = function () {
        return this.items.length;
    };
    return Stack;
}());
var stack = new Stack();
console.log(stack.isEmpty());
stack.push(1);
console.log(stack.isEmpty());
stack.push(2);
stack.push(4);
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.peek());
stack.push(47);
console.log(stack.pop());
var decimalToBinary = function (decimal) {
    var stack = new Stack();
    while (decimal > 0) {
        var rem = decimal % 2;
        stack.push(rem);
        decimal = Math.floor(decimal / 2);
    }
    var binary = "";
    while (!stack.isEmpty()) {
        binary += stack.pop();
    }
    return binary;
};
console.log(decimalToBinary(12));
