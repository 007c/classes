enum STATUS {
    pending = "pending",
    fullfilled = "fullfilled",
    rejected = "rejected"
}

enum ReactionType {
    Fullfill = "Fullfill",
    Reject = "Reject"
}

interface PromiseRecord {
    resolve: Function;
    reject: Function;
}

interface PromiseCapability {
    promise: MyPromise;
    resolve: Function;
    reject: Function;
}

interface Reaction {
    capability: PromiseCapability,
    type: ReactionType,
    handler: Function
}

interface MyPromiseConstructor {
    new(executor: Function): MyPromise;
    resolve: Function;
}

interface iteratorRecord<T> {
    iterator: Iterator<T>,
    nextMethod: Function,
    done: boolean
}

function noop() {

}

export class MyPromise {
    promiseState: STATUS;
    promiseResult: any;
    fullfillReactions: Reaction[];
    rejectReactions: Reaction[];
    promiseIsHandled: boolean;
    _resolve: Function;
    _reject: Function;
    constructor(executor: Function) {
        if (typeof executor !== 'function') {
            throw Error('executor must be a function')
        }

        this.promiseState = STATUS.pending;
        this.fullfillReactions = [];
        this.rejectReactions = [];
        this.promiseIsHandled = false;
        const resolvingFunctions = createResolvingFunctions(this);
        const { resolve, reject } = resolvingFunctions;
        this._resolve = resolve;
        this._reject = reject;
        executor.call(null, resolve, reject);
    }

    then(onFullfilled: Function = noop, onRejected?: Function): MyPromise {
        const resultCapability = createPromiseCapability(MyPromise);
        return performPromiseThen(this, onFullfilled, onRejected, resultCapability);
    }

    catch(onRejected: Function) {
        return this.then(undefined, onRejected);
    }

    finally(onFinally) {
        let promise = this;
        if (typeof promise !== 'object') {
            throw TypeError('Promise.prototype.finally called on non-object');
        }
        let thenFinally, catchFinally;
        if (!isCallable(onFinally)) {
            thenFinally = catchFinally = onFinally;
        } else {
            thenFinally = createFinallyFunction(MyPromise, onFinally);
            catchFinally = createCatchFunction(MyPromise, onFinally);
        }

        return promise.then(thenFinally, catchFinally);
    }

    static reject(r: any) {
        let promiseCapability = createPromiseCapability(this);
        promiseCapability.reject.call(null, r);
        return promiseCapability.promise;
    }

    static all(iterable: any[]) {
        const promiseCapability = createPromiseCapability(this);
        const iteratorRecord = getIterator(iterable);
        const result = performPromiseAll(iteratorRecord, this, promiseCapability);
        return result;
    }

    static resolve(x: any) {
        let c = this;
        if (typeof c !== "object" && !(c instanceof Object)) {
            throw TypeError('resolve caller is not an object');
        }

        return promiseResolve(c, x);
    }

    static race(iterable: any[]) {
        let promiseCapability = createPromiseCapability(this);
        let iteratorRecord = getIterator(iterable);
        let result = performPromiseRace(iteratorRecord, this, promiseCapability);
        return result;
    }
}

function createCatchFunction(constructor: MyPromiseConstructor, onFinally: Function) {
    return function catchFunction(reason: any) {
        let result = onFinally();
        let c = constructor;
        let promise = promiseResolve(c, result);
        let thrower = function () {
            return reason;
        }

        return promise.then(thrower);
    }
}

function createFinallyFunction(constructor: MyPromiseConstructor, onFinally: Function) {
    return function finallyFunction(value: any) {
        if (isCallable(onFinally)) {
            let result = onFinally();
            let c = constructor;
            let promise = promiseResolve(c, result);
            let valueThunk = function () {
                return value;
            }

            return promise.then(valueThunk)
        }
    }
}

function isPromise(param) {
    return typeof param === 'object' && param.then !== undefined;
}

function promiseResolve(constructor: MyPromiseConstructor, x: any): MyPromise {
    if (isPromise(x)) {
        let xConstructor = x.constructor;
        if (xConstructor === constructor) {
            return x;
        }
    }

    let promiseCapability = createPromiseCapability(constructor);
    promiseCapability.resolve.call(null, x);
    return promiseCapability.promise;
}

function performPromiseRace(iteratorRecord: iteratorRecord<any[]>, constructor: MyPromiseConstructor, resultCapability: PromiseCapability) {
    let promiseResolve = constructor.resolve;
    if (!isCallable(promiseResolve)) {
        throw TypeError('Promise resolve is not callable!')
    }

    while (true) {
        let next = iteratorStep(iteratorRecord);
        // to do
        // add abrupt logics
        if (next === false) {
            iteratorRecord.done = true;
            return resultCapability.promise;
        }

        let nextValue = next.value;
        let nextPromise = promiseResolve.call(constructor, nextValue);
        nextPromise.then(resultCapability.resolve, resultCapability.reject);
    }
}

function performPromiseAll(iteratorRecord: iteratorRecord<any[]>, constructor: MyPromiseConstructor, resultCapability: PromiseCapability) {
    const values = [];
    let remainingElementCount = { value: 1 };
    const promiseResolve = constructor.resolve;
    if (!isCallable(promiseResolve)) {
        throw TypeError('Promise resolve is not callable!')
    }
    let index = 0;
    while (true) {
        let next = iteratorStep(iteratorRecord);
        if (!next) {
            iteratorRecord.done = true;
            remainingElementCount.value = remainingElementCount.value - 1;
            if (remainingElementCount.value === 0) {
                let valueArray = values.slice(0);
                resultCapability.resolve.call(null, valueArray);
            }

            return resultCapability.promise;
        }

        let nextValue = next.value;
        values.push(undefined);
        let nextPromise = promiseResolve.call(constructor, nextValue);
        let alreadyCalled = { value: false };
        let resolveElement = createPromiseAllResolveFunction(index, values, resultCapability, remainingElementCount, alreadyCalled);
        remainingElementCount.value++;
        nextPromise.then(resolveElement, resultCapability.reject);
        index++;
    }
}

function createPromiseAllResolveFunction(
    index: number,
    values: any[],
    capability: PromiseCapability,
    remainingElementCount: { value: number },
    alreadyCalled: { value: boolean }
): Function {
    return function promiseAllResolve(x: any) {
        if (alreadyCalled.value) {
            return undefined;
        }
        alreadyCalled.value = true;
        values[index] = x;
        remainingElementCount.value--;
        if (remainingElementCount.value === 0) {
            let valueArray = values.slice(0);
            return capability.resolve.call(null, valueArray);
        }

        return undefined;
    }
}

function iteratorStep(iteratorRecord: iteratorRecord<any[]>) {
    let result = iteratorNext(iteratorRecord);
    let done = iteratorComplete(result);
    if (done) {
        return false;
    }

    return result;
}

function iteratorComplete(result: any) {
    if (typeof result === 'object') {
        return result.done;
    }
}

function iteratorNext(iteratorRecord: iteratorRecord<any[]>, value?: any) {
    let result;
    if (value !== undefined) {
        result = iteratorRecord.nextMethod.call(iteratorRecord.iterator, value);
    } else {
        result = iteratorRecord.nextMethod.call(iteratorRecord.iterator);
    }

    return result;
}

function getIterator(obj: any[], hint: string = 'sync'): iteratorRecord<any[]> {
    const method = obj[Symbol.iterator];
    const iterator = method.call(obj);
    if (typeof iterator !== 'object') {
        throw TypeError('object' + obj + 'is not iterable ')
    }

    const nextMethod = iterator.next;
    return {
        iterator,
        nextMethod,
        done: false,
    }
}

function isCallable(fn: any) {
    return typeof fn === "function";
}

function hostPromiseRejectionTracker(promise: MyPromise, handle: string) {

}

function performPromiseThen(promise: MyPromise, onFullfilled: Function, onRejected: Function, resultCapability: PromiseCapability): MyPromise {
    if (!isCallable(onFullfilled)) {
        onFullfilled = undefined;
    }
    if (!isCallable(onRejected)) {
        onRejected = undefined;
    }

    const fullfillReaction: Reaction = {
        capability: resultCapability,
        type: ReactionType.Fullfill,
        handler: onFullfilled,
    }

    const rejectReaction: Reaction = {
        capability: resultCapability,
        type: ReactionType.Reject,
        handler: onRejected,
    }

    if (promise.promiseState === STATUS.pending) {
        promise.fullfillReactions.push(fullfillReaction);
        promise.rejectReactions.push(rejectReaction);
    } else if (promise.promiseState === STATUS.fullfilled) {
        const value = promise.promiseResult;
        equeueJob(performReactionJob, fullfillReaction, value)
    } else {
        if (promise.promiseState === STATUS.rejected) {
            if (!promise.promiseIsHandled) {
                hostPromiseRejectionTracker(promise, 'handle')
            }
            let reason = promise.promiseResult;
            equeueJob(performReactionJob, rejectReaction, reason);
        }
    }

    promise.promiseIsHandled = true;
    return resultCapability.promise;
}

function builtInExecutor(resolve: Function, reject: Function) { }

function createPromiseCapability(c: MyPromiseConstructor, executor: Function = builtInExecutor): PromiseCapability {
    const promise = new c(executor);
    return {
        promise,
        resolve: promise._resolve,
        reject: promise._reject,
    };
}

function performReactionJob(reaction: Reaction, arg: any) {
    const promiseCapability: PromiseCapability = reaction.capability;
    const handler = reaction.handler;
    const type = reaction.type;
    let handleResult;
    if (!handler) {
        if (type === ReactionType.Fullfill) {
            handleResult = arg;
        } else {
            handleResult = new Error(arg);
        }
    } else {
        handleResult = handler(arg);
    }


    let status;
    if (type === ReactionType.Reject) {
        status = promiseCapability.reject.call(null, handleResult);
    } else {
        status = promiseCapability.resolve.call(null, handleResult);
    }

    return status;
}

function equeueJob(job: Function, ...args: any[]) {
    setTimeout(function () {
        job(...args);
    }, 0)
}

function triggerPromiseReactions(reactions: Reaction[], value: any) {
    for (const rec of reactions) {
        setTimeout(function () {
            equeueJob(performReactionJob, rec, value);
        }, 0)
    }
}

function fullFillPromise(promise: MyPromise, resolution: any) {
    if (promise.promiseState !== STATUS.pending) {
        return;
    }

    const reactions = promise.fullfillReactions;
    promise.promiseResult = resolution;
    promise.promiseState = STATUS.fullfilled;
    promise.fullfillReactions = undefined;
    promise.rejectReactions = undefined;
    triggerPromiseReactions(reactions, resolution);
}

function rejectPromise(promise: MyPromise, reason: any) {
    const reactions = promise.rejectReactions;
    promise.promiseResult = reason;
    promise.fullfillReactions = undefined;
    promise.rejectReactions = undefined;
    promise.promiseState = STATUS.rejected;
    if (!promise.promiseIsHandled) {
        hostPromiseRejectionTracker(promise, 'reject');
    }
    return triggerPromiseReactions(reactions, reason);
}

function performResolveThenableJob(promise: MyPromise, thenable: any, thenAction: any) {
    const resolvingFunctions = createResolvingFunctions(promise);
    const thenCallResult = thenAction.call(thenable, resolvingFunctions.resolve, resolvingFunctions.reject);
    return thenCallResult;
}

function createPromiseResolveFunction(promise: MyPromise) {
    return function (resolution: any) {
        if (resolution === promise) {
            rejectPromise(promise, 'selfResolutionError')
        }

        if (!(resolution instanceof Object)) {
            return fullFillPromise(promise, resolution);
        }

        const thenAction = resolution.then;
        if (!isCallable(thenAction)) {
            return fullFillPromise(promise, resolution);
        }
        equeueJob(performResolveThenableJob, promise, resolution, thenAction)
        return;
    }
}

function createPromiseRejectFunction(promise: MyPromise) {
    return function (reason: any) {
        rejectPromise(promise, reason);
    }
}

function createResolvingFunctions(promise: MyPromise): PromiseRecord {
    const resolve = createPromiseResolveFunction(promise);
    const reject = createPromiseRejectFunction(promise);

    return {
        resolve,
        reject
    }
}

