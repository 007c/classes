const STATUS = {
    pending: "pending",
    resolved: "resolved",
    rejected: "rejected",
}

function thenable(p) {
    return typeof p === "object" && p.then;
}

function noop() { }
class MyPromise {
    resolveFn(res) {
        if (this.status !== STATUS.pending) {
            return;
        }
        this.status = STATUS.resolved;
        this.promiseValue = res;
        let that = this;
        setTimeout(function () {
            const ret = typeof that.resolveCallback === 'function' ? that.resolveCallback(res) : res;
            if (thenable(ret)) {
                ret.then(that._nextresolve);
            } else {
                that._nextresolve(ret)
            }
        }, 0)
    };
    rejectFn(err) {
        if (this.status !== STATUS.pending) {
            return;
        }
        this.status = STATUS.rejected;
        this.promiseValue = err;
        let that = this;
        setTimeout(function () {
            const ret = typeof that.rejectCallback === 'function' ? that.rejectCallback(err) : err;
            if (thenable(ret)) {
                ret.then(noop, that._nextReject)
            } else {
                that._nextReject(ret);
            }
        }, 0)
    };
    resolveCallback = noop;
    rejectCallback = noop;
    _nextresolve = noop;
    _nextReject = noop;
    constructor(fn) {
        const { resolveFn, rejectFn } = this;
        this.status = STATUS.pending;
        this.promiseValue = undefined;
        fn(resolveFn.bind(this), rejectFn.bind(this));
    }

    then(onresolve, onReject) {
        this.resolveCallback = onresolve;
        this.rejectCallback = onReject;
        const { status, promiseValue } = this;
        const that = this;
        return new MyPromise(function (resolve, reject) {
            that._nextresolve = resolve;
            that._nextReject = reject;
            if (status === STATUS.resolved) {
                resolve(promiseValue)
            } else if (status === STATUS.rejected) {
                reject(promiseValue)
            }
        });
    }

    catch(onReject) {
        if (this.rejectCallback !== noop) {
            return;
        }

        this.rejectCallback = onReject;
        const that = this;
        return new Promise(function (resolve, reject) {
            that._nextReject = reject;
        })
    }

    static resolve(res) {
        return new MyPromise(function (resolve, reject) {
            resolve(res);
        });
    }

    static reject(err) {
        return new MyPromise(function (resolve, reject) {
            reject(err);
        });
    }

    static all(tasks) {
        return new Promise(function (resolveFn, rejectFn) {
            let count = tasks.length;
            let ret = [], error;
            for (const item of tasks) {
                if (thenable(item)) {
                    item.then((res) => {
                        ret.push(res);
                        count--;
                        if (count <= 0) {
                            resolveFn(ret);
                        }
                    }, function (err) {
                        error = err;
                        count--;
                        rejectFn(err);
                    })
                } else {
                    ret.push(item);
                    count--;
                    if (count <= 0) {
                        resolveFn(ret);
                    }
                }
            }
        })
    }

    static race(tasks) {
        return new Promise(function (resolveFn, rejectFn) {
            for (const item of tasks) {
                if (thenable(item)) {
                    item.then((res) => {
                        resolveFn(res);
                    }, function (err) {
                        rejectFn(err);
                    })
                } else {
                    resolveFn(item);
                }
            }
        })
    }
}

let mypromise = new MyPromise(function (resolve, reject) {
    console.log('init promise')
    setTimeout(function () {
        resolve(2);
    }, 2000)
    //reject('hahaha')
})

MyPromise.resolve(3).then(function (res) {
    console.log('directly resolved value ', res);
}).then(function (res) {
    console.log('directly resolved value chain 1', res)
})

MyPromise.reject('Reject HAHAHA').then(noop, function (res) {
    console.log('directly reject value ', res);
})

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

console.log(mypromise)

MyPromise.all([p1, p2, p3, 4, 5, MyPromise.reject('reject promise all')]).then(function (ret) {
    console.log('Promise all ret', ret)
}, function (err) {
    console.log('error: ', err)
})

let p4 = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
        console.log('resolve 4')
        resolve(4)
    }, 1000)
})

let p5 = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
        console.log('resolve 5')
        resolve(5)
    }, 1200)
})

MyPromise.race([p5, p4, 'race string']).then(function (res) {
    console.log('race result', res);
})

MyPromise.reject(2).catch(function (err) {
    console.log('catch reject err', err);
    return err;
}).then(null, function (err) {
    console.log('catch chain ', err)
})