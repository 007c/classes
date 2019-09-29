onmessage = function (messageEvent) {
    const data = messageEvent.data;
    let date = +new Date();
    while (date + data.timeout > +new Date()){};
    this.postMessage(data);
}