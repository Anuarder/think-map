# Task 07: OAuth Authentication

**Phase:** 1 — MVP  
**Estimate:** 2-3 days  
**Dependencies:** Task 02 (Tauri Backend), Task 06 (AI Integration)  
**PRD Reference:** Section 9.5.1

---

## Goal

Implement OAuth 2.0 with PKCE flow for OpenAI authentication. The user clicks "Sign in with OpenAI," a browser window opens for consent, tokens are returned and stored securely, and the AI provider uses them for API calls. Also build the welcome/onboarding screen.

---

## Subtasks

### 7.1 Research OAuth specifics for OpenAI
- [ ] Investigate OpenAI's OAuth/PKCE flow (same as Codex CLI uses)
- [ ] Document: authorization endpoint, token endpoint, required scopes
- [ ] Determine if Think needs to be registered as an OAuth app with OpenAI
- [ ] If registration is needed and not yet done: implement a fallback API key input as temporary workaround
- [ ] Check how gemini-cli and Codex CLI handle the client_id (some use a shared/public client ID)

### 7.2 OAuth PKCE flow (Rust side)
- [ ] Create `src-tauri/src/commands/auth.rs`
- [ ] Implement PKCE flow:
  1. Generate `code_verifier` (random 43-128 char string)
  2. Compute `code_challenge` (SHA256 + base64url of verifier)
  3. Build authorization URL with: `client_id`, `redirect_uri`, `code_challenge`, `code_challenge_method=S256`, `scope`, `state`
  4. Open URL in system browser via `tauri::api::shell::open`
  5. Start a temporary localhost HTTP server (e.g., `127.0.0.1:9876`) to receive the callback
  6. Receive the authorization `code` from the redirect
  7. Exchange `code` + `code_verifier` for access token + refresh token
  8. Store tokens in Stronghold (from Task 02)
  9. Return success to the frontend

- [ ] Tauri command: `start_oauth(provider: String) -> Result<(), String>`
- [ ] Tauri command: `get_auth_status(provider: String) -> AuthStatus`
- [ ] Tauri command: `sign_out(provider: String) -> Result<(), String>`

### 7.3 Token management
- [ ] Store in Stronghold:
  - `openai_access_token`
  - `openai_refresh_token`
  - `openai_token_expiry` (ISO timestamp)
- [ ] Create `refresh_token_if_needed(provider: String) -> Result<String, String>` Tauri command
  - Check expiry, refresh if within 5 minutes of expiring
  - Return the valid access token
- [ ] Auto-refresh: before each API call, check token validity
- [ ] On refresh failure (token revoked): clear tokens, prompt re-authentication

### 7.4 Frontend auth bridge
- [ ] Create `src/services/auth.ts`:
  - `startOAuth(provider: string): Promise<void>` — calls Tauri command
  - `getAuthStatus(provider: string): Promise<AuthStatus>` — connected, expired, not-connected
  - `getAccessToken(provider: string): Promise<string>` — gets valid token (auto-refreshes)
  - `signOut(provider: string): Promise<void>`
- [ ] Create auth Zustand store `src/stores/auth-store.ts`:
  - `providers: Record<string, AuthStatus>`
  - `activeProvider: string | null`
  - `checkAuthStatus()` — polls all providers on app startup
  - `setActiveProvider(id)`

### 7.5 Wire OAuth token into OpenAI provider
- [ ] Update `src/services/ai/providers/openai.ts`:
  - Before each API call, get token via `getAccessToken('openai')`
  - Pass token as Bearer auth header
  - Handle `AIAuthError` when token is invalid/expired
  - On auth error: mark provider as needing re-auth, notify UI

### 7.6 Welcome screen
- [ ] Create `src/features/auth/WelcomeScreen.tsx`
- [ ] Shown on first launch (when no provider is authenticated)
- [ ] Design:
  - Think logo/icon (centered, prominent)
  - "Welcome to Think" heading
  - Brief description: "Your AI thinking partner. Chat about ideas, build mind maps."
  - "Sign in with OpenAI" button (primary, large)
  - Small text: "Think uses your own OpenAI account. Your data stays on your device."
  - Later (Phase 2): additional provider buttons below
- [ ] After successful auth: navigate to main app
- [ ] Store "has_seen_welcome" flag in settings so it doesn't show again

### 7.7 API key fallback (temporary)
- [ ] Since OAuth registration may be deferred, provide a fallback:
  - In the welcome screen: "Or enter your API key manually" link
  - Simple modal: paste OpenAI API key → store in Stronghold
  - The OpenAI provider checks: OAuth token first, then fallback to API key
- [ ] This allows development and testing before OAuth app registration is complete
- [ ] Mark this clearly as "temporary" in the UI and code

---

## Acceptance Criteria

- [ ] User can authenticate with OpenAI (via OAuth or API key fallback)
- [ ] Tokens are stored securely in Stronghold (not in plain text, not in SQLite)
- [ ] Token refresh works automatically before expiry
- [ ] Auth status is displayed in the UI (connected / not connected)
- [ ] Welcome screen appears on first launch
- [ ] After auth, the main app loads and AI features work
- [ ] Sign out clears tokens and returns to welcome screen
- [ ] App handles auth errors gracefully (expired, revoked, network)

---

## Technical Notes

- OAuth PKCE is the standard for native/desktop apps (no client secret needed)
- The localhost callback server should use a random port or fixed port (e.g., 9876) and only listen briefly
- Some providers may require a registered `redirect_uri` of `http://localhost:PORT/callback`
- The `state` parameter prevents CSRF — generate a random string, verify on callback
- Stronghold is encrypted at rest — much more secure than localStorage/SQLite for secrets
- If OpenAI doesn't support public OAuth yet for third-party apps, the API key fallback is essential
- Consider using `tauri-plugin-deep-link` for `think://callback` custom protocol as an alternative to localhost
- Test the full flow: sign in → get token → make API call → verify it works → token expires → auto-refresh → works again
