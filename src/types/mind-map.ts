import type { Node, Edge } from '@xyflow/react';

export interface MindMapNodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  nodeType: 'idea' | 'question' | 'action' | 'note' | 'risk';
  color?: string;
  isManual: boolean;
  sourceMessageIds?: string[];
}

export type ThinkNode = Node<MindMapNodeData, 'mindMapNode'>;

export type ThinkEdge = Edge<Record<string, unknown>>;

export interface MindMapStructure {
  rootNode: MindMapStructureNode;
}

export interface MindMapStructureNode {
  text: string;
  description?: string;
  type: 'idea' | 'question' | 'action' | 'note' | 'risk';
  children: MindMapStructureNode[];
}
