const STATUS = {
    pending: "pending",
    resolved: "resolved",
    rejected: "rejected",
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
            if (typeof ret === "object" && ret.then) {
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
            if (typeof ret === "object" && ret.then) {
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
        const { status, promiseValue } = this.status;
        const that = this;
        return new MyPromise(function (resolve, reject) {
            that._nextresolve = function (promiseValue) {
                resolve(promiseValue)
            };
            that._nextReject = function (promiseValue) {
                reject(promiseValue)
            };
            if (status === STATUS.resolved) {
                resolve(promiseValue)
            } else if (status === STATUS.rejected) {
                reject(promiseValue)
            }
        });
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
}

let mypromise = new MyPromise(function (resolve, reject) {
    console.log('init promise')
    setTimeout(function () {
        resolve(2);
    }, 2000)
    reject('hahaha')
})

MyPromise.resolve(3).then(function (res) {
    console.log('directly resolved value ', res);
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

console.log(mypromise)