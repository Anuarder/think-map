# Task 08: Build Feature (Chat → Mind Map)

**Phase:** 1 — MVP  
**Estimate:** 3-4 days  
**Dependencies:** Task 04 (Canvas), Task 05 (Chat Sidebar), Task 06 (AI Integration)  
**PRD Reference:** Sections 5.1, 6.3, 11

---

## Goal

Implement the core Build feature — the moment when a conversation becomes a mind map. The user clicks Build, AI analyzes the chat history, returns a structured tree, and it renders as an interactive mind map on the canvas. This is Think's signature feature.

---

## Subtasks

### 8.1 Build orchestration
- [ ] Create `src/features/build/build-service.ts`
- [ ] `buildMindMap()` function — the full pipeline:

```
1. Get messages from chat store
2. Validate: at least 2 messages (1 user + 1 AI response)
3. Set build state to "loading"
4. Call AI service `buildMindMap(messages)`
5. Receive MindMapStructure (validated JSON tree)
6. Convert structure to React Flow nodes + edges
7. Run dagre layout on the nodes
8. Load nodes + edges into canvas store
9. Fit view to show the full map
10. Set build state to "complete"
```

- [ ] Handle errors at each step with user-friendly messages
- [ ] The entire flow should take 3-10 seconds depending on conversation length

### 8.2 Structure → React Flow conversion
- [ ] Create `src/lib/structure-to-flow.ts`
- [ ] Function: `convertStructureToFlow(structure: MindMapStructure): { nodes: ThinkNode[], edges: ThinkEdge[] }`
- [ ] Recursive tree traversal:
  - Each node in the tree → `ThinkNode` with unique ID (nanoid)
  - Each parent-child relationship → `ThinkEdge`
  - Root node: `parentId = undefined`
  - Node data: map `text` → `label`, `type` → `nodeType`, etc.
  - `isManual: false` for all AI-generated nodes
- [ ] Generate edge IDs: `e-{sourceId}-{targetId}`
- [ ] After conversion, run `layoutMindMap()` (from Task 04) to assign positions

### 8.3 Build state management
- [ ] Add to canvas store or create `src/stores/build-store.ts`:
  - `buildStatus: 'idle' | 'loading' | 'complete' | 'error'`
  - `buildError: string | null`
  - `lastBuildTimestamp: string | null`
  - `setBuildStatus(status)`
  - `setBuildError(error)`
- [ ] The chat sidebar's Build button reads `buildStatus` to show loading/disabled states
- [ ] The canvas reads `buildStatus` to show a loading overlay during Build

### 8.4 Build button integration
- [ ] Wire the Build button (from Task 05) to call `buildMindMap()`
- [ ] Button states:
  - **Disabled:** no messages, or fewer than 2 messages
  - **Ready:** has messages, click to build
  - **Loading:** building in progress (spinner, "Building mind map...")
  - **Error:** show error briefly, return to ready state
- [ ] After successful build: briefly flash a success state, then reset to ready

### 8.5 Canvas loading state
- [ ] While Build is in progress, show an overlay on the canvas:
  - Semi-transparent backdrop
  - Centered spinner or animation
  - "Building your mind map..." text
- [ ] When complete: fade out overlay, reveal the mind map
- [ ] Optional: animate nodes appearing one by one (staggered fade-in)

### 8.6 Build animation
- [ ] After nodes are placed on canvas:
  - Fit view with animation: `fitView({ duration: 800, padding: 0.2 })`
  - Optional: nodes fade in with a short stagger delay
- [ ] Smooth transition from empty canvas to populated mind map
- [ ] If canvas already has nodes (rebuild): transition to new layout smoothly

### 8.7 Message-to-node linking
- [ ] After Build, link chat messages to the nodes they generated:
  - The AI output should include descriptions that map back to conversation context
  - For MVP: store the Build timestamp so we know which messages were included
  - Future (Task 04 Phase 2): precise message → node linking via `sourceMessageIds`
- [ ] Update messages in the chat store with `linkedNodeIds` where applicable

### 8.8 Edge cases
- [ ] Empty conversation → Build button disabled
- [ ] Very short conversation (1-2 messages) → AI might produce a minimal map (2-3 nodes). That's okay.
- [ ] Very long conversation (50+ messages) → Truncate to last 30 messages + a summary of earlier messages
- [ ] AI returns invalid JSON → Retry once with a stricter prompt. On second failure, show error.
- [ ] AI returns empty/trivial structure → Show warning: "The conversation didn't have enough content to generate a meaningful mind map. Keep chatting!"
- [ ] Network error during Build → Show error, allow retry
- [ ] User navigates away during Build → Cancel the request (AbortController)

---

## Acceptance Criteria

- [ ] Clicking Build generates a mind map from the conversation
- [ ] Mind map appears on the canvas with correct tree structure
- [ ] Nodes have proper labels, types, and descriptions from the AI
- [ ] Edges connect parent-child nodes correctly
- [ ] Layout is readable (no overlapping nodes)
- [ ] Canvas fits to show the full map after Build
- [ ] Loading state shows during Build
- [ ] Error states are handled gracefully
- [ ] Build works with conversations of 3-30 messages
- [ ] Can rebuild after adding more messages (replaces existing map for now)

---

## Technical Notes

- This is the highest-risk task — it connects all the pieces (chat, AI, canvas)
- Test with various conversation styles: business ideas, technical topics, creative projects
- The quality of the mind map depends heavily on the BUILD_SYSTEM_PROMPT — iterate on it
- `generateObject` with Zod schema (from Task 06) ensures type-safe output, but the AI might still produce low-quality content. Consider adding a quality check.
- For rebuild (Phase 2): need a smarter merge strategy that preserves manual edits. For MVP, full replacement is fine.
- Performance: Building a 20-node map from a 15-message conversation should complete in 3-5 seconds
- Consider adding console logging for the raw AI response during development for debugging
