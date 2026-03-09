# Task P2-02: Node Types & Color Coding

**Phase:** 2 — Polish & Usability  
**Estimate:** 2-3 days  
**Dependencies:** Phase 1 complete  
**PRD Reference:** Sections 6.2 (CV-09, CV-11)

---

## Goal

Add visual differentiation for node types (idea, question, action, note, risk) with distinct colors, icons, and styles. Allow users to manually change node colors and types.

---

## Subtasks

### 2.1 Node type visual system
- [ ] Define color palette for each node type:
  - **Idea** (default): Blue (`#3B82F6`) — the primary creative thought
  - **Question**: Amber (`#F59E0B`) — unresolved, needs exploration
  - **Action**: Green (`#10B981`) — next step, to-do
  - **Note**: Gray (`#6B7280`) — supplementary context
  - **Risk**: Red (`#EF4444`) — concern, blocker
- [ ] Create `src/lib/node-theme.ts` with the color/icon mapping
- [ ] Each type gets: border color, background tint, icon

### 2.2 Update MindMapNode component
- [ ] Left border color matches node type
- [ ] Subtle background tint (e.g., blue-50 for idea, amber-50 for question)
- [ ] Small icon or badge showing the type (top-left or inline)
- [ ] Type is readable at a glance without hovering

### 2.3 Node context menu
- [ ] Right-click a node → context menu appears:
  - Change type → submenu with all 5 types
  - Change color → color picker with predefined palette
  - Edit description → opens description panel
  - Delete node
- [ ] Use a lightweight custom context menu (not browser default)
- [ ] Keyboard shortcut: `Delete` or `Backspace` to delete selected node(s)

### 2.4 Branch color inheritance
- [ ] When a parent node's color is set, edges to children inherit the color
- [ ] Creates visual "color coding" for entire branches
- [ ] User can override child colors individually

### 2.5 Node description panel
- [ ] Click a node → show expanded description below the chat or in a panel
- [ ] Description is editable (textarea)
- [ ] Saved to the node's `data.description`
- [ ] AI-generated descriptions from Build are pre-filled here

---

## Acceptance Criteria

- [ ] Each node type has a distinct visual style (color + icon)
- [ ] Can change a node's type via context menu
- [ ] Can change a node's color
- [ ] Branch coloring works (edges match parent color)
- [ ] Node descriptions can be viewed and edited
- [ ] AI-generated nodes come with correct types and colors from Build
