# Task 04: Canvas & Mind Map Nodes

**Phase:** 1 — MVP  
**Estimate:** 3-4 days  
**Dependencies:** Task 03 (App Shell & Layout)  
**PRD Reference:** Sections 6.2, 7, 8.4, 9.3  
**Status:** ✅ Done

---

## Goal

Implement the infinite canvas using React Flow. Create the custom mind map node component, edge styling, auto-layout with dagre, and basic interactions (drag, select, inline edit). This is the visual heart of Think.

---

## Subtasks

### 4.1 React Flow setup
- [x] Create `src/features/canvas/MindMapCanvas.tsx`
- [x] Initialize `<ReactFlow>` with basic config:
  - `fitView` on initial load
  - `snapToGrid={false}`
  - `panOnDrag={true}` (left mouse button)
  - `zoomOnScroll={true}`
  - `selectionOnDrag={true}` (for marquee selection)
- [x] Add `<Background variant="dots" />` component (subtle dot grid)
- [x] Add `<Controls />` component (zoom in/out/fit buttons, bottom-left)
- [x] Plug this component into the canvas area of the app shell (Task 03)

### 4.2 Canvas Zustand store
- [x] Create `src/stores/canvas-store.ts`
- [x] State:
  - `nodes: ThinkNode[]`
  - `edges: ThinkEdge[]`
  - `selectedNodeId: string | null`
- [x] Actions:
  - `setNodes(nodes)` / `setEdges(edges)`
  - `onNodesChange(changes)` — React Flow's node change handler
  - `onEdgesChange(changes)` — React Flow's edge change handler
  - `addNode(node)` / `removeNode(id)`
  - `updateNodeData(id, data)` — update a node's label, description, etc.
  - `setSelectedNode(id | null)`
  - `loadMindMap(nodes, edges)` — bulk load from Build or from saved project
- [x] Connect store to `<ReactFlow>` via `nodes`, `edges`, `onNodesChange`, `onEdgesChange` props

### 4.3 Custom mind map node
- [x] Create `src/features/canvas/MindMapNode.tsx`
- [x] Register as React Flow custom node type: `nodeTypes={{ mindMapNode: MindMapNode }}`
- [x] Visual design:
  - Rounded rectangle (`rounded-xl`)
  - Subtle shadow (`shadow-sm`)
  - White background with colored left border (color based on `nodeType`)
  - Label text: 14-16px, semi-bold
  - Padding: `px-4 py-3`
  - Min width: 120px, max width: 280px
- [x] Show a small type badge/icon (idea 💡, question ❓, action ✅, note 📝, risk ⚠️) — or use colored dots instead of emoji
- [x] Source handle (bottom center) + target handle (top center) for connections
- [x] Selected state: blue border ring (`ring-2 ring-blue-500`)
- [x] Hover state: slight elevation change

### 4.4 Inline text editing
- [x] Double-click a node → enters edit mode
- [x] Edit mode: replace label with `<input>` or `<textarea>` (auto-focused)
- [x] Press Enter or click outside → save, exit edit mode
- [x] Press Escape → cancel edit, revert to original text
- [x] Update the Zustand store on save
- [x] Prevent React Flow from handling drag events while editing (stop propagation)

### 4.5 Edge styling
- [x] Default edge type: `bezier` (smooth curves)
- [x] Edge color: light gray (`#d1d5db`) for normal, slightly darker for hover
- [x] Edge width: 1.5px
- [x] Animate new edges briefly when mind map is generated (optional)
- [x] Style in a custom edge component or via `defaultEdgeOptions`

### 4.6 Auto-layout with dagre
- [x] Create `src/lib/layout.ts`
- [x] Function: `layoutMindMap(nodes: ThinkNode[], edges: ThinkEdge[]): ThinkNode[]`
  - Uses dagre to compute positions
  - Direction: top-to-bottom (`TB`) or left-to-right (`LR`) — try both, pick what looks better for mind maps (LR is more traditional for mind maps)
  - Node spacing: `nodesep: 50`, `ranksep: 80` (adjust for visual comfort)
- [x] Returns nodes with updated `position` fields
- [x] Used after Build generates the structure (Task 08) and when manually adding nodes
- [x] Test: create 10 dummy nodes with parent-child edges, run layout, verify positions are reasonable

### 4.7 Fit view helpers
- [x] After layout or after Build: call `reactFlowInstance.fitView({ padding: 0.2 })` to center the map
- [x] Add a "Fit" button in the React Flow `<Controls>` or as a custom control

### 4.8 Type definitions
- [x] Create `src/types/mind-map.ts` with all types from PRD Section 7:
  - `MindMapNodeData`
  - `ThinkNode`
  - `ThinkEdge`
  - `MindMapStructure` (AI Build output)
- [x] Export and use throughout the app

---

## Acceptance Criteria

- [x] React Flow canvas renders in the main area with dot grid background
- [x] Can display nodes with the custom mind map node design
- [x] Nodes are draggable
- [x] Edges connect nodes with smooth bezier curves
- [x] Double-click a node to edit its text inline
- [x] `layoutMindMap()` correctly positions nodes in a tree structure
- [x] Controls (zoom, fit) are visible and functional
- [x] Canvas pans and zooms smoothly
- [x] Selected node has a visual highlight
- [x] All TypeScript types are defined and used (no `any`)

---

## Technical Notes

- React Flow requires wrapping in `<ReactFlowProvider>` if using `useReactFlow()` hook outside the component
- Use `useCallback` for node/edge change handlers to prevent unnecessary rerenders
- dagre expects `width` and `height` for each node — estimate based on label length or use fixed size (200x60)
- React Flow's `fitView` should be called after a short `setTimeout` to ensure nodes are rendered first
- Consider `proOptions={{ hideAttribution: false }}` — React Flow requires attribution on free tier, or buy a pro license to remove it
- The node type color mapping (idea = blue, question = amber, action = green, etc.) should be defined as a constant/config
