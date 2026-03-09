# Task P2-01: Project Dashboard

**Phase:** 2 — Polish & Usability  
**Estimate:** 2-3 days  
**Dependencies:** Phase 1 complete  
**PRD Reference:** Sections 6.4 (PM-01 to PM-04)

---

## Goal

Build a project dashboard where users can see all their mind maps, create new ones, rename, and delete projects. This replaces the single-project MVP flow with a multi-project experience.

---

## Subtasks

### 1.1 Dashboard page
- [ ] Create `src/features/projects/ProjectDashboard.tsx`
- [ ] Grid or list layout showing all projects
- [ ] Each project card:
  - Project name
  - Last edited timestamp ("2 hours ago", "Yesterday", etc.)
  - Small preview/thumbnail of the mind map (optional — can be a node count instead)
  - Click to open
- [ ] "New Project" button (prominent, top-right or as a card)
- [ ] Empty state: "No projects yet. Create your first one."

### 1.2 Navigation
- [ ] Route: dashboard shows when no project is open
- [ ] Top bar: add a "back to projects" button/icon when inside a project
- [ ] App starts at dashboard (or last opened project — setting)
- [ ] Use simple state-based routing (no need for react-router for 2 screens)

### 1.3 Project CRUD from dashboard
- [ ] Create: click "New Project" → creates project in SQLite → opens it
- [ ] Rename: right-click or kebab menu on card → inline rename
- [ ] Delete: right-click or kebab menu → confirmation dialog → delete from SQLite
- [ ] Confirmation dialog: "Delete 'Project Name'? This cannot be undone."

### 1.4 Project sorting
- [ ] Sort by last edited (default — most recent first)
- [ ] Future: sort by name, created date

### 1.5 Multiple project support
- [ ] Update project service to handle switching between projects
- [ ] On project switch: save current project → clear stores → load new project
- [ ] Ensure no cross-project data leaks

---

## Acceptance Criteria

- [ ] Dashboard shows all projects with name and timestamp
- [ ] Can create, open, rename, and delete projects
- [ ] Navigation between dashboard and project view works
- [ ] Deleting a project removes it from the database and the dashboard
- [ ] Empty state displays when no projects exist
