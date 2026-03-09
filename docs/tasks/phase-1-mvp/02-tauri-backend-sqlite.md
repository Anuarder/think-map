# Task 02: Tauri Backend & SQLite

**Phase:** 1 — MVP  
**Estimate:** 2-3 days  
**Dependencies:** Task 01 (Project Setup)  
**PRD Reference:** Section 9.7

---

## Goal

Set up the Rust backend in Tauri: SQLite database for persistent storage, Tauri commands for CRUD operations, and the IPC bridge so the React frontend can read/write data.

---

## Subtasks

### 2.1 Add SQLite to Tauri
- [x] Add `tauri-plugin-sql` to `Cargo.toml` or use `rusqlite` directly
- [x] Evaluate: `tauri-plugin-sql` (simpler, built-in migrations) vs raw `rusqlite` (more control)
- [x] Choose one approach and install the dependency
- [x] Configure the database path: `~/.think/think.db` (use Tauri's app data dir)
- [x] Ensure the directory is created on first launch if it doesn't exist

### 2.2 Create database schema
- [x] Write the initial migration / schema creation:

```sql
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  canvas_data TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  linked_node_ids TEXT DEFAULT '[]',
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
```

- [x] Run migration on app startup (create tables if not exist)
- [x] Test: launch app, verify `~/.think/think.db` is created with correct tables

### 2.3 Project CRUD commands (Rust → Frontend)
- [x] `create_project(name: String) -> Project` — insert new project, return it
- [x] `get_project(id: String) -> Project` — fetch a single project by ID
- [x] `list_projects() -> Vec<ProjectSummary>` — list all projects (id, name, updated_at)
- [x] `update_project(id: String, name: Option<String>, canvas_data: Option<String>) -> Project` — update fields
- [x] `delete_project(id: String)` — delete project and cascade to messages
- [x] Register all commands in `main.rs` with `tauri::generate_handler![]`

### 2.4 Message CRUD commands
- [x] `create_message(project_id: String, role: String, content: String) -> ChatMessage` — insert message
- [x] `get_messages(project_id: String) -> Vec<ChatMessage>` — all messages for a project, ordered by created_at
- [x] `update_message_links(id: String, linked_node_ids: String)` — update node links after Build
- [x] Register commands

### 2.5 Settings commands
- [x] `get_setting(key: String) -> Option<String>` — read a setting
- [x] `set_setting(key: String, value: String)` — upsert a setting
- [x] Register commands

### 2.6 Frontend bridge (TypeScript)
- [x] Create `src/services/storage.ts` with typed wrappers around Tauri `invoke`:

```typescript
import { invoke } from '@tauri-apps/api/core';

export function createProject(name: string): Promise<Project> {
  return invoke('create_project', { name });
}

export function listProjects(): Promise<ProjectSummary[]> {
  return invoke('list_projects');
}

// ... etc
```

- [x] Create TypeScript types that match the Rust return types
- [x] Test: call `createProject` from React, verify it appears in SQLite

### 2.7 Secure token storage setup
- [x] Add `tauri-plugin-stronghold` to `Cargo.toml`
- [x] Configure Stronghold for encrypted storage (for OAuth tokens later)
- [x] Create basic `save_secret(key, value)` and `get_secret(key)` Tauri commands
- [x] This will be used by Task 07 (OAuth) for token storage

---

## Acceptance Criteria

- [x] App launches and creates `~/.think/think.db` with correct schema
- [x] Can create, read, update, delete projects via Tauri commands from React
- [x] Can create and list messages for a project
- [x] Settings can be stored and retrieved
- [x] Stronghold is initialized for future secret storage
- [x] All TypeScript types match Rust return types (no `any`)
- [x] Database operations handle errors gracefully (no panics)

---

## Technical Notes

- Use `serde` for Rust struct serialization/deserialization
- All Tauri commands should return `Result<T, String>` for error handling
- `canvas_data` is stored as a JSON string — not parsed by Rust, just passed through
- Timestamps should be ISO 8601 format (`2026-03-09T12:00:00Z`)
- Consider using `ON DELETE CASCADE` on the `messages.project_id` foreign key
- The Stronghold vault file lives alongside the database in `~/.think/`
