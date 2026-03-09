# Task P3-06: Search

**Phase:** 3 — Advanced Features  
**Estimate:** 2-3 days  
**Dependencies:** Phase 2 complete  
**PRD Reference:** Phase 3 build phase items

---

## Goal

Search across all projects, nodes, and chat messages. Find any idea quickly regardless of which project it's in.

---

## Subtasks

### 6.1 Search UI
- [ ] `Cmd+K` opens a search palette (command palette style)
- [ ] Centered overlay with search input (like Linear, Raycast, Spotlight)
- [ ] Results appear as you type (debounced, 200ms)
- [ ] `Escape` or click outside to close
- [ ] Arrow keys to navigate results, Enter to select

### 6.2 Search backend (Rust)
- [ ] Create Tauri command: `search(query: String) -> Vec<SearchResult>`
- [ ] Search across:
  - Project names (`projects.name`)
  - Node labels (`canvas_data` JSON — need to extract and index)
  - Node descriptions
  - Chat messages (`messages.content`)
- [ ] Use SQLite FTS5 (full-text search) for efficient searching
- [ ] Create FTS virtual tables for indexed content

### 6.3 Search results display
- [ ] Group results by type: Projects, Nodes, Messages
- [ ] Each result shows:
  - Icon (project/node/message)
  - Title/text match (highlighted)
  - Context: which project, brief excerpt
- [ ] Click a project result → open that project
- [ ] Click a node result → open project + select + center on that node
- [ ] Click a message result → open project + scroll to that message

### 6.4 Search indexing
- [ ] Index node labels when projects are saved
- [ ] Index messages when they're created
- [ ] Rebuild index on app startup (or incrementally)
- [ ] Keep FTS tables in sync with main tables

---

## Acceptance Criteria

- [ ] Cmd+K opens search palette
- [ ] Can search across projects, nodes, and messages
- [ ] Results are fast (< 200ms for typical dataset)
- [ ] Clicking a result navigates to the correct location
- [ ] Search highlights matching text
- [ ] Works with 50+ projects and thousands of nodes
