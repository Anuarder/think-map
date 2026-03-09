# Think — Implementation Tasks

## Task Structure

Each phase has its own folder. Each task is a markdown file with:
- Clear description and goal
- Subtasks with checkboxes
- Acceptance criteria
- Dependencies on other tasks
- Technical notes

## Execution Order

Tasks within a phase should generally be done in order (01, 02, 03...) since later tasks depend on earlier ones. Some tasks can be parallelized — dependencies are noted in each file.

---

## Phase 1 — MVP (4-6 weeks)

| # | Task | Est. | Dependencies |
|---|---|---|---|
| 01 | [Project Setup](phase-1-mvp/01-project-setup.md) | 1-2 days | None |
| 02 | [Tauri Backend & SQLite](phase-1-mvp/02-tauri-backend-sqlite.md) | 2-3 days | 01 |
| 03 | [App Shell & Layout](phase-1-mvp/03-app-shell-layout.md) | 1-2 days | 01 |
| 04 | [Canvas & Mind Map Nodes](phase-1-mvp/04-canvas-mind-map.md) | 3-4 days | 03 |
| 05 | [Chat Sidebar](phase-1-mvp/05-chat-sidebar.md) | 2-3 days | 03 |
| 06 | [AI Integration & Provider Layer](phase-1-mvp/06-ai-integration.md) | 2-3 days | 01 |
| 07 | [OAuth Authentication](phase-1-mvp/07-oauth-authentication.md) | 2-3 days | 02, 06 |
| 08 | [Build Feature (Chat → Mind Map)](phase-1-mvp/08-build-feature.md) | 3-4 days | 04, 05, 06 |
| 09 | [Project Persistence](phase-1-mvp/09-project-persistence.md) | 2-3 days | 02, 04, 05 |

**Can be parallelized:**
- Tasks 02 + 03 (backend & frontend shell — independent)
- Tasks 04 + 05 + 06 (canvas, chat, AI service — independent of each other, all need 03)
- Tasks 07 + 08 + 09 (auth, build, persistence — depend on different earlier tasks)

---

## Phase 2 — Polish & Usability (3-4 weeks)

| # | Task | Est. |
|---|---|---|
| 01 | [Project Dashboard](phase-2-polish/01-project-dashboard.md) | 2-3 days |
| 02 | [Node Types & Colors](phase-2-polish/02-node-types-colors.md) | 2-3 days |
| 03 | [Canvas Polish](phase-2-polish/03-canvas-polish.md) | 2-3 days |
| 04 | [Rebuild & Node Context](phase-2-polish/04-rebuild-node-context.md) | 3-4 days |
| 05 | [Sidebar Polish](phase-2-polish/05-sidebar-polish.md) | 2-3 days |
| 06 | [Settings & Multi-Provider](phase-2-polish/06-settings-multi-provider.md) | 3-4 days |
| 07 | [Offline Mode](phase-2-polish/07-offline-mode.md) | 1-2 days |

---

## Phase 3 — Advanced Features (4-6 weeks)

| # | Task | Est. |
|---|---|---|
| 01 | [Manual Canvas Editing](phase-3-advanced/01-manual-canvas-editing.md) | 3-4 days |
| 02 | [Export System](phase-3-advanced/02-export-system.md) | 2-3 days |
| 03 | [Keyboard Shortcuts](phase-3-advanced/03-keyboard-shortcuts.md) | 2-3 days |
| 04 | [AI Enhancements](phase-3-advanced/04-ai-enhancements.md) | 3-4 days |
| 05 | [Dark Mode & System Integration](phase-3-advanced/05-dark-mode-system.md) | 2-3 days |
| 06 | [Search](phase-3-advanced/06-search.md) | 2-3 days |
