# Task P3-01: Manual Canvas Editing

**Phase:** 3 — Advanced Features  
**Estimate:** 3-4 days  
**Dependencies:** Phase 2 complete  
**PRD Reference:** Sections 5.3, 6.2 (CV-10, CV-13, CV-14)

---

## Goal

Full manual editing on the canvas: create nodes by double-clicking, draw connections between any two nodes, add sticky notes, and group nodes into frames.

---

## Subtasks

### 1.1 Manual node creation
- [ ] Double-click on empty canvas → creates a new node at that position
- [ ] New node: default type "idea", editable label "New idea", `isManual: true`
- [ ] Immediately enters edit mode (cursor in the label)
- [ ] Added to canvas store and auto-saved

### 1.2 Manual connections
- [ ] Drag from a node's edge handle → draw a connection to another node
- [ ] React Flow's `onConnect` handles this
- [ ] Validate: no duplicate edges, no self-connections
- [ ] New edges styled the same as auto-generated edges

### 1.3 Sticky notes
- [ ] New node type: `stickyNote` (React Flow custom node)
- [ ] Visual: yellow/colored square, larger text area, no handles by default
- [ ] Create via: toolbar button or right-click canvas → "Add sticky note"
- [ ] Editable: click to type, auto-resize
- [ ] Not part of the mind map hierarchy (standalone)

### 1.4 Frames / Groups
- [ ] Select multiple nodes → right-click → "Group into frame"
- [ ] Frame: a labeled container that visually groups nodes
- [ ] React Flow's group node / sub-flow feature
- [ ] Frame is draggable (moves all children)
- [ ] Frame has a title (editable)
- [ ] Nodes can be dragged in/out of frames

### 1.5 Canvas toolbar
- [ ] Add a floating toolbar above the canvas (or in controls area):
  - Select mode (default)
  - Add node
  - Add sticky note
  - Add frame
- [ ] Minimal, non-intrusive design

---

## Acceptance Criteria

- [ ] Can create nodes by double-clicking canvas
- [ ] Can draw connections between any two nodes
- [ ] Sticky notes can be placed anywhere on canvas
- [ ] Nodes can be grouped into frames
- [ ] All manual additions are saved and persist
- [ ] Manual nodes are preserved during rebuild (Task P2-04)
