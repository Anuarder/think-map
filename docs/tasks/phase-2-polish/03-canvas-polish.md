# Task P2-03: Canvas Polish

**Phase:** 2 — Polish & Usability  
**Estimate:** 2-3 days  
**Dependencies:** Phase 1 complete  
**PRD Reference:** Sections 6.2 (CV-07, CV-08, CV-12, CV-15)

---

## Goal

Add polishing features to the canvas: minimap, fit-to-screen, undo/redo, multi-select, and delete operations.

---

## Subtasks

### 3.1 Minimap
- [ ] Add React Flow `<MiniMap>` component
- [ ] Position: bottom-right corner
- [ ] Style: subtle, semi-transparent background
- [ ] Node colors in minimap should match the actual node type colors
- [ ] Clickable: click a spot in the minimap to navigate there

### 3.2 Fit-to-screen
- [ ] Add a "Fit" button to the controls panel
- [ ] Calls `reactFlowInstance.fitView({ padding: 0.15, duration: 500 })`
- [ ] Also triggered after Build (already in Task 08)

### 3.3 Undo / Redo
- [ ] Implement an undo/redo stack in the canvas store
- [ ] Track operations: node move, node edit, node delete, node add, edge changes
- [ ] `undo()` and `redo()` actions
- [ ] Keyboard: `Cmd+Z` (undo), `Cmd+Shift+Z` (redo)
- [ ] Undo button in the controls panel (optional)
- [ ] Stack size limit: 50 operations

### 3.4 Multi-select and delete
- [ ] Shift+click for multi-select (React Flow built-in)
- [ ] Marquee/box selection (React Flow built-in with `selectionOnDrag`)
- [ ] Delete key deletes all selected nodes + their edges
- [ ] Confirmation for deleting 3+ nodes: "Delete X nodes?"

### 3.5 Zoom controls polish
- [ ] Show current zoom level as a percentage near the controls
- [ ] Double-click canvas background to reset zoom to 100%
- [ ] Pinch-to-zoom on trackpad (React Flow handles this)

---

## Acceptance Criteria

- [ ] Minimap visible in bottom-right, interactive
- [ ] Fit-to-screen button centers all content
- [ ] Undo/Redo works for node moves, edits, deletes
- [ ] Cmd+Z / Cmd+Shift+Z keyboard shortcuts work
- [ ] Multi-select with Shift+click and box selection
- [ ] Delete key removes selected nodes
- [ ] Zoom level displayed
