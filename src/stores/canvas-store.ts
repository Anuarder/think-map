import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import type { NodeChange, EdgeChange } from '@xyflow/react';
import type { ThinkNode, ThinkEdge } from '../types/mind-map';
import { layoutMindMap } from '../lib/layout';

interface CanvasState {
  nodes: ThinkNode[];
  edges: ThinkEdge[];
  selectedNodeId: string | null;
  layoutVersion: number;

  setNodes: (nodes: ThinkNode[]) => void;
  setEdges: (edges: ThinkEdge[]) => void;
  onNodesChange: (changes: NodeChange<ThinkNode>[]) => void;
  onEdgesChange: (changes: EdgeChange<ThinkEdge>[]) => void;
  addNode: (node: ThinkNode) => void;
  removeNode: (id: string) => void;
  updateNodeData: (id: string, data: Partial<ThinkNode['data']>) => void;
  setSelectedNode: (id: string | null) => void;
  loadMindMap: (nodes: ThinkNode[], edges: ThinkEdge[]) => void;
}

const DEMO_NODES: ThinkNode[] = [
  {
    id: '1',
    type: 'mindMapNode',
    position: { x: 0, y: 0 },
    data: { label: 'My Big Idea', nodeType: 'idea', isManual: false },
  },
  {
    id: '2',
    type: 'mindMapNode',
    position: { x: 0, y: 0 },
    data: {
      label: 'Core Features',
      nodeType: 'action',
      isManual: false,
      description: 'Key things to build',
    },
  },
  {
    id: '3',
    type: 'mindMapNode',
    position: { x: 0, y: 0 },
    data: { label: 'Open Questions', nodeType: 'question', isManual: false },
  },
  {
    id: '4',
    type: 'mindMapNode',
    position: { x: 0, y: 0 },
    data: { label: 'Who are the users?', nodeType: 'question', isManual: false },
  },
  {
    id: '5',
    type: 'mindMapNode',
    position: { x: 0, y: 0 },
    data: { label: 'Potential Risks', nodeType: 'risk', isManual: false },
  },
];

const DEMO_EDGES: ThinkEdge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
  { id: 'e1-3', source: '1', target: '3', type: 'bezier' },
  { id: 'e2-4', source: '2', target: '4', type: 'bezier' },
  { id: 'e3-5', source: '3', target: '5', type: 'bezier' },
];

export const useCanvasStore = create<CanvasState>((set) => ({
  nodes: layoutMindMap(DEMO_NODES, DEMO_EDGES),
  edges: DEMO_EDGES,
  selectedNodeId: null,
  layoutVersion: 0,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  removeNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
    })),

  updateNodeData: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } } : n,
      ),
    })),

  setSelectedNode: (id) => set({ selectedNodeId: id }),

  loadMindMap: (nodes, edges) =>
    set((state) => ({
      nodes,
      edges,
      selectedNodeId: null,
      layoutVersion: state.layoutVersion + 1,
    })),
}));
