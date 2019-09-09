var Graph = /** @class */ (function () {
    function Graph(name) {
        this.name = name;
        this.eages = [];
    }
    return Graph;
}());
function createGraph(name, eages) {
    if (eages === void 0) { eages = []; }
    var graph = new Graph(name);
    graph.eages = eages;
    return graph;
}
var _a = ['aily', 'arlun', 'worker', 'bill', 'eason'].map(function (name) { return createGraph(name); }), aily = _a[0], arlun = _a[1], worker = _a[2], bill = _a[3], eason = _a[4];
var zzp = createGraph('zzp', [aily, arlun, worker]);
aily.eages.push(arlun, bill, worker);
arlun.eages.push(worker, eason, aily, eason);
worker.eages.push(aily, zzp, arlun, bill);
bill.eages.push(eason, aily, worker);
eason.eages.push(zzp, worker, aily);
function pathSearch(graph, end) {
    // let step = 0;
    var accessed = new Map();
    // const queue: Graph[][] = [[graph]];
    // while (queue.length) {
    //     const graphNodes = queue.shift();
    //     let queueItem = [];
    //     for (let node of graphNodes) {
    //         if (!node || accessed.get(node)) {
    //             continue;
    //         }
    //         accessed.set(node, true);
    //         if (node.name === end) {
    //             return step;
    //         }
    //         queueItem.push(...node.eages);
    //     }
    //     queueItem.length && queue.push(queueItem);
    //     step++;
    // }
    //return null;
    var search = function (graphNode, end) {
        if (accessed.get(graphNode)) {
            return Infinity;
        }
        var min = Infinity;
        accessed.set(graphNode, true);
        if (graphNode.name === end) {
            return 0;
        }
        console.log(graphNode.name);
        for (var _i = 0, _a = graphNode.eages; _i < _a.length; _i++) {
            var node = _a[_i];
            min = Math.min(min, search(node, end) + 1);
            console.log(search(node, end) + 1, node.name, min, end);
        }
        return min;
    };
    var ret = search(graph, end);
    return ret === Infinity ? null : ret;
}
console.log(zzp, pathSearch(zzp, 'worker'));
