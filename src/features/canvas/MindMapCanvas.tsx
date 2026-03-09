import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useReactFlow,
} from '@xyflow/react';
import type { NodeChange, EdgeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { MindMapNode } from './MindMapNode';
import { useCanvasStore } from '../../stores/canvas-store';
import type { ThinkNode, ThinkEdge } from '../../types/mind-map';

const nodeTypes = { mindMapNode: MindMapNode };

const defaultEdgeOptions = {
  type: 'bezier',
  style: { stroke: '#d1d5db', strokeWidth: 1.5 },
};

const MINIMAP_NODE_COLORS: Record<string, string> = {
  idea: '#60a5fa',
  question: '#fbbf24',
  action: '#4ade80',
  note: '#9ca3af',
  risk: '#f87171',
};

function minimapNodeColor(node: { data: Record<string, unknown> }): string {
  const nodeType = node.data.nodeType as string | undefined;
  return MINIMAP_NODE_COLORS[nodeType ?? 'idea'] ?? '#60a5fa';
}

function CanvasFlow() {
  const { fitView } = useReactFlow();
  const { nodes, edges, onNodesChange, onEdgesChange, setSelectedNode, layoutVersion } =
    useCanvasStore();

  const handleNodesChange = useCallback(
    (changes: NodeChange<ThinkNode>[]) => {
      onNodesChange(changes);
    },
    [onNodesChange],
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange<ThinkEdge>[]) => {
      onEdgesChange(changes);
    },
    [onEdgesChange],
  );

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: ThinkNode) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode],
  );

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  useEffect(() => {
    if (nodes.length > 0) {
      setTimeout(() => fitView({ padding: 0.2 }), 50);
    }
  }, [layoutVersion, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={handleNodesChange}
      onEdgesChange={handleEdgesChange}
      onNodeClick={handleNodeClick}
      onPaneClick={handlePaneClick}
      defaultEdgeOptions={defaultEdgeOptions}
      fitView
      snapToGrid={false}
      panOnDrag
      zoomOnScroll
      selectionOnDrag
      minZoom={0.1}
      maxZoom={2}
      proOptions={{ hideAttribution: false }}
    >
      <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e5e7eb" />
      <Controls position="bottom-left" />
      <MiniMap
        position="bottom-right"
        nodeColor={minimapNodeColor}
        className="rounded-lg border border-gray-200 shadow-sm"
      />
    </ReactFlow>
  );
}

export function MindMapCanvas() {
  return (
    <div className="h-full w-full">
      <ReactFlowProvider>
        <CanvasFlow />
      </ReactFlowProvider>
    </div>
  );
}
