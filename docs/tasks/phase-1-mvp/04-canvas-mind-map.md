# Task 04: Canvas & Mind Map Nodes

**Phase:** 1 — MVP  
**Estimate:** 3-4 days  
**Dependencies:** Task 03 (App Shell & Layout)  
**PRD Reference:** Sections 6.2, 7, 8.4, 9.3

---

## Goal

Implement the infinite canvas using React Flow. Create the custom mind map node component, edge styling, auto-layout with dagre, and basic interactions (drag, select, inline edit). This is the visual heart of Think.

---

## Subtasks

### 4.1 React Flow setup
- [ ] Create `src/features/canvas/MindMapCanvas.tsx`
- [ ] Initialize `<ReactFlow>` with basic config:
  - `fitView` on initial load
  - `snapToGrid={false}`
  - `panOnDrag={true}` (left mouse button)
  - `zoomOnScroll={true}`
  - `selectionOnDrag={true}` (for marquee selection)
- [ ] Add `<Background variant="dots" />` component (subtle dot grid)
- [ ] Add `<Controls />` component (zoom in/out/fit buttons, bottom-left)
- [ ] Plug this component into the canvas area of the app shell (Task 03)

### 4.2 Canvas Zustand store
- [ ] Create `src/stores/canvas-store.ts`
- [ ] State:
  - `nodes: ThinkNode[]`
  - `edges: ThinkEdge[]`
  - `selectedNodeId: string | null`
- [ ] Actions:
  - `setNodes(nodes)` / `setEdges(edges)`
  - `onNodesChange(changes)` — React Flow's node change handler
  - `onEdgesChange(changes)` — React Flow's edge change handler
  - `addNode(node)` / `removeNode(id)`
  - `updateNodeData(id, data)` — update a node's label, description, etc.
  - `setSelectedNode(id | null)`
  - `loadMindMap(nodes, edges)` — bulk load from Build or from saved project
- [ ] Connect store to `<ReactFlow>` via `nodes`, `edges`, `onNodesChange`, `onEdgesChange` props

### 4.3 Custom mind map node
- [ ] Create `src/features/canvas/MindMapNode.tsx`
- [ ] Register as React Flow custom node type: `nodeTypes={{ mindMapNode: MindMapNode }}`
- [ ] Visual design:
  - Rounded rectangle (`rounded-xl`)
  - Subtle shadow (`shadow-sm`)
  - White background with colored left border (color based on `nodeType`)
  - Label text: 14-16px, semi-bold
  - Padding: `px-4 py-3`
  - Min width: 120px, max width: 280px
- [ ] Show a small type badge/icon (idea 💡, question ❓, action ✅, note 📝, risk ⚠️) — or use colored dots instead of emoji
- [ ] Source handle (bottom center) + target handle (top center) for connections
- [ ] Selected state: blue border ring (`ring-2 ring-blue-500`)
- [ ] Hover state: slight elevation change

### 4.4 Inline text editing
- [ ] Double-click a node → enters edit mode
- [ ] Edit mode: replace label with `<input>` or `<textarea>` (auto-focused)
- [ ] Press Enter or click outside → save, exit edit mode
- [ ] Press Escape → cancel edit, revert to original text
- [ ] Update the Zustand store on save
- [ ] Prevent React Flow from handling drag events while editing (stop propagation)

### 4.5 Edge styling
- [ ] Default edge type: `bezier` (smooth curves)
- [ ] Edge color: light gray (`#d1d5db`) for normal, slightly darker for hover
- [ ] Edge width: 1.5px
- [ ] Animate new edges briefly when mind map is generated (optional)
- [ ] Style in a custom edge component or via `defaultEdgeOptions`

### 4.6 Auto-layout with dagre
- [ ] Create `src/lib/layout.ts`
- [ ] Function: `layoutMindMap(nodes: ThinkNode[], edges: ThinkEdge[]): ThinkNode[]`
  - Uses dagre to compute positions
  - Direction: top-to-bottom (`TB`) or left-to-right (`LR`) — try both, pick what looks better for mind maps (LR is more traditional for mind maps)
  - Node spacing: `nodesep: 50`, `ranksep: 80` (adjust for visual comfort)
- [ ] Returns nodes with updated `position` fields
- [ ] Used after Build generates the structure (Task 08) and when manually adding nodes
- [ ] Test: create 10 dummy nodes with parent-child edges, run layout, verify positions are reasonable

### 4.7 Fit view helpers
- [ ] After layout or after Build: call `reactFlowInstance.fitView({ padding: 0.2 })` to center the map
- [ ] Add a "Fit" button in the React Flow `<Controls>` or as a custom control

### 4.8 Type definitions
- [ ] Create `src/types/mind-map.ts` with all types from PRD Section 7:
  - `MindMapNodeData`
  - `ThinkNode`
  - `ThinkEdge`
  - `MindMapStructure` (AI Build output)
- [ ] Export and use throughout the app

---

## Acceptance Criteria

- [ ] React Flow canvas renders in the main area with dot grid background
- [ ] Can display nodes with the custom mind map node design
- [ ] Nodes are draggable
- [ ] Edges connect nodes with smooth bezier curves
- [ ] Double-click a node to edit its text inline
- [ ] `layoutMindMap()` correctly positions nodes in a tree structure
- [ ] Controls (zoom, fit) are visible and functional
- [ ] Canvas pans and zooms smoothly
- [ ] Selected node has a visual highlight
- [ ] All TypeScript types are defined and used (no `any`)

---

## Technical Notes

- React Flow requires wrapping in `<ReactFlowProvider>` if using `useReactFlow()` hook outside the component
- Use `useCallback` for node/edge change handlers to prevent unnecessary rerenders
- dagre expects `width` and `height` for each node — estimate based on label length or use fixed size (200x60)
- React Flow's `fitView` should be called after a short `setTimeout` to ensure nodes are rendered first
- Consider `proOptions={{ hideAttribution: false }}` — React Flow requires attribution on free tier, or buy a pro license to remove it
- The node type color mapping (idea = blue, question = amber, action = green, etc.) should be defined as a constant/config
