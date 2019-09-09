class Graph {
    public eages: Graph[] = [];
    public weight?: number;
    constructor(public name: string) { }
}


function createGraph(name: string, eages: Graph[] = []): Graph {
    const graph = new Graph(name);
    graph.eages = eages;
    return graph;
}

const [aily, arlun, worker, bill, eason] = ['aily', 'arlun', 'worker', 'bill', 'eason'].map((name) => createGraph(name));

const zzp = createGraph('zzp', [aily, arlun, worker]);
aily.eages.push(arlun, bill, worker);
arlun.eages.push(worker, eason, aily, eason);
worker.eages.push(aily, zzp, arlun, bill);
bill.eages.push(eason, aily, worker);
eason.eages.push(zzp, worker, aily);


function pathSearch(graph: Graph, end: string): number | null {
    let step = 0;
    const accessed: Map<Graph, boolean> = new Map();
    const queue: Graph[][] = [[graph]];

    while (queue.length) {
        const graphNodes = queue.shift();
        let queueItem = [];
        for (let node of graphNodes) {
            if (!node || accessed.get(node)) {
                continue;
            }
            accessed.set(node, true);
            if (node.name === end) {
                return step;
            }
            queueItem.push(...node.eages);
        }
        queueItem.length && queue.push(queueItem);
        step++;
    }

    return null;

}

console.log(zzp, pathSearch(zzp, 'worker'))