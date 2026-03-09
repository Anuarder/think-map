# Task P3-04: AI Enhancements

**Phase:** 3 — Advanced Features  
**Estimate:** 3-4 days  
**Dependencies:** Phase 2 complete  
**PRD Reference:** Sections 5.2, 6.1 (CS-09), 6.3 (AI-07, AI-08)

---

## Goal

Advanced AI features: branch-focused chat, AI expansion suggestions, multiple layout options, and Anthropic Claude as a third provider.

---

## Subtasks

### 4.1 Branch-focused chat
- [ ] Click a node → "Chat about this" button appears
- [ ] Sidebar enters "branch focus" mode:
  - Shows only conversation related to this branch
  - New messages are scoped to this topic
  - AI context includes the branch structure
- [ ] Build in branch mode only updates that branch (not the whole map)
- [ ] Exit focus mode: button or Escape

### 4.2 AI expansion suggestions
- [ ] After Build, AI identifies branches that could be explored further
- [ ] Show subtle "Expand?" badges on nodes that have potential
- [ ] Click badge → sidebar pre-fills "Let's explore [topic] further"
- [ ] AI suggests based on: short branches, questions, vague ideas

### 4.3 Multiple layout options
- [ ] Layout selector in canvas controls or toolbar:
  - **Tree (LR)** — left to right (default for mind maps)
  - **Tree (TB)** — top to bottom
  - **Radial** — root in center, branches radiate outward
- [ ] Re-layout button: apply selected layout to existing nodes
- [ ] dagre handles LR and TB; radial needs custom positioning logic

### 4.4 Anthropic Claude provider
- [ ] Create `src/services/ai/providers/anthropic.ts`
- [ ] Implements `AIProvider` with `@ai-sdk/anthropic`
- [ ] OAuth: Anthropic's OAuth flow (same pattern as OpenAI)
- [ ] Chat + Build modes
- [ ] Add to provider registry and settings screen

### 4.5 Ollama (local models) provider
- [ ] Create `src/services/ai/providers/ollama.ts`
- [ ] Connects to local Ollama instance (`http://localhost:11434`)
- [ ] No auth needed — auto-detect if Ollama is running
- [ ] Chat: streaming via Ollama API
- [ ] Build: JSON mode (may need prompt engineering for smaller models)
- [ ] Settings: Ollama model selector (list installed models)
- [ ] Fully offline AI: no internet needed

---

## Acceptance Criteria

- [ ] Branch focus mode works: scoped chat + scoped rebuild
- [ ] AI suggests branches to expand
- [ ] Can switch between tree (LR, TB) and radial layouts
- [ ] Anthropic Claude works for chat and Build
- [ ] Ollama works for chat and Build (when running locally)
- [ ] All providers are selectable in settings
