const worker = new Worker('timer-thread.js');



(function () {
    const cacheIds = {};
    const uid = 0;
    worker.onmessage = function (messageEvent) {
        const fnId = messageEvent.data.id;
        if (cacheIds[fnId]) {
            cacheIds[fnId]();
            delete cacheIds[fnId];
        }
    }
    window.mySetTimeout = function (fn, timeout = 0) {
        cacheIds[uid] = fn;
        worker.postMessage({ timeout: timeout, id: uid });
        return uid;
    }

    window.myClearTimeout = function (id) {
        if (cacheIds[id]) {
            delete cacheIds[id];
            return true;
        }

        return false;
    }
}())