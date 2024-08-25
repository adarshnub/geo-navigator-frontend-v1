import { Edge,Node } from "@/types/jsonTypes";



export function dijkstra(nodes:Node[],edges:Edge[], startId:number, endId:number):number {

    const distances = new Map<number, number>();
    const visited = new Set<number>();

    const priorityQueue: [number, number][] = [[0, startId]];  // initial distan , node id


    nodes.forEach(node => distances.set(node.id, Infinity));  // initialize

    distances.set(startId,0);


    while(priorityQueue.length > 0) {
        const [currentDist, currentNodeId] = priorityQueue.shift()!;
        if(visited.has(currentNodeId)) continue;
        visited.add(currentNodeId);


        if(currentNodeId === endId) return currentDist;


        edges?.forEach(edge => {
            if(edge.start === currentNodeId && !visited.has(edge.end)) {
                const newDist = currentDist + edge.weight;
                if( newDist < (distances.get(edge.end) || Infinity)) {
                    distances.set(edge.end, newDist);
                    priorityQueue.push([newDist, edge.end]);
                     priorityQueue.sort((a,b) => a[0] - b[0]);   //sort by distanc
                }
            }
        })
    }


    return Infinity;  // if no path found
}