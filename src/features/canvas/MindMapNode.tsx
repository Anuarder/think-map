import { useState, useRef, useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import type { MindMapNodeData, ThinkNode } from '../../types/mind-map';
import { useCanvasStore } from '../../stores/canvas-store';

const NODE_TYPE_CONFIG: Record<
  MindMapNodeData['nodeType'],
  { borderColor: string; dotColor: string }
> = {
  idea: { borderColor: 'border-blue-400', dotColor: 'bg-blue-400' },
  question: { borderColor: 'border-amber-400', dotColor: 'bg-amber-400' },
  action: { borderColor: 'border-green-400', dotColor: 'bg-green-400' },
  note: { borderColor: 'border-gray-400', dotColor: 'bg-gray-400' },
  risk: { borderColor: 'border-red-400', dotColor: 'bg-red-400' },
};

export function MindMapNode({ id, data, selected }: NodeProps<ThinkNode>) {
  const updateNodeData = useCanvasStore((s) => s.updateNodeData);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);

  const config = NODE_TYPE_CONFIG[data.nodeType] ?? NODE_TYPE_CONFIG.idea;

  const enterEditMode = useCallback(() => {
    setEditValue(data.label);
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [data.label]);

  const saveEdit = useCallback(() => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== data.label) {
      updateNodeData(id, { label: trimmed });
    }
    setIsEditing(false);
  }, [editValue, data.label, id, updateNodeData]);

  const cancelEdit = useCallback(() => {
    setEditValue(data.label);
    setIsEditing(false);
  }, [data.label]);

  function handleDoubleClick(e: React.MouseEvent) {
    e.stopPropagation();
    enterEditMode();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  }

  function handleInputMouseDown(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={[
        'group relative min-w-[120px] max-w-[280px] rounded-xl border-l-4 bg-white px-4 py-3 shadow-sm transition-shadow',
        config.borderColor,
        selected ? 'ring-2 ring-blue-500' : 'hover:shadow-md',
      ].join(' ')}
    >
      <Handle type="target" position={Position.Left} className="border-gray-300! bg-white!" />

      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 shrink-0 rounded-full ${config.dotColor}`} />

        {isEditing ? (
          <input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKeyDown}
            onMouseDown={handleInputMouseDown}
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-gray-800 outline-none"
          />
        ) : (
          <span className="select-none text-sm font-semibold leading-snug text-gray-800">
            {data.label}
          </span>
        )}
      </div>

      {data.description && !isEditing && (
        <p className="mt-1 line-clamp-2 text-xs leading-snug text-gray-500">{data.description}</p>
      )}

      <Handle type="source" position={Position.Right} className="border-gray-300! bg-white!" />
    </div>
  );
}
