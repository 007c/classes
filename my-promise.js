const STATUS = {
    pending: "pending",
    resloved: "resloved",
    rejected: "rejected",
}

function noop() { }
class MyPromise {
    resloveFn(res) {
        if (this.status !== STATUS.pending) {
            return;
        }
        this.status = STATUS.resloved;
        this.promiseValue = res;
        let that = this;
        setTimeout(function () {
            const ret = typeof that.resloveCallback === 'function' ? that.resloveCallback(res) : res;
            if (typeof ret === "object" && ret.then) {
                ret.then(that._nextReslove);
            } else {
                that._nextReslove(ret)
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
    resloveCallback = noop;
    rejectCallback = noop;
    _nextReslove = noop;
    _nextReject = noop;
    constructor(fn) {
        const { resloveFn, rejectFn } = this;
        this.status = STATUS.pending;
        this.promiseValue = undefined;
        fn(resloveFn.bind(this), rejectFn.bind(this));
    }

    then(onReslove, onReject) {
        this.resloveCallback = onReslove;
        this.rejectCallback = onReject;
        const { status, promiseValue } = this.status;
        const that = this;
        return new MyPromise(function (reslove, reject) {
            that._nextReslove = function (promiseValue) {
                reslove(promiseValue)
            };
            that._nextReject = function (promiseValue) {
                reject(promiseValue)
            };
            if (status === STATUS.resloved) {
                reslove(promiseValue)
            } else if (status === STATUS.rejected) {
                reject(promiseValue)
            }
        });
    }

    static reslove(res) {
        return new MyPromise(function (reslove, reject) {
            reslove(res);
        });


    }

    static reject(err) {
        return new MyPromise(function (reslove, reject) {
            reject(err);
        });
    }
}

let mypromise = new MyPromise(function (reslove, reject) {
    console.log('init promise')
    setTimeout(function () {
        reslove(2);
    }, 2000)
    reject('hahaha')
})

MyPromise.reslove(3).then(function (res) {
    console.log('directly resloved value ', res);
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
    console.log('chain 1 resloved ', res)
    return res
}, function (err) {
    console.log('chain 1 rejected ', err)
    return err
}).then(function (res) {
    console.log('chain 2 resloved ', res)
    return res
}, function (err) {
    console.log('chain 2 rejected ', err)
    return err
}).then(function (res) {
    console.log('chain 3 resloved', res)
    return new MyPromise(function (reslove, reject) {
        console.log('another promise')
        setTimeout(function () {
            reslove(15);
            console.log('wait reslove');
        }, 2000)
    })
}).then(function (res) {
    console.log('chain 4 resloved', res);
})

console.log(mypromise)