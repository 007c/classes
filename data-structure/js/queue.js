var TQueue = /** @class */ (function () {
    function TQueue() {
        this.items = [];
    }
    TQueue.prototype.size = function () {
        return this.items.length;
    };
    TQueue.prototype.enqueue = function (item) {
        this.items.push(item);
    };
    TQueue.prototype.dequeue = function () {
        return this.items.shift();
    };
    TQueue.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    TQueue.prototype.clear = function () {
        this.items.length = 0;
    };
    TQueue.prototype.peek = function () {
        return this.items[0];
    };
    return TQueue;
}());
var tqueue = new TQueue();
tqueue.enqueue('z');
tqueue.enqueue('z');
tqueue.enqueue('p');
console.log(tqueue.peek());
tqueue.dequeue();
tqueue.dequeue();
console.log(tqueue.peek());
