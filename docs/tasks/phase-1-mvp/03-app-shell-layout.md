# Task 03: App Shell & Layout

**Phase:** 1 — MVP  
**Estimate:** 1-2 days  
**Dependencies:** Task 01 (Project Setup)  
**PRD Reference:** Section 8.3

---

## Goal

Build the main app layout: a top bar, a resizable left sidebar (for chat), and the main canvas area on the right. This is the structural skeleton that all other features plug into.

---

## Subtasks

### 3.1 App layout component
- [ ] Create `src/App.tsx` with the two-panel layout:

```
┌──────────────────────────────────────────┐
│  Top Bar                                  │
├────────────┬─────────────────────────────┤
│  Sidebar   │  Canvas Area                 │
│  (chat)    │                              │
│            │                              │
│  resizable │                              │
└────────────┴─────────────────────────────┘
```

- [ ] Sidebar: fixed left panel, default width 320px
- [ ] Canvas: fills remaining space (`flex-1`)
- [ ] Use Tailwind for layout: `flex`, `h-screen`, `overflow-hidden`

### 3.2 Resizable sidebar
- [ ] Implement a drag handle between sidebar and canvas
- [ ] Min width: 280px, max width: 480px
- [ ] Store width in local state (Zustand later for persistence)
- [ ] Smooth resize with cursor change (`col-resize`)
- [ ] Option: use a library like `react-resizable-panels` or build custom
  - Recommendation: `react-resizable-panels` — small, well-maintained, handles edge cases

### 3.3 Top bar
- [ ] Create `src/components/TopBar.tsx`
- [ ] Left: app icon/logo + "Think" text
- [ ] Center: project name (editable later, static placeholder for now)
- [ ] Right: settings gear icon button (opens nothing yet)
- [ ] Height: 48px, border-bottom, subtle background
- [ ] Use Tailwind: `h-12 border-b flex items-center justify-between px-4`

### 3.4 Sidebar collapse toggle
- [ ] Add a toggle button to collapse/expand the sidebar
- [ ] When collapsed: sidebar width = 0, button stays visible on the edge
- [ ] Smooth transition: `transition-all duration-200`
- [ ] Keyboard shortcut: `Cmd+\` or `Cmd+B` to toggle (register later in Phase 3)

### 3.5 Placeholder content
- [ ] Sidebar: placeholder text "Chat will go here"
- [ ] Canvas area: placeholder text "Canvas will go here"
- [ ] These will be replaced by the actual components in Tasks 04 and 05

### 3.6 App-level Zustand store
- [ ] Create `src/stores/app-store.ts`
- [ ] State: `sidebarWidth`, `isSidebarCollapsed`
- [ ] Actions: `setSidebarWidth`, `toggleSidebar`
- [ ] This store handles app-level UI state

---

## Acceptance Criteria

- [ ] Two-panel layout renders correctly in the Tauri window
- [ ] Sidebar is resizable via drag handle (280px–480px)
- [ ] Sidebar can be collapsed and expanded
- [ ] Top bar shows "Think" branding and project name placeholder
- [ ] Layout fills the full window, no overflow/scrollbar issues
- [ ] Responsive to window resizing (canvas stretches, sidebar stays fixed width)
- [ ] No layout shift or flicker on resize

---

## Technical Notes

- The layout must be `h-screen` and `overflow-hidden` to prevent page scrolling — the canvas handles its own scroll/pan
- Use CSS `user-select: none` on the resize handle to prevent text selection during drag
- `react-resizable-panels` is ~3KB gzipped and handles accessibility (keyboard resizing)
- The sidebar will eventually contain the chat (Task 05) and the canvas area will contain React Flow (Task 04)
- Keep the top bar very minimal — Think's philosophy is "calm, focused, minimal"
