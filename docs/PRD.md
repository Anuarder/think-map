# Think — AI-Powered Mind Mapping Tool

## Product Requirements Document (PRD)

**Version:** 1.1  
**Date:** March 9, 2026  
**Author:** Anuar Ibrayev  
**Status:** Draft  
**License:** Open Source (MIT)

---

## 1. Executive Summary

**Think** is an open-source desktop application for canvas-based mind mapping with a built-in AI conversation partner. Users brainstorm ideas through a chat sidebar, refine them collaboratively with AI, and then transform the conversation into a structured, interactive mind map on an infinite canvas. The result is a living document of notes, plans, and connections that can be revisited, edited, and expanded at any time. Built with Tauri + React, it runs natively on macOS, Windows, and Linux.

### One-Liner

> Chat with AI to explore an idea, then press **Build** to turn the conversation into a visual mind map you can interact with.

---

## 2. Problem Statement

### Pain Points

1. **Idea capture is fragmented** — People bounce between chat apps, note-taking tools, and whiteboarding software. Ideas get lost between context switches.
2. **Mind mapping tools are manual** — Existing tools (Miro, MindMeister, XMind) require the user to structure everything themselves. Starting from a blank canvas is intimidating.
3. **AI chat is linear** — Tools like ChatGPT produce great ideas, but the output is a flat text wall. There is no spatial structure, no connections, no visual overview.
4. **No bridge between thinking and planning** — Conversations about ideas rarely become actionable plans without significant manual effort.

### Opportunity

Combine the natural flow of a conversation with the spatial power of a mind map. Let AI do the heavy lifting of structuring ideas, while the user stays in a creative flow state.

---

## 3. Target Users

| Persona | Description | Key Need |
|---|---|---|
| **Solo Creator** | Indie hacker, writer, designer working on side projects | Quickly explore and structure ideas without leaving one tool |
| **Student / Researcher** | Exploring topics, writing papers, studying concepts | Break down complex topics into visual, connected knowledge |
| **Product Thinker** | PM, founder, strategist planning features or products | Go from vague idea to structured plan with AI assistance |
| **Note Taker** | Anyone who thinks by writing and wants spatial organization | Turn scattered thoughts into organized visual maps |

### Primary Persona: Solo Creator

- Works alone or in a very small team
- Has many ideas but struggles to organize them
- Uses tools like Notion, Obsidian, ChatGPT, Excalidraw separately
- Wants one place to think, plan, and organize

---

## 4. Product Vision

### Core Concept: Two Panels, One Flow

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   ┌─────────────┐   ┌────────────────────────────────┐   │
│   │             │   │                                │   │
│   │   AI Chat   │   │       Infinite Canvas          │   │
│   │   Sidebar   │   │                                │   │
│   │             │   │    ┌───────┐                    │   │
│   │  You: ...   │   │    │ Main  │                    │   │
│   │  AI: ...    │   │    │ Idea  │                    │   │
│   │  You: ...   │   │    └───┬───┘                    │   │
│   │  AI: ...    │   │        │                        │   │
│   │             │   │   ┌────┼────┐                   │   │
│   │             │   │   │    │    │                    │   │
│   │  ┌───────┐  │   │ ┌─┴─┐┌─┴─┐┌─┴─┐                │   │
│   │  │ BUILD │  │   │ │   ││   ││   │                │   │
│   │  └───────┘  │   │ └───┘└───┘└───┘                │   │
│   │             │   │                                │   │
│   └─────────────┘   └────────────────────────────────┘   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Left panel** — AI chat sidebar for free-form brainstorming  
**Right panel** — Infinite canvas for the visual mind map  
**Build button** — Transforms the conversation into a structured mind map  

The two panels are connected: you can click any node on the canvas to see the conversation context that generated it, and you can continue chatting to expand any branch.

---

## 5. User Flow

### 5.1 Primary Flow: Idea → Conversation → Mind Map

```
1. User opens Think
2. User types an idea in the chat sidebar
   "I want to build a marketplace for local artisans"
3. AI responds with clarifying questions, suggestions, angles
   "Interesting! Let's explore this. Who are the artisans? 
    What would they sell? How is this different from Etsy?"
4. Back-and-forth conversation develops the idea
5. User clicks [BUILD] button
6. AI analyzes the conversation and generates a structured mind map:
   - Central node: "Artisan Marketplace"
   - Branch: "Target Artisans" → nodes for each type
   - Branch: "Differentiators" → nodes for unique angles
   - Branch: "Revenue Model" → pricing ideas discussed
   - Branch: "Open Questions" → unresolved points
7. Mind map appears on the canvas
8. User can:
   - Rearrange nodes by dragging
   - Edit node text inline
   - Add new nodes manually
   - Click a node → chat sidebar focuses on that topic
   - Continue the conversation to expand a branch
   - Press [BUILD] again to update the map with new insights
```

### 5.2 Secondary Flow: Expand a Branch

```
1. User clicks a node on the canvas (e.g., "Revenue Model")
2. Chat sidebar shows context: the original conversation about revenue
3. User types: "Let's dig deeper into the subscription model"
4. AI discusses subscription pricing, tiers, examples
5. User clicks [BUILD] on this branch
6. New child nodes appear under "Revenue Model"
```

### 5.3 Tertiary Flow: Manual Editing on Canvas

```
1. User double-clicks empty canvas space → creates a new node
2. User drags a connection between two nodes
3. User right-clicks a node → options: edit, delete, change color, add note
4. User adds a sticky note next to a group of nodes
5. All manual additions are preserved when AI rebuilds
```

---

## 6. Feature Requirements

### 6.1 AI Chat Sidebar

| ID | Feature | Priority | Description |
|---|---|---|---|
| CS-01 | Chat input | P0 | Text input with send button and Enter key support |
| CS-02 | AI responses | P0 | Streaming AI responses with markdown formatting |
| CS-03 | Conversation history | P0 | Scrollable history of the current conversation |
| CS-04 | Build button | P0 | Prominent button that triggers mind map generation |
| CS-05 | Context awareness | P1 | When a canvas node is selected, chat knows the context |
| CS-06 | Conversation starters | P1 | Suggested prompts for new users ("Explore a business idea", "Break down a topic", "Plan a project") |
| CS-07 | Multiple conversations | P1 | Each mind map / project has its own conversation thread |
| CS-08 | Rebuild / Update | P1 | Re-run Build to incorporate new chat messages into existing map |
| CS-09 | Branch focus | P2 | Click a node to scope the conversation to that branch |
| CS-10 | Export chat | P2 | Export conversation as markdown |

### 6.2 Infinite Canvas

| ID | Feature | Priority | Description |
|---|---|---|---|
| CV-01 | Pan & zoom | P0 | Mouse drag to pan, scroll/pinch to zoom, smooth animations |
| CV-02 | Node rendering | P0 | Render mind map nodes with text, colors, and connections |
| CV-03 | Drag nodes | P0 | Reposition nodes by dragging |
| CV-04 | Auto-layout | P0 | AI-generated maps use an automatic tree/radial layout |
| CV-05 | Connection lines | P0 | Curved or straight lines connecting parent-child nodes |
| CV-06 | Inline editing | P0 | Double-click a node to edit its text |
| CV-07 | Selection | P1 | Click to select, Shift+click for multi-select, marquee selection |
| CV-08 | Minimap | P1 | Small overview in the corner showing the full map |
| CV-09 | Node types | P1 | Different visual styles: idea, question, action item, note |
| CV-10 | Sticky notes | P1 | Free-form text blocks that can be placed anywhere on canvas |
| CV-11 | Color coding | P1 | Assign colors to nodes/branches for visual grouping |
| CV-12 | Fit to screen | P1 | Button to zoom/pan to fit all content in view |
| CV-13 | Manual connections | P2 | Draw connections between any two nodes manually |
| CV-14 | Group / Frame | P2 | Group nodes into a named frame/section |
| CV-15 | Undo / Redo | P1 | Full undo/redo stack for all canvas operations |
| CV-16 | Keyboard shortcuts | P2 | Tab to add sibling, Enter to add child, Delete to remove, etc. |

### 6.3 AI Mind Map Generation

| ID | Feature | Priority | Description |
|---|---|---|---|
| AI-01 | Conversation analysis | P0 | AI reads the chat and extracts key topics, decisions, questions |
| AI-02 | Structure generation | P0 | Creates a hierarchical mind map structure (JSON) from conversation |
| AI-03 | Smart labeling | P0 | Concise, meaningful labels for each node |
| AI-04 | Branch categorization | P1 | Automatically categorizes branches (ideas, questions, action items, risks) |
| AI-05 | Incremental update | P1 | Rebuild adds new nodes without losing manual edits |
| AI-06 | Node descriptions | P1 | Each node can have an expanded description from the conversation |
| AI-07 | Suggest expansion | P2 | AI suggests which branches could be explored further |
| AI-08 | Multiple layouts | P2 | User can choose tree, radial, or freeform layout |

### 6.4 Project Management

| ID | Feature | Priority | Description |
|---|---|---|---|
| PM-01 | Project list | P0 | Dashboard showing all saved mind maps |
| PM-02 | Auto-save | P0 | All changes saved automatically to local storage |
| PM-03 | Project naming | P0 | Name/rename projects |
| PM-04 | Delete project | P0 | Delete a project with confirmation |
| PM-05 | Export as image | P1 | Export canvas as PNG or SVG |
| PM-06 | Export as markdown | P1 | Export mind map structure as nested markdown |
| PM-07 | Export as JSON | P2 | Export the raw data structure |
| PM-08 | Cloud sync | P2 | Sync projects across devices (future) |

---

## 7. Node Data Model

```typescript
// React Flow compatible node data
interface MindMapNodeData {
  label: string;                         // Short text displayed on node
  description?: string;                  // Expanded content from conversation
  nodeType: 'idea' | 'question' | 'action' | 'note' | 'risk';
  color?: string;                        // Node color
  isManual: boolean;                     // true if user-created, false if AI-generated
  sourceMessageIds?: string[];           // Links back to chat messages
}

// React Flow Node with our custom data
// Extends @xyflow/react Node type
interface ThinkNode {
  id: string;
  type: 'mindMapNode';                   // React Flow custom node type
  position: { x: number; y: number };    // Canvas coordinates
  data: MindMapNodeData;
  parentId?: string;                     // For hierarchical layout
}

// React Flow Edge (connection between nodes)
interface ThinkEdge {
  id: string;
  source: string;                        // From node ID
  target: string;                        // To node ID
  type: 'smoothstep' | 'bezier';        // React Flow edge type
  label?: string;
  style?: { stroke: string; strokeDasharray?: string };
  animated?: boolean;
}

interface Project {
  id: string;
  name: string;
  nodes: ThinkNode[];
  edges: ThinkEdge[];
  viewport: {                            // React Flow viewport
    x: number;
    y: number;
    zoom: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface ChatMessage {
  id: string;
  projectId: string;
  role: 'user' | 'assistant';
  content: string;
  linkedNodeIds?: string[];              // Nodes generated from this message
  createdAt: string;
}

// AI Build output (before converting to React Flow nodes)
interface MindMapStructure {
  rootNode: {
    text: string;
    description?: string;
    type: 'idea' | 'question' | 'action' | 'note' | 'risk';
    children: MindMapStructure['rootNode'][];
  };
}
```

---

## 8. UI / UX Design Principles

### 8.1 Design Inspiration

| Tool | What to Take |
|---|---|
| **Excalidraw** | Hand-drawn aesthetic, simplicity, keyboard-first interactions |
| **tldraw** | Smooth infinite canvas, minimal chrome, performance |
| **Miro** | Sticky notes, frames, intuitive object manipulation |
| **Obsidian Canvas** | Node-based connections, local-first, markdown integration |
| **Arc Browser** | Clean sidebar, beautiful minimal UI, tasteful use of color |
| **Linear** | Polished minimal interface, keyboard shortcuts, speed |

### 8.2 Visual Design

- **Color palette:** Neutral background (soft white or very light gray), with colorful nodes
- **Typography:** Clean sans-serif (Inter or similar), clear hierarchy
- **Nodes:** Rounded rectangles with subtle shadows, clear text
- **Connections:** Smooth bezier curves, subtle color
- **Canvas background:** Subtle dot grid pattern
- **Sidebar:** Clean, chat-like interface with clear message bubbles
- **Overall feel:** Calm, focused, minimal — like a digital thinking space

### 8.3 Layout

```
┌─────────────────────────────────────────────────────────┐
│  ☰  Think         [Project Name]            [⚙] [👤]   │  ← Top bar
├────────────┬────────────────────────────────────────────┤
│            │                                            │
│  AI Chat   │              Canvas                        │
│  Sidebar   │                                            │
│            │                                            │
│  280-400px │              Remaining space                │
│  width     │                                            │
│            │                                            │
│  Resize-   │                                            │
│  able      │                                            │
│            │                                            │
├────────────┤                                            │
│ [BUILD ▶]  │                                            │
├────────────┤                                            │
│ [message.. │                                    [mini]  │
│  input]    │                                    [map ]  │
└────────────┴────────────────────────────────────────────┘
```

- Sidebar is collapsible and resizable (280px–400px)
- Canvas fills remaining space
- Build button sits prominently between chat history and input
- Minimap in bottom-right corner of canvas
- Top bar is minimal: hamburger menu, project name, settings

### 8.4 Interaction Patterns

| Action | Interaction |
|---|---|
| Pan canvas | Click + drag on empty space / Middle mouse button |
| Zoom | Scroll wheel / Pinch gesture / +/- buttons |
| Select node | Click |
| Multi-select | Shift + click / Drag selection rectangle |
| Move node | Click + drag on node |
| Edit node | Double-click |
| Create node | Double-click empty space |
| Delete node | Select + Delete/Backspace key |
| Connect nodes | Drag from node edge handle to another node |
| Context menu | Right-click on node |
| Focus chat on node | Click node → sidebar updates context |
| Collapse branch | Click collapse arrow on parent node |

---

## 9. Technical Architecture

### 9.1 Platform: Desktop App with Tauri

Think is a **desktop application** built with **Tauri v2**, not a web app.

**Why Tauri over Electron:**

| | Tauri v2 | Electron |
|---|---|---|
| **Bundle size** | ~5-10 MB | ~150-200 MB |
| **RAM usage** | ~50-80 MB | ~200-400 MB |
| **Backend** | Rust (fast, safe) | Node.js |
| **Auto-updater** | Built-in | Requires electron-updater |
| **File system** | Native Rust APIs | Node.js fs |
| **Security** | Sandboxed by default | Full Node.js access |
| **License** | MIT | MIT |
| **Community** | 85k+ GitHub stars, rapidly growing | Mature, large |

Tauri is the better fit for an open-source, desktop-first tool: smaller footprint, Rust backend for fast file I/O and future local AI model support, and strong security model.

**Target platforms (Phase 1):** macOS, Linux  
**Future:** Windows

### 9.2 Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Desktop shell** | Tauri v2 | Lightweight native desktop wrapper, Rust backend |
| **Frontend** | React 19 + TypeScript | Largest ecosystem for canvas/AI libraries |
| **Canvas** | @xyflow/react (React Flow) | Purpose-built for node-based UIs, 25k+ GitHub stars |
| **State** | Zustand | Lightweight, minimal boilerplate, works great with React Flow |
| **AI Integration** | Vercel AI SDK + OpenAI | Streaming chat, structured output, provider-agnostic adapter layer |
| **Persistence** | SQLite via Tauri (rusqlite) | Native file-based DB, no browser limitations, offline-first |
| **Styling** | Tailwind CSS | Utility-first, fast iteration |
| **Build** | Vite | Fast HMR, Tauri-compatible |
| **Layout algorithm** | dagre / elkjs | Automatic tree layout for mind maps |
| **Export** | html-to-image / canvas API | PNG/SVG export |
| **Package manager** | pnpm | Fast, disk-efficient |

### 9.3 Why React Flow (@xyflow/react)

React Flow is the gold standard for node-based UIs in React:

- **Built-in features that match our requirements:**
  - Infinite canvas with pan & zoom (CV-01) — zero custom code
  - Node dragging (CV-03) — built-in
  - Connection lines with multiple edge types (CV-05) — bezier, step, smoothstep
  - Minimap component (CV-08) — drop-in
  - Selection & multi-select (CV-07) — built-in
  - Fit-to-view (CV-12) — one function call
  - Custom node types (CV-09) — render any React component as a node
  - Background patterns (dot grid) — built-in `<Background>` component
  
- **Community:** 25k+ GitHub stars, active maintenance, excellent docs
- **Performance:** Handles 1000+ nodes with virtualization
- **Extensibility:** Custom nodes, edges, and controls are just React components
- **Sub-flows:** Support for nested/grouped nodes (useful for frames later)

This eliminates the need to build a custom canvas from scratch and covers ~70% of our canvas requirements out of the box.

### 9.4 Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Tauri v2 Shell                     │
│  ┌─────────────────────────────────────────────────┐ │
│  │              React Application                   │ │
│  ├──────────┬──────────────┬───────────────────────┤ │
│  │  Chat    │  Canvas      │  Project              │ │
│  │  Panel   │  (React Flow)│  Dashboard             │ │
│  ├──────────┴──────────────┴───────────────────────┤ │
│  │              Zustand Stores                      │ │
│  │  ┌──────────┐ ┌──────────┐ ┌─────────┐          │ │
│  │  │ Chat     │ │ Canvas   │ │ Project │          │ │
│  │  │ Store    │ │ Store    │ │ Store   │          │ │
│  │  └──────────┘ └──────────┘ └─────────┘          │ │
│  ├─────────────────────────────────────────────────┤ │
│  │              Services                            │ │
│  │  ┌──────────┐ ┌──────────┐ ┌─────────┐          │ │
│  │  │ AI       │ │ Layout   │ │ Storage │          │ │
│  │  │ Service  │ │ Engine   │ │ Bridge  │          │ │
│  │  └──────────┘ └──────────┘ └─────────┘          │ │
│  └─────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────┐ │
│  │              Rust Backend (Tauri)                 │ │
│  │  ┌──────────┐ ┌──────────┐ ┌─────────┐          │ │
│  │  │ SQLite   │ │ File     │ │ System  │          │ │
│  │  │ Database │ │ Export   │ │ Tray    │          │ │
│  │  └──────────┘ └──────────┘ └─────────┘          │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**Frontend (WebView):** React handles all UI — chat sidebar, canvas (via React Flow), project dashboard.

**Rust Backend (Tauri commands):** Handles persistence (SQLite), file system operations (export), and system-level features (tray icon, auto-updater, window management). Communicates with the frontend via Tauri's IPC command system.

### 9.5 AI Integration Design

**Provider strategy:** Start with OpenAI. Abstract behind a provider interface so other models (Google Gemini, Anthropic Claude, local via Ollama) can be added later without rewriting chat/build logic.

```typescript
interface AIProvider {
  id: string;                            // 'openai' | 'gemini' | 'anthropic' | 'ollama'
  name: string;                          // Display name
  authMethod: 'oauth' | 'local';        // OAuth for cloud, none for local models
  chat(messages: ChatMessage[], onChunk: (text: string) => void): Promise<void>;
  buildMindMap(messages: ChatMessage[]): Promise<MindMapStructure>;
}

class OpenAIProvider implements AIProvider { /* OAuth via OpenAI account */ }
class GeminiProvider implements AIProvider { /* OAuth via Google account */ }
// Future: class AnthropicProvider implements AIProvider { /* OAuth via Anthropic account */ }
// Future: class OllamaProvider implements AIProvider { /* Local, no auth */ }
```

### 9.5.1 Authentication: OAuth (not API keys)

Think uses **OAuth 2.0 with PKCE** for AI provider authentication — the same approach used by gemini-cli, Claude Code, and OpenAI Codex CLI. Users sign in with their existing account instead of manually copy-pasting API keys.

**How it works:**

```
1. User clicks "Sign in with OpenAI" (or Google, Anthropic)
2. Tauri opens the system browser → provider's OAuth consent screen
3. User signs in with their existing account
4. Provider redirects back to Think (via deep link / localhost callback)
5. Think receives an access token + refresh token
6. Tokens stored securely in OS keychain (tauri-plugin-stronghold)
7. All API calls use the OAuth token — no API key ever needed
```

**Why OAuth over API keys:**

| | OAuth | API Keys |
|---|---|---|
| **UX** | Click "Sign in" — done | Find settings → create key → copy → paste |
| **Security** | Scoped tokens, auto-expire, refresh | Static secret, never expires unless rotated |
| **Free tiers** | Access provider's free tier (e.g., Gemini free with Google account) | Often requires billing setup first |
| **Revocation** | User revokes from provider's account settings | Must manually delete from app |
| **Familiarity** | "Sign in with Google" — everyone knows this | Developer-oriented concept |

**Provider OAuth details:**

| Provider | OAuth Flow | Notes |
|---|---|---|
| **OpenAI** | OAuth 2.0 PKCE | Same as Codex CLI. Access to GPT-4o, o1, etc. |
| **Google Gemini** | Google OAuth 2.0 | Same as gemini-cli. Free tier available with Google account. |
| **Anthropic** | OAuth 2.0 PKCE | Same as Claude Code. Access to Claude Sonnet/Opus. |
| **Ollama** | None (local) | No auth needed — runs on localhost. Fully offline. |

**Token management:**
- Tokens stored in OS keychain via `tauri-plugin-stronghold` (encrypted, per-OS secure storage)
- Refresh tokens used automatically when access tokens expire
- User can sign out per provider from Settings
- Multiple providers can be connected simultaneously — user picks active one

**Two AI modes:**

1. **Chat mode** — Free-form conversation using system prompt that encourages exploration, asks good questions, and helps develop ideas. Uses streaming responses via Vercel AI SDK.

2. **Build mode** — Structured output mode. Takes the conversation history and outputs a JSON mind map structure. Uses structured output / function calling to ensure valid data.

**Build prompt strategy:**

```
System: You are a mind map architect. Analyze the conversation below 
and create a structured mind map. Extract key ideas, group related 
concepts, identify questions and action items. Output as JSON matching 
the MindMapNode schema.

Rules:
- Root node = the central idea/topic
- Group related ideas into branches
- Mark unresolved questions as type "question"
- Mark actionable items as type "action"  
- Mark risks/concerns as type "risk"
- Keep node labels concise (3-7 words)
- Add descriptions for nodes that need context
- Link each node to the source message IDs
```

### 9.6 Offline Behavior

Think works without internet as a **manual mind mapping tool**:

| Feature | Online | Offline |
|---|---|---|
| Canvas (pan, zoom, drag, edit) | Yes | Yes |
| Manual node creation | Yes | Yes |
| Manual connections | Yes | Yes |
| Project save/load | Yes | Yes |
| Export (PNG, SVG, MD) | Yes | Yes |
| AI chat conversation | Yes | No — input disabled, message shown |
| Build (AI generation) | Yes | No — button disabled, tooltip explains |
| Undo/redo | Yes | Yes |

When offline, the chat sidebar shows a subtle banner: "AI features require internet connection. You can still use Think as a manual mind mapping tool." The Build button is grayed out with a tooltip.

### 9.7 Data Storage

**SQLite** via Tauri's Rust backend (not IndexedDB):

- Projects stored as rows in a `projects` table
- Mind map data serialized as JSON in a `data` column
- Conversation history in a `messages` table with foreign key to project
- SQLite file lives in the app's data directory (`~/.think/think.db`)
- Benefits over IndexedDB: no browser storage limits, easy backup (copy the file), queryable with SQL, works natively in Tauri's Rust backend

```sql
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  canvas_data TEXT NOT NULL,  -- JSON: nodes, connections, viewport
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id),
  role TEXT NOT NULL,          -- 'user' | 'assistant'
  content TEXT NOT NULL,
  linked_node_ids TEXT,        -- JSON array
  created_at TEXT NOT NULL
);

CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL           -- JSON value
);
```

---

## 10. Build Phases

### Phase 1 — MVP (4-6 weeks)

**Goal:** Core loop working end-to-end as a desktop app

- [ ] Project scaffolding (Tauri v2 + React 19 + Vite + TypeScript + Tailwind + Zustand)
- [ ] Tauri shell setup (window config, basic Rust backend, SQLite integration)
- [ ] React Flow canvas (pan, zoom, dot grid background)
- [ ] Custom mind map node component (React Flow custom node)
- [ ] Connection lines between nodes (React Flow edges — bezier)
- [ ] Drag to move nodes (React Flow built-in)
- [ ] Double-click to edit node text (inline editing)
- [ ] Chat sidebar UI (messages, input, scroll, streaming display)
- [ ] AI chat integration (Vercel AI SDK + OpenAI, streaming)
- [ ] Build button — conversation → mind map JSON → render on canvas
- [ ] Auto-layout (dagre tree layout → React Flow positions)
- [ ] Project save/load (SQLite via Tauri commands)
- [ ] Single project (no project list yet)
- [ ] AI provider abstraction layer (interface + OpenAI implementation)
- [ ] OAuth 2.0 PKCE flow for OpenAI (browser redirect → token → keychain storage)
- [ ] Welcome screen with "Sign in with OpenAI" button

**Deliverable:** A working Tauri desktop app where you can sign in with OpenAI, chat with AI about an idea, and generate a mind map.

### Phase 2 — Polish & Usability (3-4 weeks)

- [ ] Project list / dashboard
- [ ] Multiple projects with auto-save
- [ ] Node types with visual differentiation (idea, question, action, note, risk)
- [ ] Color coding for nodes and branches
- [ ] Minimap (React Flow `<MiniMap>` component)
- [ ] Fit-to-screen button (React Flow `fitView()`)
- [ ] Undo/redo
- [ ] Node context — click node to see related conversation
- [ ] Rebuild/update — add new chat content to existing map
- [ ] Delete nodes, multi-select
- [ ] Conversation starters / templates
- [ ] Responsive sidebar (collapsible, resizable)
- [ ] Offline mode — graceful degradation (manual mode when no internet)
- [ ] Google Gemini OAuth (second provider)
- [ ] Settings screen (connected accounts, active provider, theme preference)
- [ ] Provider switcher — choose active AI provider from connected accounts

**Deliverable:** A polished desktop app ready for daily personal use.

### Phase 3 — Advanced Features (4-6 weeks)

- [ ] Branch focus — scope chat to a specific branch
- [ ] Manual node creation (double-click canvas)
- [ ] Manual connections between nodes
- [ ] Sticky notes / free-form text on canvas
- [ ] Frames / groups (React Flow sub-flows)
- [ ] Export: PNG, SVG, Markdown, JSON (via Tauri file dialog)
- [ ] Keyboard shortcuts
- [ ] AI suggestions ("Expand this branch?")
- [ ] Multiple layout options (tree, radial, freeform)
- [ ] Search across projects and nodes
- [ ] Dark mode (system preference detection via Tauri)
- [ ] System tray icon with quick-create
- [ ] Auto-updater (Tauri built-in)
- [ ] Anthropic Claude OAuth (third provider)
- [ ] Ollama integration (local models, no auth, fully offline AI)

### Phase 4 — Future Vision (backlog)

- [ ] Windows support
- [ ] Cloud sync and user accounts (optional, opt-in)
- [ ] Local AI models via Ollama integration (fully offline AI)
- [ ] Templates (Business Model Canvas, SWOT, etc.)
- [ ] File/image attachments on nodes
- [ ] Voice input for chat
- [ ] Plugin system for custom node types
- [ ] Integration with external tools (Notion, Linear, etc.)
- [ ] Presentation mode (walk through branches sequentially)
- [ ] Community template sharing

---

## 11. AI Prompt Examples

### Chat System Prompt

```
You are Think AI, a creative thinking partner. Your job is to help 
the user explore, develop, and refine their ideas through conversation.

Guidelines:
- Ask thoughtful follow-up questions to deepen the idea
- Suggest angles the user might not have considered
- Be concise but substantive — avoid fluff
- When the user seems stuck, offer 2-3 concrete directions
- Organize your thoughts with structure when appropriate
- Be encouraging but honest about potential challenges
- Reference earlier parts of the conversation to show continuity

You are NOT generating the mind map yet. Focus on being a great 
thinking partner. The mind map will be generated separately when 
the user clicks Build.
```

### Build System Prompt

```
Analyze the conversation and produce a mind map as JSON.

Output format:
{
  "rootNode": {
    "text": "Central Idea (3-7 words)",
    "description": "Brief context from conversation",
    "type": "idea",
    "children": [
      {
        "text": "Branch Label",
        "description": "Context...",
        "type": "idea" | "question" | "action" | "note" | "risk",
        "children": [...]
      }
    ]
  }
}

Rules:
1. Root node = the main topic discussed
2. First-level children = major themes/aspects from the conversation
3. Go 2-4 levels deep based on conversation depth
4. Node labels: concise (3-7 words), clear, meaningful
5. Mark unresolved items as "question" type
6. Mark next steps as "action" type
7. Mark concerns as "risk" type
8. Include ALL significant ideas discussed — don't leave things out
9. Descriptions should provide enough context to understand without re-reading chat
10. Aim for 10-30 nodes total depending on conversation length
```

---

## 12. Success Metrics

| Metric | Target | How to Measure |
|---|---|---|
| Time to first mind map | < 3 minutes | From opening app to first Build |
| Build accuracy | > 80% of ideas captured | User survey / manual review |
| Return usage | 3+ sessions per week | Local analytics (optional) |
| Node interaction rate | > 50% of nodes edited/moved | Track node interactions |
| Conversation depth | > 5 message exchanges before Build | Average messages per session |

---

## 13. Decisions Made

| Question | Decision | Notes |
|---|---|---|
| **AI Provider** | OpenAI for now, provider-agnostic interface | Abstract behind `AIProvider` interface. Add Anthropic, Ollama later. |
| **Offline behavior** | Works offline as manual tool, AI requires internet | Canvas, editing, saving all work offline. Chat/Build disabled. |
| **Canvas library** | @xyflow/react (React Flow) | 25k+ stars, purpose-built for node UIs, covers 70% of canvas needs. |
| **Collaboration** | Not planned | Single-user desktop app. No architecture overhead for multiplayer. |
| **Authentication** | OAuth 2.0 with PKCE | Sign in with OpenAI/Google/Anthropic account, like gemini-cli and Claude Code. No API keys. |
| **Monetization** | Open source (MIT) | Free forever. Users sign in with their own AI provider account (BYOA). |
| **Mobile** | Desktop-first only | Tauri desktop app for macOS/Linux. No mobile planned. |
| **Desktop framework** | Tauri v2 | Lighter than Electron, Rust backend, native feel, built-in auto-updater. |
| **Framework** | React 19 + TypeScript | Best ecosystem for canvas libs and AI tooling. |

### Additional Decisions

| Question | Decision |
|---|---|
| **Update channel** | Both: auto-update on launch + manual "Check for updates" in Settings. Tauri's built-in updater handles both. |
| **Telemetry** | Zero telemetry. No analytics, no tracking, no phone-home. Fully private. |
| **License** | MIT |
| **OAuth registration** | Deferred. Will register Think as an OAuth app with providers (OpenAI, Google, Anthropic) when ready for first release. |

---

## 14. Competitive Landscape

| Tool | Strength | Gap Think Can Fill |
|---|---|---|
| **Miro** | Full-featured whiteboard, collaboration | No AI brainstorming, complex UI, team-focused |
| **MindMeister** | Dedicated mind mapping | Manual structuring only, no AI |
| **ChatGPT** | Great AI conversation | Output is flat text, no spatial/visual structure |
| **Excalidraw** | Beautiful simple canvas | No mind map features, no AI |
| **Obsidian Canvas** | Node-based, local-first | No AI, more for connecting existing notes |
| **Napkin.ai** | AI + visual thinking | Limited canvas interaction, less flexible |
| **Whimsical** | AI mind maps | Less conversational, more one-shot generation |

**Think's unique position:** The *conversation-first* approach. You don't start with a blank canvas — you start with a conversation. The canvas is the *output* of thinking, not the input. As a native desktop app, it is fast, private (data stays local), and works offline as a manual tool. As open source with BYOK, there are zero recurring costs from the tool itself.

---

## 15. Glossary

| Term | Definition |
|---|---|
| **Node** | A single element on the mind map containing text and metadata |
| **Branch** | A node and all its descendants |
| **Build** | The action of converting a conversation into a mind map |
| **Canvas** | The infinite, pannable/zoomable workspace |
| **Project** | A saved mind map with its associated conversation |
| **Root node** | The central node of a mind map representing the core idea |
| **Connection** | A visual line linking two nodes |
| **Sticky note** | A free-form text element on the canvas (not part of the tree) |
| **BYOK** | Bring Your Own Key — users provide their own AI API key |
| **Tauri command** | A Rust function exposed to the frontend via Tauri's IPC |
| **React Flow** | The @xyflow/react library used for the canvas |
| **Viewport** | The current pan (x, y) and zoom level of the canvas |

---

## 16. Distribution & Open Source

### Distribution

| Channel | Format | Notes |
|---|---|---|
| **GitHub Releases** | `.dmg` (macOS), `.AppImage` / `.deb` (Linux) | Primary distribution, auto-generated by Tauri |
| **Homebrew** (future) | `brew install think` | macOS convenience |
| **AUR** (future) | Community-maintained | Arch Linux |

### Open Source Strategy

- **License:** MIT — permissive, allows commercial forks
- **Repository:** Public GitHub repo
- **AI costs:** Users sign in with their own AI provider account (OpenAI, Google, Anthropic). Billed directly by the provider.
- **No backend server:** Think is fully local. No accounts, no cloud, no tracking. OAuth tokens stored in OS keychain.
- **Contributions:** Accept PRs for new AI providers, node types, export formats, and layout algorithms

### BYOA (Bring Your Own Account) Model

Since Think is free and open source, AI features use the user's own provider account via OAuth:

1. First launch → Welcome screen with "Sign in with OpenAI / Google / Anthropic"
2. Browser opens → standard OAuth consent screen
3. User signs in with their existing account
4. OAuth tokens stored securely in OS keychain (via `tauri-plugin-stronghold`)
5. All API calls go directly from the user's machine to the provider
6. No proxy server, no middleman, no data collection
7. Users can connect multiple providers and switch between them
8. Ollama option available for fully offline, free, local AI (no account needed)

---

*This is a living document. Update as the product evolves.*
