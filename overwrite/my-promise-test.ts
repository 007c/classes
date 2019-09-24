
import { MyPromise } from './my-promise';
let mypromise = new MyPromise(function (resolve, reject) {
    console.log('init promise')
    setTimeout(function () {
        resolve(2);
    }, 2000)
    //reject('hahaha')
})

// MyPromise.resolve(3).then(function (res) {
//     console.log('directly resolved value ', res);
// }).then(function (res) {
//     console.log('directly resolved value chain 1', res)
// })

// MyPromise.reject('Reject HAHAHA').then(noop, function (res) {
//     console.log('directly reject value ', res);
// })

mypromise.then(function (res) {
    console.log(res);
    return res;
}, function (err) {
    console.log(err);
    return err;
}).then(function (res) {
    console.log('chain 1 resolved ', res)
    return res
}, function (err) {
    console.log('chain 1 rejected ', err)
    return err
}).then(function (res) {
    console.log('chain 2 resolved ', res)
    return res
}, function (err) {
    console.log('chain 2 rejected ', err)
    return err
}).then(function (res) {
    console.log('chain 3 resolved', res)
    return new MyPromise(function (resolve, reject) {
        console.log('another promise')
        setTimeout(function () {
            resolve(15);
            console.log('wait resolve');
        }, 2000)
    })
}).then(function (res) {
    console.log('chain 4 resolved', res);
}).finally(function () {
    console.log('chain 5 finally');
})

let p1 = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
        console.log('resolve 1')
        resolve(1)
    }, 1000)
})

let p2 = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
        console.log('resolve 2')
        resolve(2)
    }, 2000)
})


let p3 = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
        console.log('resolve 3')
        resolve(3)
    }, 3000)
})

MyPromise.all([p1, p2, p3, 4, 5]).then(function (ret) {
    console.log('Promise all ret', ret)
}, function (err) {
    console.log('error: ', err)
})

let p4 = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
        console.log('resolve 4')
        reject(4)
    }, 1000)
})

let p5 = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
        console.log('resolve 5')
        resolve(5)
    }, 1200)
})

MyPromise.race([p5, p4]).then(function (res) {
    console.log('race result', res);
}).catch(function (err) {
    console.log('race error', err)
})

MyPromise.reject(2).catch(function (err) {
    console.log('catch reject err', err);
    return err;
}).then(null, function (err) {
    console.log('catch chain ', err)
}).finally(function () {
    console.log('catch finally')
})

const p7 = MyPromise.resolve(1);

p7.then(function (res) {
    console.log('then 1', res)
})
p7.then(function (res) {
    console.log('then 2', res)
})
p7.then(function (res) {
    console.log('then 3', res)
})
p7.then(function (res) {
    console.log('then 4', res)
})