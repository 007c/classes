const define = function(obj, key, val, callbacks){
    Object.defineProperty(obj, key, {
        get(){
            return val;
        },
        set(newVal){
            val = newVal;
            const callbacks = this.events[key];
            if(callbacks){
                for(let i = 0; i < callbacks.length; i++){
                    callbacks[i](newVal);
                }
            }
        }
    })
}

class Watcher { 
    constructor(data) {
        // this.data = data;
        this.events = {};
        let keys = Object.keys(data);
        for(let i = 0; i < keys.length; i++){
            let key = keys[i];
            define(this, key, data[key]);
        }
    }
    $on(key, callback){
        if(this.events[key]){
            this.events[key].push(callback);
        }else{
            this.events[key] = [callback];
        }
    }
    $emit(key, val){
        this[key] = val;
    }
}

let watcher = new Watcher({'a': 1, 'b': 2})
watcher.$on('a', function(val){
    console.log(val);
})

watcher.$on('a', function(val){
    console.log('new val', val);
})

watcher.a = 5;

console.log(watcher.a)

watcher.$emit('a', 12);
console.log(watcher.a)
