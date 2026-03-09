export interface Project {
  id: string;
  name: string;
  canvas_data: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectSummary {
  id: string;
  name: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  project_id: string;
  role: 'user' | 'assistant';
  content: string;
  linked_node_ids: string;
  created_at: string;
}

export interface MindMapNodeData {
  label: string;
  description?: string;
  nodeType: 'idea' | 'question' | 'action' | 'note' | 'risk';
  color?: string;
  isManual: boolean;
  sourceMessageIds?: string[];
}

export interface ThinkNode {
  id: string;
  type: 'mindMapNode';
  position: { x: number; y: number };
  data: MindMapNodeData;
  parentId?: string;
}

export interface ThinkEdge {
  id: string;
  source: string;
  target: string;
  type: 'smoothstep' | 'bezier';
  label?: string;
  style?: { stroke: string; strokeDasharray?: string };
  animated?: boolean;
}

export interface CanvasData {
  nodes: ThinkNode[];
  edges: ThinkEdge[];
  viewport: {
    x: number;
    y: number;
    zoom: number;
  };
}

export interface MindMapStructure {
  rootNode: MindMapNode;
}

export interface MindMapNode {
  text: string;
  description?: string;
  type: 'idea' | 'question' | 'action' | 'note' | 'risk';
  children: MindMapNode[];
}
