import { useCallback, useEffect, useRef } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

const LINE_HEIGHT = 24;
const MAX_LINES = 4;
const MAX_HEIGHT = LINE_HEIGHT * MAX_LINES;

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export function ChatInput({ value, onChange, onSend, disabled = false }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [value, resizeTextarea]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) {
        onSend();
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value);
  }

  const canSend = !disabled && value.trim().length > 0;

  return (
    <div className="flex items-end gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm transition-colors focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Describe your idea..."
        rows={1}
        className="flex-1 resize-none bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none disabled:opacity-50"
        style={{ lineHeight: `${LINE_HEIGHT}px`, maxHeight: `${MAX_HEIGHT}px`, overflowY: 'auto' }}
        aria-label="Chat input"
      />
      <button
        type="button"
        onClick={onSend}
        disabled={!canSend}
        className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
        aria-label="Send message"
        title="Send message"
      >
        <SendIcon />
      </button>
    </div>
  );
}
