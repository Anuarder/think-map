import { nanoid } from 'nanoid';
import { create } from 'zustand';

import type { ChatMessage } from '../types';

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

function getSessionTitle(session: ChatSession): string {
  const first = session.messages.find((m) => m.role === 'user');
  if (!first) return 'New chat';
  return first.content.length > 40 ? first.content.slice(0, 40) + '…' : first.content;
}

function createSession(): ChatSession {
  const now = new Date().toISOString();
  return { id: nanoid(), messages: [], createdAt: now, updatedAt: now };
}

interface ChatState {
  sessions: ChatSession[];
  activeChatId: string;
  isStreaming: boolean;
  streamingContent: string;
  error: string | null;

  // Getters (derived)
  getActiveSession: () => ChatSession | undefined;
  getSessionTitle: (session: ChatSession) => string;

  // Chat session actions
  createNewChat: () => void;
  switchChat: (id: string) => void;
  deleteChat: (id: string) => void;

  // Message actions
  addMessage: (message: ChatMessage) => void;
  setStreaming: (isStreaming: boolean) => void;
  appendStreamingContent: (chunk: string) => void;
  finalizeStreamingMessage: () => void;
  setError: (error: string | null) => void;

  // Legacy compat
  clearMessages: () => void;
  loadMessages: (messages: ChatMessage[]) => void;
}

const initialSession = createSession();

export const useChatStore = create<ChatState>((set, get) => ({
  sessions: [initialSession],
  activeChatId: initialSession.id,
  isStreaming: false,
  streamingContent: '',
  error: null,

  getActiveSession: () => {
    const { sessions, activeChatId } = get();
    return sessions.find((s) => s.id === activeChatId);
  },

  getSessionTitle,

  createNewChat: () => {
    const session = createSession();
    set((state) => ({
      sessions: [session, ...state.sessions],
      activeChatId: session.id,
      streamingContent: '',
      isStreaming: false,
      error: null,
    }));
  },

  switchChat: (id) => {
    set({ activeChatId: id, streamingContent: '', isStreaming: false, error: null });
  },

  deleteChat: (id) => {
    const { sessions, activeChatId } = get();
    const remaining = sessions.filter((s) => s.id !== id);

    if (remaining.length === 0) {
      const fresh = createSession();
      set({ sessions: [fresh], activeChatId: fresh.id });
      return;
    }

    const newActiveId = activeChatId === id ? remaining[0].id : activeChatId;
    set({ sessions: remaining, activeChatId: newActiveId });
  },

  addMessage: (message) => {
    const now = new Date().toISOString();
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === state.activeChatId
          ? { ...s, messages: [...s.messages, message], updatedAt: now }
          : s,
      ),
    }));
  },

  setStreaming: (isStreaming) => set({ isStreaming }),

  appendStreamingContent: (chunk) =>
    set((state) => ({ streamingContent: state.streamingContent + chunk })),

  finalizeStreamingMessage: () => {
    const { streamingContent, activeChatId } = get();
    if (!streamingContent) return;

    const finalMessage: ChatMessage = {
      id: nanoid(),
      project_id: '',
      role: 'assistant',
      content: streamingContent,
      linked_node_ids: '[]',
      created_at: new Date().toISOString(),
    };

    const now = new Date().toISOString();
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === activeChatId
          ? { ...s, messages: [...s.messages, finalMessage], updatedAt: now }
          : s,
      ),
      streamingContent: '',
      isStreaming: false,
    }));
  },

  setError: (error) => set({ error }),

  clearMessages: () => {
    const now = new Date().toISOString();
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === state.activeChatId ? { ...s, messages: [], updatedAt: now } : s,
      ),
      streamingContent: '',
      error: null,
    }));
  },

  loadMessages: (messages) => {
    const now = new Date().toISOString();
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === state.activeChatId ? { ...s, messages, updatedAt: now } : s,
      ),
    }));
  },
}));
