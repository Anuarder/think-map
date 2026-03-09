# Task 03: App Shell & Layout

**Phase:** 1 — MVP  
**Estimate:** 1-2 days  
**Dependencies:** Task 01 (Project Setup)  
**PRD Reference:** Section 8.3  
**Status:** ✅ Done

---

## Goal

Build the main app layout: a top bar, a resizable left sidebar (for chat), and the main canvas area on the right. This is the structural skeleton that all other features plug into.

---

## Subtasks

### 3.1 App layout component
- [x] Create `src/App.tsx` with the two-panel layout:

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

- [x] Sidebar: fixed left panel, default width 320px
- [x] Canvas: fills remaining space (`flex-1`)
- [x] Use Tailwind for layout: `flex`, `h-screen`, `overflow-hidden`

### 3.2 Resizable sidebar
- [x] Implement a drag handle between sidebar and canvas
- [x] Min width: 280px, max width: 480px
- [x] Store width in local state (Zustand later for persistence)
- [x] Smooth resize with cursor change (`col-resize`)
- [x] Option: use a library like `react-resizable-panels` or build custom
  - Recommendation: `react-resizable-panels` — small, well-maintained, handles edge cases

### 3.3 Top bar
- [x] Create `src/components/TopBar.tsx`
- [x] Left: app icon/logo + "Think" text
- [x] Center: project name (editable later, static placeholder for now)
- [x] Right: settings gear icon button (opens nothing yet)
- [x] Height: 48px, border-bottom, subtle background
- [x] Use Tailwind: `h-12 border-b flex items-center justify-between px-4`

### 3.4 Sidebar collapse toggle
- [x] Add a toggle button to collapse/expand the sidebar
- [x] When collapsed: sidebar width = 0, button stays visible on the edge
- [x] Smooth transition: `transition-all duration-200`
- [x] Keyboard shortcut: `Cmd+\` or `Cmd+B` to toggle (register later in Phase 3)

### 3.5 Placeholder content
- [x] Sidebar: placeholder text "Chat will go here"
- [x] Canvas area: placeholder text "Canvas will go here"
- [x] These will be replaced by the actual components in Tasks 04 and 05

### 3.6 App-level Zustand store
- [x] Create `src/stores/app-store.ts`
- [x] State: `sidebarWidth`, `isSidebarCollapsed`
- [x] Actions: `setSidebarWidth`, `toggleSidebar`
- [x] This store handles app-level UI state

---

## Acceptance Criteria

- [x] Two-panel layout renders correctly in the Tauri window
- [x] Sidebar is resizable via drag handle (280px–480px)
- [x] Sidebar can be collapsed and expanded
- [x] Top bar shows "Think" branding and project name placeholder
- [x] Layout fills the full window, no overflow/scrollbar issues
- [x] Responsive to window resizing (canvas stretches, sidebar stays fixed width)
- [x] No layout shift or flicker on resize

---

## Technical Notes

- The layout must be `h-screen` and `overflow-hidden` to prevent page scrolling — the canvas handles its own scroll/pan
- Use CSS `user-select: none` on the resize handle to prevent text selection during drag
- `react-resizable-panels` is ~3KB gzipped and handles accessibility (keyboard resizing)
- The sidebar will eventually contain the chat (Task 05) and the canvas area will contain React Flow (Task 04)
- Keep the top bar very minimal — Think's philosophy is "calm, focused, minimal"
