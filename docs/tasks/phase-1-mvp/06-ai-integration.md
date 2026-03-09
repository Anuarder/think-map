# Task 06: AI Integration & Provider Layer

**Phase:** 1 — MVP  
**Estimate:** 2-3 days  
**Dependencies:** Task 01 (Project Setup)  
**PRD Reference:** Sections 9.5, 11

---

## Goal

Build the AI service layer: a provider-agnostic interface, the OpenAI implementation, chat mode (streaming conversation), and build mode (structured JSON output for mind maps). This is the "brain" of Think.

---

## Subtasks

### 6.1 AI Provider interface
- [ ] Create `src/services/ai/types.ts`:

```typescript
interface AIProvider {
  id: string;
  name: string;
  authMethod: 'oauth' | 'local';
  isAuthenticated(): Promise<boolean>;
  chat(
    messages: ChatMessage[],
    systemPrompt: string,
    onChunk: (text: string) => void,
    signal?: AbortSignal,
  ): Promise<void>;
  buildMindMap(
    messages: ChatMessage[],
    systemPrompt: string,
  ): Promise<MindMapStructure>;
}
```

- [ ] Create `src/services/ai/provider-registry.ts`:
  - `registerProvider(provider: AIProvider)`
  - `getProvider(id: string): AIProvider`
  - `getActiveProvider(): AIProvider`
  - `setActiveProvider(id: string)`
  - `listProviders(): AIProvider[]`

### 6.2 OpenAI provider implementation
- [ ] Create `src/services/ai/providers/openai.ts`
- [ ] Implements `AIProvider` interface
- [ ] Uses Vercel AI SDK (`ai` + `@ai-sdk/openai`) for:
  - Streaming chat via `streamText()`
  - Structured output via `generateObject()` for Build mode
- [ ] Chat method:
  - Sends system prompt + conversation history
  - Streams response chunks via `onChunk` callback
  - Supports `AbortSignal` for cancellation (user can stop mid-response)
  - Model: `gpt-4o` (default, configurable later)
- [ ] Build method:
  - Sends system prompt + conversation history
  - Uses structured output / JSON mode to get `MindMapStructure`
  - Returns the parsed structure
- [ ] Authentication: reads OAuth token from Stronghold (Task 07 wires this in)
  - For MVP testing: support a fallback `OPENAI_API_KEY` environment variable

### 6.3 Chat system prompt
- [ ] Create `src/services/ai/prompts.ts`
- [ ] Define `CHAT_SYSTEM_PROMPT`:

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

### 6.4 Build system prompt
- [ ] Define `BUILD_SYSTEM_PROMPT` in the same file:

```
Analyze the conversation and produce a mind map as JSON.

Output a single JSON object with this exact structure:
{
  "rootNode": {
    "text": "Central Idea (3-7 words)",
    "description": "Brief context from conversation",
    "type": "idea",
    "children": [
      {
        "text": "Branch Label",
        "description": "Context...",
        "type": "idea | question | action | note | risk",
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
9. Descriptions should provide enough context to understand the idea 
   without re-reading the entire chat
10. Aim for 10-30 nodes total depending on conversation length
```

### 6.5 MindMapStructure validation
- [ ] Create a Zod schema for `MindMapStructure` to validate AI output:

```typescript
import { z } from 'zod';

const nodeTypeSchema = z.enum(['idea', 'question', 'action', 'note', 'risk']);

const mindMapNodeSchema: z.ZodType<MindMapNode> = z.object({
  text: z.string().min(1).max(100),
  description: z.string().optional(),
  type: nodeTypeSchema,
  children: z.lazy(() => mindMapNodeSchema.array()).default([]),
});

const mindMapStructureSchema = z.object({
  rootNode: mindMapNodeSchema,
});
```

- [ ] Use this schema with Vercel AI SDK's `generateObject()` for type-safe Build output
- [ ] Handle validation failures: retry once, then show error to user

### 6.6 AI service facade
- [ ] Create `src/services/ai/ai-service.ts` — high-level API used by components:
  - `sendChatMessage(messages, onChunk, signal)` — uses active provider + chat prompt
  - `buildMindMap(messages)` — uses active provider + build prompt
  - `cancelCurrentRequest()` — aborts in-flight request
- [ ] Handles provider selection, prompt injection, error wrapping
- [ ] Components never interact with providers directly — only through this facade

### 6.7 Error handling
- [ ] Define AI-specific error types:
  - `AIAuthError` — not authenticated, token expired
  - `AIRateLimitError` — rate limited by provider
  - `AINetworkError` — no internet, timeout
  - `AIResponseError` — invalid response from provider
- [ ] Map provider-specific errors to these types
- [ ] Return user-friendly error messages for each type

---

## Acceptance Criteria

- [ ] `AIProvider` interface is defined and the registry works
- [ ] OpenAI provider can send a streaming chat message (test with API key env var)
- [ ] Streaming chunks arrive and can be displayed
- [ ] OpenAI provider can generate a structured `MindMapStructure` JSON
- [ ] The JSON is validated against the Zod schema
- [ ] System prompts are well-crafted and produce good results
- [ ] AbortSignal cancellation works (can stop a streaming response)
- [ ] Errors are caught and mapped to user-friendly messages
- [ ] Provider registry allows switching active provider (future-proof)

---

## Technical Notes

- Install Vercel AI SDK: `pnpm add ai @ai-sdk/openai`
- Install Zod: `pnpm add zod`
- Vercel AI SDK's `streamText` returns an async iterable of chunks — perfect for our `onChunk` callback
- `generateObject` with a Zod schema gives type-safe structured output from OpenAI
- For MVP: use `OPENAI_API_KEY` env var or a hardcoded test key (NOT committed). OAuth replaces this in Task 07.
- The AI SDK handles streaming, retries, and structured output — we don't need to manually implement SSE parsing
- Consider setting `temperature: 0.7` for chat (creative) and `temperature: 0.3` for build (structured)
- Token limits: keep conversation history to last 20-30 messages to avoid exceeding context window
