# Task P2-05: Sidebar Polish

**Phase:** 2 — Polish & Usability  
**Estimate:** 2-3 days  
**Dependencies:** Phase 1 complete  
**PRD Reference:** Sections 6.1 (CS-06, CS-07)

---

## Goal

Polish the chat sidebar: conversation starters, better empty state, multiple conversations per project, and general UX improvements.

---

## Subtasks

### 5.1 Conversation starters
- [ ] On empty chat, show 3-4 starter cards:
  - "Explore a business idea" → pre-fills input with a prompt
  - "Break down a complex topic" → pre-fills
  - "Plan a project" → pre-fills
  - "Brainstorm solutions to a problem" → pre-fills
- [ ] Cards are clickable, styled as subtle chips or small cards
- [ ] Disappear after first message is sent

### 5.2 Better empty state
- [ ] Centered content when no messages:
  - Think icon/logo (subtle, not giant)
  - "What's on your mind?" heading
  - Conversation starters below
- [ ] Smooth transition to message list on first message

### 5.3 Sidebar resizing polish
- [ ] Smoother resize animation
- [ ] Double-click resize handle → reset to default width (320px)
- [ ] Sidebar remembers width across sessions (saved in app store → settings)

### 5.4 Message timestamps
- [ ] Show subtle timestamps on messages
- [ ] Format: "2:34 PM" for today, "Yesterday 2:34 PM", "Mar 5 2:34 PM"
- [ ] Shown on hover or always (subtle gray text, small font)

### 5.5 Copy message content
- [ ] Hover a message → show a copy icon button
- [ ] Click → copy message text to clipboard
- [ ] Brief "Copied!" tooltip

### 5.6 Stop generation button
- [ ] While AI is streaming: show a "Stop" button
- [ ] Click → abort the streaming request (AbortController)
- [ ] Partial response is kept as a message
- [ ] Input re-enables after stopping

---

## Acceptance Criteria

- [ ] Conversation starters appear on empty chat
- [ ] Clicking a starter pre-fills the input
- [ ] Empty state looks polished with branding
- [ ] Sidebar width persists across sessions
- [ ] Messages show timestamps
- [ ] Can copy message content
- [ ] Can stop AI generation mid-stream
