# Task 01: Project Setup

**Phase:** 1 — MVP  
**Estimate:** 1-2 days  
**Dependencies:** None  
**PRD Reference:** Section 9.1, 9.2  
**Status:** ✅ Done

---

## Goal

Scaffold the entire project from scratch: Tauri v2 desktop app with React 19, TypeScript, Vite, Tailwind CSS, Zustand, and pnpm. The result is a working desktop window that renders a React app.

---

## Subtasks

### 1.1 Initialize Tauri v2 + React project
- [x] Install Tauri CLI (`cargo install tauri-cli`)
- [x] Run `pnpm create tauri-app think` with React + TypeScript template
- [x] Verify the project structure: `src-tauri/` (Rust) + `src/` (React)
- [x] Run `pnpm tauri dev` — confirm a desktop window opens with the React app

### 1.2 Configure TypeScript
- [x] Set `strict: true` in `tsconfig.json`
- [x] Configure path aliases: `@/` → `src/`
- [x] Ensure Vite resolves the path aliases (`vite.config.ts`)

### 1.3 Install and configure Tailwind CSS
- [x] Install Tailwind CSS v4 (or v3 if v4 has issues with Tauri)
- [x] Configure `tailwind.config.ts` with content paths
- [x] Add Tailwind directives to the main CSS file
- [x] Add base font: Inter (via local font or Google Fonts CDN)
- [x] Verify Tailwind works: add a utility class to the default page, see it render

### 1.4 Install core dependencies
- [x] `@xyflow/react` — React Flow for the canvas
- [x] `zustand` — state management
- [x] `dagre` / `@dagrejs/dagre` — auto-layout algorithm
- [x] `uuid` or `nanoid` — ID generation
- [x] `react-markdown` + `remark-gfm` — markdown rendering for chat
- [x] Verify all deps install cleanly with `pnpm install`

### 1.5 Install dev dependencies
- [x] `eslint` + `@typescript-eslint` — linting
- [x] `prettier` + `prettier-plugin-tailwindcss` — formatting
- [x] Configure `.eslintrc` and `.prettierrc` with basic rules
- [x] Add lint/format scripts to `package.json`

### 1.6 Configure Tauri window
- [x] Set window title to "Think"
- [x] Set default window size: 1280x800
- [x] Set minimum window size: 900x600
- [x] Enable window resizing
- [x] Set window to open centered
- [x] Configure in `src-tauri/tauri.conf.json`

### 1.7 Project structure
- [x] Create the initial folder structure:

```
src/
├── components/          # Shared React components
├── features/
│   ├── canvas/          # React Flow canvas feature
│   ├── chat/            # Chat sidebar feature
│   └── projects/        # Project management feature
├── services/            # AI service, storage bridge
├── stores/              # Zustand stores
├── types/               # Shared TypeScript interfaces
├── lib/                 # Utility functions
├── App.tsx
├── main.tsx
└── index.css

src-tauri/
├── src/
│   ├── main.rs
│   ├── lib.rs
│   └── commands/        # Tauri command handlers
├── Cargo.toml
└── tauri.conf.json
```

### 1.8 Git initialization
- [x] `git init`
- [x] Create `.gitignore` (node_modules, target, dist, .env)
- [ ] Initial commit

---

## Acceptance Criteria

- [x] `pnpm tauri dev` opens a native desktop window on macOS/Linux
- [x] The window shows a React app with Tailwind styles applied
- [x] TypeScript compiles without errors
- [x] ESLint + Prettier run without errors
- [x] All folder structure exists as specified
- [ ] `pnpm tauri build` produces a working binary (even if it's just the default page)

---

## Technical Notes

- Use `pnpm` as package manager (not npm/yarn)
- Tauri v2 is required (not v1) — check `@tauri-apps/cli` version
- React 19 requires compatible versions of react-dom, react-markdown, etc.
- The Vite config must include `@tauri-apps/cli` plugin for Tauri integration
- Rust toolchain must be installed (`rustup`) before Tauri CLI works
