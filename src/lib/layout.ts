import dagre from '@dagrejs/dagre';
import type { ThinkNode, ThinkEdge } from '../types/mind-map';

const NODE_WIDTH = 200;
const NODE_HEIGHT = 60;

export function layoutMindMap(nodes: ThinkNode[], edges: ThinkEdge[]): ThinkNode[] {
  if (nodes.length === 0) {
    return nodes;
  }

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({
    rankdir: 'LR',
    nodesep: 50,
    ranksep: 80,
    marginx: 40,
    marginy: 40,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return nodes.map((node) => {
    const dagreNode = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: dagreNode.x - NODE_WIDTH / 2,
        y: dagreNode.y - NODE_HEIGHT / 2,
      },
    };
  });
}
