export interface Node {
    type: 'node';
    id: number;
    lat: number;
    lon: number;
    tags?: {
      [key: string]: string;
    };
  }

  export interface Way {
    type: 'way';
    id: number;
    nodes: number[];  // Array of node IDs that this way consists of
    tags?: {
      [key: string]: string;
    };
  }
  
  export interface Edge {
    start: number;  // Node ID where the edge starts
    end: number;    // Node ID where the edge ends
    weight: number;  // Distance between these nodes
  }
  