var Graph = /** @class */ (function () {
    function Graph(name) {
        this.name = name;
        this.eages = [];
    }
    return Graph;
}());
function createGraph(name, eages, weights) {
    if (eages === void 0) { eages = []; }
    if (weights === void 0) { weights = []; }
    var graph = new Graph(name);
    graph.eages = eages.map(function (node, index) {
        return { node: node, weight: weights[index] };
    });
    return graph;
}
var _a = ['aily', 'arlun', 'worker', 'bill', 'eason'].map(function (name) { return createGraph(name); }), aily = _a[0], arlun = _a[1], worker = _a[2], bill = _a[3], eason = _a[4];
var zzp = createGraph('zzp', [aily, arlun, worker], [3, 5, 7]);
var akaman = createGraph('akaman', [arlun, bill, worker], [1, 1, 4]);
var lily = createGraph('lily', [aily, arlun, bill], [8, 12, 1, 9]);
var momo = createGraph('momo', [zzp, worker, aily], [2, 5, 4, 7]);
var ngWeights = [3, 7, 2];
[akaman, lily].forEach(function (node, index) { return zzp.eages.push({ node: node, weight: ngWeights[index] }); });
bill.eages.push({ node: momo, weight: 10 });
function dijkstra(start, end) {
    var _a;
    var path = {};
    var processed = {};
    var costs = (_a = {}, _a[start.name] = { weight: 0, node: start }, _a[end.name] = { weight: Infinity, node: null }, _a);
    var findLowestNode = function (processed, costs) {
        var keys = Object.keys(costs);
        var lowestWeight = Infinity;
        var lowestNode;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (costs[key].weight < lowestWeight && !processed[key]) {
                lowestWeight = costs[key].weight;
                lowestNode = costs[key].node;
            }
        }
        return lowestNode;
    };
    var node = findLowestNode(processed, costs);
    while (node) {
        //costs[node.name] = { weight: node.weight, node: node };
        var weight = costs[node.name] ? costs[node.name].weight : 0;
        for (var _i = 0, _b = node.eages; _i < _b.length; _i++) {
            var item = _b[_i];
            var newWeight = weight + item.weight;
            var name_1 = item.node.name;
            if (costs[name_1] === undefined || costs[name_1].weight > newWeight) {
                path[name_1] = node;
                costs[name_1] = { weight: newWeight, node: item.node };
            }
        }
        processed[node.name] = true;
        node = findLowestNode(processed, costs);
    }
    var paths = [];
    var name = end.name;
    while (path[name]) {
        paths.push(name);
        name = path[name].name;
    }
    paths.push(start.name);
    console.log(costs[end.name]);
    console.log(paths.reverse().join(' => '));
}
dijkstra(zzp, momo);
