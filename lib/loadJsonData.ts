import { Node, Edge, Way } from "@/types/jsonTypes";
import { haversine } from "./distance";

export async function loadData():Promise<{ nodes:Node[], edges: Edge[], nameToIdMap:Map<string,number>}> {
    

    const response = await fetch('/data/pampady-geoData.json');
    const data = await response.json();
    console.log(data,"json data")
    

    const nodes:Node[] = data?.elements?.filter((element:any) => element.type === 'node');
    // console.log(nodes,"nodes")
    const ways: Way[] = data?.elements?.filter((element:any) => element.type=== 'way');
    // console.log(ways,"ways")


    // map of place names to node id
    const nameToIdMap = new Map<string, number>();
    nodes?.forEach(node => {
        if(node.tags && node.tags.name) {
            nameToIdMap.set(node.tags.name.toLowerCase(), node.id)
        }
    })
    console.log(nameToIdMap,"names map")


    // create edges from ways
    const edges: Edge[] = [];
    const nodeMap = new Map<number, Node>(nodes?.map(node => [node.id, node]));
    ways?.forEach(way => {
        for (let i=0; i < way.nodes.length-1; i++){
            const startNode = nodeMap.get(way.nodes[i]);
            const endNode = nodeMap.get(way.nodes[i+1]);

            if(startNode && endNode) {
                const weight = haversine(startNode.lat, startNode.lon, endNode.lat, endNode.lon);
                edges.push({
                    start:startNode.id,
                    end:endNode.id,
                    weight
                })
            }
        }
    })


    return { nodes, edges, nameToIdMap }
}