const createDebounce = function (fn, tick, delay) {
    let now = + new Date();
    let timerId = null;

    return function () {
        let timeStamp = +new Date();
        if (timeStamp - now >= delay) {
            fn();
            now = timeStamp;
        } else {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                fn();
                now = +new Date();
            }, tick)
        }
    }
}

const debounce = createDebounce(function () {
    console.log('debounce Fn')
    console.log(new Date())
}, 2000, 2000);

debounce()
debounce()
debounce()
debounce()
debounce()
debounce()
debounce()
debounce()

setTimeout(debounce, 3000);
