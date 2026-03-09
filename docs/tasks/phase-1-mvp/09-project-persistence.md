# Task 09: Project Persistence

**Phase:** 1 — MVP  
**Estimate:** 2-3 days  
**Dependencies:** Task 02 (Tauri Backend), Task 04 (Canvas), Task 05 (Chat Sidebar)  
**PRD Reference:** Sections 6.4, 9.7

---

## Goal

Wire up saving and loading so that everything persists between app sessions. When the user closes Think and reopens it, their project, conversation, and mind map are exactly where they left off. Auto-save on every change.

---

## Subtasks

### 9.1 Project save logic
- [ ] Create `src/services/project-service.ts`
- [ ] `saveProject()` function:
  - Serialize canvas state: `{ nodes, edges, viewport }` → JSON string
  - Call Tauri command `update_project(id, name, canvas_data)`
  - Should be called on every meaningful change (debounced)
- [ ] `saveMessages()` function:
  - After each new message, call `create_message(projectId, role, content)`
  - Messages are saved immediately (not debounced)

### 9.2 Auto-save with debounce
- [ ] Create `src/lib/auto-save.ts`
- [ ] Debounced save: 1-2 seconds after last change
- [ ] Track what triggers a save:
  - Node position changed (drag)
  - Node text edited
  - Node added or removed
  - Edge added or removed
  - Viewport changed (pan/zoom) — save less frequently (5 seconds)
- [ ] Use Zustand's `subscribe` to watch for store changes
- [ ] Show a subtle save indicator in the top bar: "Saving..." → "Saved ✓" (fades after 2s)

### 9.3 Project load logic
- [ ] `loadProject(id: string)` function:
  - Call Tauri command `get_project(id)` → get project data
  - Parse `canvas_data` JSON → nodes, edges, viewport
  - Load into canvas store: `canvasStore.loadMindMap(nodes, edges)`
  - Set React Flow viewport
  - Call Tauri command `get_messages(id)` → get chat history
  - Load into chat store: `chatStore.loadMessages(messages)`
- [ ] Call on app startup (load last opened project)

### 9.4 Create new project flow
- [ ] On first launch (no projects exist):
  - Auto-create a project named "Untitled" 
  - Save to SQLite immediately
  - Load it as the current project
- [ ] Store `last_project_id` in settings table
- [ ] On subsequent launches: load `last_project_id` from settings → load that project

### 9.5 Project name editing
- [ ] Make the project name in the top bar editable:
  - Click on name → inline edit (input field)
  - Enter → save, blur → save, Escape → cancel
  - Save name via `update_project(id, name)`
- [ ] Default name for new projects: "Untitled"

### 9.6 Zustand persistence middleware (optional)
- [ ] Evaluate: use Zustand's `persist` middleware for UI state (sidebar width, etc.)
  - Pros: automatic, no manual save/load code
  - Cons: uses localStorage by default, need custom storage adapter for SQLite
- [ ] Decision: use for non-critical UI state (sidebar width), use manual save for project data

### 9.7 Data integrity
- [ ] Handle save failures gracefully:
  - If SQLite write fails: retry once, then show error toast
  - Never lose user data silently
- [ ] Handle load failures:
  - If project data is corrupted: show error, offer to start fresh
  - If database is missing: create it (migration handles this)
- [ ] Handle concurrent saves: debounce prevents rapid-fire writes, but ensure sequential writes don't conflict

---

## Acceptance Criteria

- [ ] Close and reopen the app → project, mind map, and conversation are intact
- [ ] Drag a node → position is saved (verify by reloading)
- [ ] Edit a node → text is saved
- [ ] Chat messages persist across restarts
- [ ] Viewport (zoom/pan position) is restored
- [ ] Save indicator shows in the top bar
- [ ] New project is auto-created on first launch
- [ ] Project name can be edited in the top bar
- [ ] No data loss on normal app close
- [ ] Save errors show a non-intrusive notification

---

## Technical Notes

- Debounce: 1-2 seconds is the sweet spot — fast enough to not lose work, slow enough to not spam SQLite
- `canvas_data` is a JSON string containing the full React Flow state — nodes, edges, viewport. This is read/written atomically.
- Messages are stored individually (one row per message) for future querying and linking
- React Flow's `onViewportChange` fires frequently during pan/zoom — debounce separately (5 seconds)
- Use `nanoid` for project IDs — shorter and URL-safe compared to UUID
- Consider using `requestIdleCallback` for save operations to avoid blocking UI
- The "Saved ✓" indicator should use a timeout to fade out, not an animation (simpler, fewer rerenders)
