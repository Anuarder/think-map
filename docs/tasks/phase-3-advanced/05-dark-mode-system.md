# Task P3-05: Dark Mode & System Integration

**Phase:** 3 — Advanced Features  
**Estimate:** 2-3 days  
**Dependencies:** Phase 2 complete  
**PRD Reference:** Phase 3 build phase items

---

## Goal

Add dark mode support (with system preference detection), system tray icon, and Tauri's built-in auto-updater.

---

## Subtasks

### 5.1 Dark mode
- [ ] Define dark color palette for:
  - Canvas background: dark gray (`#1a1a2e` or similar)
  - Dot grid: subtle lighter dots
  - Nodes: dark backgrounds with lighter text
  - Edges: lighter color for visibility
  - Sidebar: dark background
  - Top bar: dark background
  - Input fields: dark with light borders
- [ ] Tailwind `dark:` variant classes throughout all components
- [ ] Three modes: Light, Dark, System (follows OS preference)
- [ ] Detect OS preference via `window.matchMedia('(prefers-color-scheme: dark)')`
- [ ] Or use Tauri's `tauri-plugin-os` for system theme detection
- [ ] Store preference in settings

### 5.2 Theme transition
- [ ] Smooth transition when switching themes (200ms transition on background-color, color)
- [ ] No flash of wrong theme on app startup (apply theme before first render)

### 5.3 System tray
- [ ] Add system tray icon via Tauri
- [ ] Tray menu:
  - "New Project" → opens app with a new project
  - "Open Think" → brings window to front
  - Separator
  - "Quit"
- [ ] App stays in tray when window is closed (optional — can be a setting)
- [ ] Tray icon: Think logo, small

### 5.4 Auto-updater
- [ ] Configure `tauri-plugin-updater`
- [ ] Check for updates on launch (non-blocking)
- [ ] Update endpoint: GitHub Releases API
- [ ] When update available: subtle notification in top bar "Update available"
- [ ] Click → download + install + restart
- [ ] Manual check: Settings → "Check for updates"

---

## Acceptance Criteria

- [ ] Dark mode looks polished (all components themed)
- [ ] System preference detection works
- [ ] No FOUC (flash of unstyled content) on startup
- [ ] System tray icon works with basic menu
- [ ] Auto-updater detects new GitHub releases
- [ ] Can trigger update from UI
