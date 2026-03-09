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

export type { MindMapNodeData, ThinkNode, ThinkEdge, MindMapStructure, MindMapStructureNode } from './mind-map';
