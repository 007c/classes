
interface Eage {
    weight: number,
    node: Graph,
}

class Graph {
    public eages: Eage[] = [];
    constructor(public name: string) { }
}

interface Dict<T> {
    [props: string]: T;
}

function createGraph(name: string, eages: Graph[] = [], weights: number[] = []): Graph {
    const graph = new Graph(name);
    graph.eages = eages.map((node, index) => {
        return { node, weight: weights[index] }
    });
    return graph;
}

const [aily, arlun, worker, bill, eason] = ['aily', 'arlun', 'worker', 'bill', 'eason'].map((name) => createGraph(name));

const zzp = createGraph('zzp', [aily, arlun, worker], [3, 5, 7]);
const akaman = createGraph('akaman', [arlun, bill, worker], [1, 1, 4])
const lily = createGraph('lily', [aily, arlun, bill], [8, 12, 1, 9]);
const momo = createGraph('momo', [zzp, worker, aily], [2, 5, 4, 7]);
const ngWeights = [3, 7, 2];
[akaman, lily].forEach((node, index) => zzp.eages.push({ node, weight: ngWeights[index] }));

bill.eages.push({ node: momo, weight: 10 })
// aily.eages.push(arlun, bill, worker);
// arlun.eages.push(worker, eason, aily, eason);
// worker.eages.push(aily, zzp, arlun, bill);
// bill.eages.push(eason, aily, worker);
// eason.eages.push(zzp, worker, aily);

//bfs
// function pathSearch(graph: Graph, end: string): number | null {
//     let step = 0;
//     const accessed: Map<Graph, boolean> = new Map();
//     const queue: Graph[][] = [[graph]];

//     while (queue.length) {
//         const graphNodes = queue.shift();
//         let queueItem = [];
//         for (let node of graphNodes) {
//             if (!node || accessed.get(node)) {
//                 continue;
//             }
//             accessed.set(node, true);
//             if (node.name === end) {
//                 return step;
//             }
//             queueItem.push(...node.eages);
//         }
//         queueItem.length && queue.push(queueItem);
//         step++;
//     }

//     return null;

// }

// console.log(zzp, pathSearch(zzp, 'worker'))

interface CostNode { weight: number, node: Graph }

function dijkstra(start: Graph, end: Graph) {
    const path: Dict<Graph> = {};
    const processed: Dict<boolean> = {};
    const costs: Dict<CostNode> = { [start.name]: { weight: 0, node: start }, [end.name]: { weight: Infinity, node: null } };
    const findLowestNode = function (processed: Dict<boolean>, costs: Dict<CostNode>) {
        const keys = Object.keys(costs) as Array<keyof typeof costs>;
        let lowestWeight = Infinity;
        let lowestNode: Graph;
        for (const key of keys) {
            if (costs[key].weight < lowestWeight && !processed[key]) {
                lowestWeight = costs[key].weight;
                lowestNode = costs[key].node;
            }
        }

        return lowestNode;
    }

    let node = findLowestNode(processed, costs);
    while (node) {
        //costs[node.name] = { weight: node.weight, node: node };
        let weight = costs[node.name] ? costs[node.name].weight : 0;
        for (const item of node.eages) {
            let newWeight = weight + item.weight;
            const name = item.node.name;
            if (costs[name] === undefined || costs[name].weight > newWeight) {
                path[name] = node;
                costs[name] = { weight: newWeight, node: item.node };
            }
        }
        processed[node.name] = true;
        node = findLowestNode(processed, costs);
    }

    const paths = [];
    let name = end.name;
    while (path[name]) {
        paths.push(name);
        name = path[name].name;
    }

    paths.push(start.name);
    console.log(costs[end.name])
    console.log(paths.reverse().join(' => '))
}


dijkstra(zzp, momo);