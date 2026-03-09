# Task P2-07: Offline Mode

**Phase:** 2 — Polish & Usability  
**Estimate:** 1-2 days  
**Dependencies:** Phase 1 complete  
**PRD Reference:** Section 9.6

---

## Goal

Gracefully handle offline state. Canvas and manual features work fully. AI features are disabled with clear messaging.

---

## Subtasks

### 7.1 Network status detection
- [ ] Create `src/lib/network-status.ts`
- [ ] Use `navigator.onLine` + `online`/`offline` events
- [ ] Alternatively: periodic ping to provider endpoints
- [ ] Zustand store: `isOnline: boolean`

### 7.2 Offline UI indicators
- [ ] Chat sidebar: subtle banner at top "You're offline. AI features unavailable."
- [ ] Chat input: disabled with placeholder "Connect to internet for AI features"
- [ ] Build button: disabled, tooltip "Requires internet connection"
- [ ] Banner style: subtle amber/yellow, dismissible but reappears if still offline

### 7.3 Offline-safe features
- [ ] Verify these work without internet:
  - Canvas: pan, zoom, drag nodes, edit text, select, delete
  - Project: save, load, create, rename, delete
  - All local operations continue normally
- [ ] No error dialogs or crashes when offline

### 7.4 Reconnection
- [ ] When internet returns: remove offline banner
- [ ] Re-enable chat input and Build button
- [ ] No manual action needed from user
- [ ] Optional: subtle "Back online" toast that fades away

---

## Acceptance Criteria

- [ ] Turning off internet shows offline indicators
- [ ] AI features (chat, build) are disabled with clear messaging
- [ ] Canvas and project operations work normally offline
- [ ] Reconnecting automatically restores AI features
- [ ] No crashes or unhandled errors in offline state
