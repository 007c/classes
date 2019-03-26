function co(fn){
    var it = fn();
    var ret = it.next();
    var next = function(ret){
        if(ret.done){
            return;
        }
        
        if(ret.value && ret.value.then){
            ret.value.then(function(res){
                next(it.next(res))
            })
        }else{
            next(it.next())
        }
    }

    next(ret);
}

function p1(){
    return new Promise((rsl, rej) => {
        setTimeout(()=>{
            console.log(1);
            rsl(1)
        }, 1000)
    })
}
function p2(){
    return new Promise((rsl, rej) => {
        setTimeout(()=>{
            console.log(2);
            rsl(2)
        }, 8000)
    })
}

function syncP3(){
    console.log('sync p3');
}

var gen = function *(){
    var ret = yield p2();
    // console.log(ret);
    yield syncP3();
    console.log('sync code');
    yield p1();
    
}
console.log('sync code before coroutine');
co(gen);
console.log('sync code after coroutine');

async function asyncFunc(){
    await p2();
    await p1();
    console.log('async')
}

//asyncFunc();