# Task P2-06: Settings & Multi-Provider

**Phase:** 2 — Polish & Usability  
**Estimate:** 3-4 days  
**Dependencies:** Phase 1 complete  
**PRD Reference:** Sections 9.5, 9.5.1

---

## Goal

Build a settings screen for managing AI providers (connect/disconnect accounts, switch active provider) and app preferences (theme, etc.). Add Google Gemini as the second AI provider.

---

## Subtasks

### 6.1 Settings screen
- [ ] Create `src/features/settings/SettingsScreen.tsx`
- [ ] Open via gear icon in top bar
- [ ] Slides in as a panel or opens as a modal/page
- [ ] Sections:
  - **AI Providers** — manage connected accounts
  - **Appearance** — theme preferences (prep for dark mode)
  - **About** — version, links, license info

### 6.2 AI Providers section
- [ ] List all available providers:
  - OpenAI: status (connected / not connected), "Sign in" / "Sign out" button
  - Google Gemini: same
  - Anthropic: coming soon (disabled)
  - Ollama: coming soon (disabled)
- [ ] Active provider indicator (radio button or highlight)
- [ ] Switch active provider: click to select, confirm

### 6.3 Google Gemini provider
- [ ] Create `src/services/ai/providers/gemini.ts`
- [ ] Implements `AIProvider` interface
- [ ] Uses Google's Gemini API (or Vercel AI SDK's `@ai-sdk/google`)
- [ ] OAuth: Google OAuth 2.0 (user signs in with Google account)
- [ ] Chat: streaming via Gemini API
- [ ] Build: structured output (Gemini supports JSON mode)
- [ ] Model: `gemini-2.0-flash` (or latest)

### 6.4 Google OAuth flow
- [ ] Add Google OAuth to the auth system (Task 07 patterns)
- [ ] "Sign in with Google" button in settings + welcome screen
- [ ] Scopes: Gemini API access
- [ ] Token storage in Stronghold (same pattern as OpenAI)

### 6.5 Provider switcher
- [ ] Quick switcher in the chat sidebar (small dropdown or icon)
- [ ] Shows currently active provider name/icon
- [ ] Click to switch between connected providers
- [ ] Switching mid-conversation is allowed (conversation continues with new provider)

### 6.6 Appearance settings
- [ ] Theme selector: Light (default), System (prep for dark mode)
- [ ] Font size: Small, Medium (default), Large
- [ ] Store preferences in SQLite settings table

---

## Acceptance Criteria

- [ ] Settings screen opens and shows all sections
- [ ] Can connect/disconnect OpenAI and Google Gemini
- [ ] Can switch active provider
- [ ] Gemini provider works for chat and Build
- [ ] Provider status shown correctly (connected/not connected)
- [ ] Appearance settings are saved and applied
