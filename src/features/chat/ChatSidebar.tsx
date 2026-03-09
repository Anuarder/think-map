import { nanoid } from 'nanoid';
import { useState } from 'react';

import type { ChatSession } from '../../stores/chat-store';
import { useChatStore } from '../../stores/chat-store';
import { ChatInput } from './ChatInput';
import { ChatMessageList } from './ChatMessageList';

const CONVERSATION_STARTERS = [
  'Explore a business idea',
  'Break down a topic',
  'Plan a project',
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function ComposeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M12 7v5M9.5 9.5h5" />
    </svg>
  );
}

function ChatsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-400"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// ─── Chat history list ─────────────────────────────────────────────────────────

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

interface ChatHistoryListProps {
  sessions: ChatSession[];
  activeChatId: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onDelete: (id: string) => void;
}

function ChatHistoryList({ sessions, activeChatId, onSelect, onNewChat, onDelete }: ChatHistoryListProps) {
  const getTitle = useChatStore((s) => s.getSessionTitle);

  return (
    <div className="flex flex-col gap-1.5 px-2 py-2">
      <button
        type="button"
        onClick={onNewChat}
        className="flex items-center gap-2.5 rounded-lg border border-dashed border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
      >
        <ComposeIcon />
        <span>New chat</span>
      </button>

      {sessions.map((session) => {
        const isActive = session.id === activeChatId;
        const title = getTitle(session);
        const preview = session.messages[session.messages.length - 1]?.content ?? '';

        return (
          <div
            key={session.id}
            className={`group relative overflow-hidden rounded-lg border bg-white transition-all ${
              isActive
                ? 'border-blue-200 shadow-sm shadow-blue-100 ring-1 ring-blue-200/60'
                : 'border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {/* Full-width content — text fills all available space */}
            <button
              type="button"
              onClick={() => onSelect(session.id)}
              className="w-full px-3 py-2.5 text-left"
            >
              <p
                className={`truncate text-xs font-medium ${isActive ? 'text-blue-700' : 'text-gray-700'}`}
              >
                {title}
              </p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <p className="flex-1 truncate text-[11px] leading-tight text-gray-400">
                  {preview || <span className="italic text-gray-300">Empty chat</span>}
                </p>
                <span className="shrink-0 text-[10px] text-gray-400">
                  {formatRelativeTime(session.updatedAt)}
                </span>
              </div>
            </button>

            {/* Hover overlay: gradient fade + action button */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              <div className="h-full w-8 bg-gradient-to-r from-transparent to-white" />
              <div className="pointer-events-auto flex h-full items-center bg-white pr-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(session.id);
                  }}
                  className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-red-50 hover:text-red-400"
                  aria-label="Delete chat"
                  title="Delete chat"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main sidebar ─────────────────────────────────────────────────────────────

interface ChatSidebarProps {
  onBuild?: () => void;
  isBuildLoading?: boolean;
}

export function ChatSidebar({ onBuild, isBuildLoading = false }: ChatSidebarProps) {
  const sessions = useChatStore((s) => s.sessions);
  const activeChatId = useChatStore((s) => s.activeChatId);
  const isStreaming = useChatStore((s) => s.isStreaming);
  const streamingContent = useChatStore((s) => s.streamingContent);
  const addMessage = useChatStore((s) => s.addMessage);
  const createNewChat = useChatStore((s) => s.createNewChat);
  const switchChat = useChatStore((s) => s.switchChat);
  const getActiveSession = useChatStore((s) => s.getActiveSession);
  const getSessionTitle = useChatStore((s) => s.getSessionTitle);

  const [showHistory, setShowHistory] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const activeSession = getActiveSession();
  const messages = activeSession?.messages ?? [];
  const chatTitle = activeSession ? getSessionTitle(activeSession) : 'New chat';

  const hasMessages = messages.length > 0 || isStreaming;
  const canBuild = messages.length > 0 && !isStreaming;
  const canSend = !isStreaming;

  function handleSend() {
    const trimmed = inputValue.trim();
    if (!trimmed || !canSend) return;

    addMessage({
      id: nanoid(),
      project_id: '',
      role: 'user',
      content: trimmed,
      linked_node_ids: '[]',
      created_at: new Date().toISOString(),
    });

    setInputValue('');
  }

  function handleNewChat() {
    const active = getActiveSession();
    if (active && active.messages.length === 0 && !inputValue.trim()) {
      setShowHistory(false);
      return;
    }
    createNewChat();
    setInputValue('');
    setShowHistory(false);
  }

  function handleSelectChat(id: string) {
    switchChat(id);
    setInputValue('');
    setShowHistory(false);
  }

  function handleDeleteChat(id: string) {
    const isLastChat = sessions.length === 1;
    useChatStore.getState().deleteChat(id);
    if (isLastChat) {
      setShowHistory(false);
    }
  }

  function handleStarterClick(starter: string) {
    setInputValue(starter);
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="relative flex shrink-0 items-center justify-between border-b border-gray-100 px-2 py-1.5">
        {showHistory ? (
          <>
            <button
              type="button"
              onClick={() => setShowHistory(false)}
              className="flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <BackIcon />
              <span>Back</span>
            </button>
            <span className="absolute left-1/2 -translate-x-1/2 text-xs font-medium text-gray-600">
              Chats
            </span>
            <div className="w-16" />
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              title="All chats"
            >
              <ChatsIcon />
              <span className="max-w-[140px] truncate">{chatTitle}</span>
            </button>

            <button
              type="button"
              onClick={handleNewChat}
              className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="New chat"
              title="New chat"
            >
              <ComposeIcon />
            </button>
          </>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {showHistory ? (
          <ChatHistoryList
            sessions={sessions}
            activeChatId={activeChatId}
            onSelect={handleSelectChat}
            onNewChat={handleNewChat}
            onDelete={handleDeleteChat}
          />
        ) : !hasMessages ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-4 py-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <BrainIcon />
              <h2 className="text-sm font-semibold text-gray-700">What&apos;s on your mind?</h2>
              <p className="text-xs leading-relaxed text-gray-400">
                Start a conversation to explore your idea, then build a mind map.
              </p>
            </div>

            <div className="flex w-full flex-col gap-1.5">
              {CONVERSATION_STARTERS.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => handleStarterClick(starter)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-xs text-gray-600 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  {starter}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <ChatMessageList
            messages={messages}
            isStreaming={isStreaming}
            streamingContent={streamingContent}
          />
        )}
      </div>

      {/* Footer — only in chat view */}
      {!showHistory && (
        <div className="shrink-0 border-t border-gray-100 px-3 pb-3 pt-2">
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              onClick={onBuild}
              disabled={!canBuild || isBuildLoading}
              title={!canBuild ? 'Chat with AI first to generate a mind map' : 'Build mind map'}
              className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.97] disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-300 disabled:shadow-none"
            >
              {isBuildLoading ? (
                <>
                  <LoadingSpinner />
                  <span>Building…</span>
                </>
              ) : (
                <>
                  <SparkleIcon />
                  <span>Build</span>
                </>
              )}
            </button>
          </div>

          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            disabled={!canSend}
          />
        </div>
      )}
    </div>
  );
}
