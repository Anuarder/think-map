# Task 05: Chat Sidebar

**Phase:** 1 — MVP  
**Estimate:** 2-3 days  
**Dependencies:** Task 03 (App Shell & Layout)  
**PRD Reference:** Sections 6.1, 8.3

---

## Goal

Build the chat sidebar UI: message list with bubbles, text input area, streaming response rendering, and the Build button. This is where the user has a conversation with AI before generating a mind map.

---

## Subtasks

### 5.1 Chat Zustand store
- [ ] Create `src/stores/chat-store.ts`
- [ ] State:
  - `messages: ChatMessage[]`
  - `isStreaming: boolean` — true while AI is responding
  - `streamingContent: string` — accumulated text of current streaming response
  - `error: string | null` — last error message
- [ ] Actions:
  - `addMessage(message: ChatMessage)`
  - `setStreaming(isStreaming: boolean)`
  - `appendStreamingContent(chunk: string)`
  - `finalizeStreamingMessage()` — convert streaming content to a regular message
  - `clearMessages()` — for new projects
  - `loadMessages(messages: ChatMessage[])` — from saved project
  - `setError(error: string | null)`

### 5.2 Message list component
- [ ] Create `src/features/chat/ChatMessageList.tsx`
- [ ] Render list of messages with distinct styles:
  - **User messages:** right-aligned, blue/primary background, white text
  - **AI messages:** left-aligned, light gray background, dark text
- [ ] Each message shows:
  - Role indicator (subtle "You" / "Think AI" label)
  - Message content (rendered as markdown for AI messages)
  - Timestamp (optional, subtle)
- [ ] AI messages: render markdown with `react-markdown` + `remark-gfm`
  - Support: bold, italic, lists, code blocks, headers
  - Style code blocks with a subtle background
- [ ] Scrollable container with `overflow-y-auto`
- [ ] Auto-scroll to bottom when new messages arrive
- [ ] Smooth scroll behavior

### 5.3 Streaming response display
- [ ] While `isStreaming === true`, show a temporary message bubble with `streamingContent`
- [ ] Content updates in real-time as chunks arrive
- [ ] Show a subtle typing indicator (blinking cursor or pulsing dots) at the end of the streaming text
- [ ] When streaming completes, replace with the final message (via `finalizeStreamingMessage`)
- [ ] Handle streaming errors: show error message in the chat

### 5.4 Chat input area
- [ ] Create `src/features/chat/ChatInput.tsx`
- [ ] Multi-line textarea (auto-grows up to 4 lines, then scrolls)
- [ ] Send button (right side of input, icon or "Send" text)
- [ ] Send on Enter (without Shift), new line on Shift+Enter
- [ ] Disable input + send button while AI is streaming
- [ ] Placeholder text: "Describe your idea..."
- [ ] Focus input on mount
- [ ] Visual styling:
  - Border with rounded corners
  - Focus ring on focus
  - Subtle transition

### 5.5 Build button
- [ ] Create prominent "Build" button between the message list and input area
- [ ] Design:
  - Full width of sidebar
  - Primary color (blue/indigo) background
  - "Build Mind Map" label with a ▶ or ✨ icon
  - Rounded corners, padding
  - Disabled state: grayed out when no messages or while streaming
- [ ] Loading state: spinner/animation while Build is processing
- [ ] On click: triggers the Build flow (implemented in Task 08, wired here as a callback prop)
- [ ] Tooltip when disabled: "Chat with AI first to generate a mind map"

### 5.6 Chat sidebar container
- [ ] Create `src/features/chat/ChatSidebar.tsx` — parent component
- [ ] Layout (top to bottom):
  1. Message list (scrollable, flex-1)
  2. Build button (fixed height)
  3. Chat input (fixed at bottom, auto-grow)
- [ ] Full height of the sidebar area
- [ ] No horizontal scroll

### 5.7 Empty state
- [ ] When there are no messages, show a centered empty state:
  - Think logo or icon
  - "Start thinking" or "What's on your mind?"
  - Optionally: 2-3 conversation starter chips (e.g., "Explore a business idea", "Break down a topic", "Plan a project")
  - Clicking a starter fills the input with that text
- [ ] Empty state disappears once the first message is sent

---

## Acceptance Criteria

- [ ] Chat sidebar renders in the left panel with correct layout
- [ ] Can type a message and "send" it (adds to message list, no AI yet)
- [ ] User and AI messages have distinct visual styles
- [ ] AI messages render markdown correctly (bold, lists, code)
- [ ] Streaming text displays character by character with a cursor
- [ ] Auto-scrolls to the latest message
- [ ] Build button is visible and shows disabled/enabled/loading states
- [ ] Empty state shows when no messages exist
- [ ] Send on Enter, new line on Shift+Enter
- [ ] Input is disabled while AI is streaming

---

## Technical Notes

- For auto-growing textarea: use a hidden div that mirrors content to calculate height, or use `field-sizing: content` CSS (newer browsers) or a library like `react-textarea-autosize`
- `react-markdown` with `remark-gfm` handles GitHub Flavored Markdown (tables, strikethrough, etc.)
- Auto-scroll: use `useRef` on the message container, call `scrollTo({ top: scrollHeight, behavior: 'smooth' })` via `useEffect` when messages change
- The Build button doesn't implement the actual Build logic — it just calls a callback. The logic is in Task 08.
- Consider using `requestAnimationFrame` for smooth streaming text updates to avoid excessive rerenders
