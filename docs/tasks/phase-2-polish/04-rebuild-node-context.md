# Task P2-04: Rebuild & Node Context

**Phase:** 2 — Polish & Usability  
**Estimate:** 3-4 days  
**Dependencies:** Phase 1 complete  
**PRD Reference:** Sections 5.2, 6.1 (CS-05, CS-08), 6.3 (AI-05)

---

## Goal

Enable incremental rebuilds (add new conversation to existing map without losing manual edits) and node-to-chat context linking (click a node to see the conversation that generated it).

---

## Subtasks

### 4.1 Incremental rebuild (Update mode)
- [ ] When Build is clicked and a mind map already exists:
  - Only process messages added AFTER the last Build
  - AI receives: existing map structure + new messages
  - AI returns: updated structure with new branches/nodes
  - Merge new nodes into existing map
  - Preserve manually-moved node positions
  - Preserve manually-edited node text
  - Preserve manually-added nodes
- [ ] Build button label changes: "Build Mind Map" → "Update Mind Map" when a map exists
- [ ] Update the BUILD_SYSTEM_PROMPT with instructions for incremental updates

### 4.2 Node-to-chat context
- [ ] When user clicks a node on canvas:
  - Sidebar scrolls to the related chat messages
  - Messages that generated this node are highlighted
  - Uses `sourceMessageIds` on the node data
- [ ] Visual indicator: highlighted messages have a subtle background color
- [ ] Auto-scroll with smooth animation

### 4.3 Chat-to-node context
- [ ] When hovering over a chat message that has `linkedNodeIds`:
  - Corresponding nodes on canvas get a highlight ring
  - Shows which parts of the conversation became which nodes
- [ ] Subtle visual — doesn't interfere with normal usage

### 4.4 Rebuild merge strategy
- [ ] Define merge rules:
  - AI-generated nodes can be updated (text, type, children)
  - Manually created nodes (`isManual: true`) are never touched
  - Manually-moved nodes keep their position
  - New branches are added with auto-layout, existing branches keep positions
- [ ] Track `isManual` and `hasBeenMoved` flags on nodes

---

## Acceptance Criteria

- [ ] Can rebuild/update an existing mind map with new conversation
- [ ] Manual edits (position, text, new nodes) are preserved during rebuild
- [ ] Clicking a node scrolls chat to related messages
- [ ] Related messages are visually highlighted
- [ ] Build → chat more → Build again → map grows incrementally
