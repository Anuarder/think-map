# Task P3-03: Keyboard Shortcuts

**Phase:** 3 — Advanced Features  
**Estimate:** 2-3 days  
**Dependencies:** Phase 2 complete  
**PRD Reference:** Section 6.2 (CV-16)

---

## Goal

Comprehensive keyboard shortcuts for power users: node operations, canvas navigation, and app-level commands.

---

## Subtasks

### 3.1 Shortcut system
- [ ] Create `src/lib/keyboard-shortcuts.ts`
- [ ] Central registry for all shortcuts
- [ ] Handle Cmd (macOS) / Ctrl (Linux) modifier
- [ ] Prevent conflicts with browser/system shortcuts
- [ ] Shortcuts only active when canvas is focused (not during text editing)

### 3.2 Node shortcuts
- [ ] `Tab` — add sibling node (same parent as selected)
- [ ] `Enter` — add child node to selected
- [ ] `Delete` / `Backspace` — delete selected node(s)
- [ ] `F2` or `Enter` on selected — edit node text
- [ ] `Escape` — deselect all / cancel edit

### 3.3 Canvas shortcuts
- [ ] `Cmd+Z` — undo
- [ ] `Cmd+Shift+Z` — redo
- [ ] `Cmd+A` — select all nodes
- [ ] `Cmd+0` — fit to screen
- [ ] `Cmd++` / `Cmd+-` — zoom in/out
- [ ] `Space + drag` — pan (alternative to middle mouse)

### 3.4 App shortcuts
- [ ] `Cmd+B` — toggle sidebar
- [ ] `Cmd+N` — new project
- [ ] `Cmd+S` — force save (even though auto-save exists)
- [ ] `Cmd+E` — export menu
- [ ] `Cmd+,` — open settings
- [ ] `Cmd+Enter` — trigger Build

### 3.5 Shortcut help
- [ ] `Cmd+/` or `?` — show shortcuts cheat sheet overlay
- [ ] Overlay: grouped list of all shortcuts
- [ ] Press any key to dismiss

---

## Acceptance Criteria

- [ ] All listed shortcuts work correctly
- [ ] Shortcuts don't fire during text editing (input, textarea)
- [ ] Cmd vs Ctrl handled per platform
- [ ] Cheat sheet shows all shortcuts
- [ ] No conflicts with system shortcuts
