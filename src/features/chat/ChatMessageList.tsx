import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { ChatMessage } from '../../types';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isStreaming: boolean;
  streamingContent: string;
}

function UserMessage({ message }: { message: ChatMessage }) {
  return (
    <div className="flex flex-col items-end gap-1">
      <span className="px-1 text-[10px] font-medium tracking-wide text-gray-400 uppercase">
        You
      </span>
      <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-blue-600 px-3.5 py-2.5 text-sm text-white shadow-sm">
        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
}

function AIMessage({ content, isStreaming = false }: { content: string; isStreaming?: boolean }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="px-1 text-[10px] font-medium tracking-wide text-gray-400 uppercase">
        Think AI
      </span>
      <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm text-gray-800 shadow-sm ring-1 ring-gray-100">
        <div className="prose prose-sm max-w-none prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-xs prose-code:font-mono prose-pre:rounded-lg prose-pre:bg-gray-50 prose-pre:ring-1 prose-pre:ring-gray-200">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
        {isStreaming && (
          <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse rounded-full bg-gray-400 align-middle" />
        )}
      </div>
    </div>
  );
}

export function ChatMessageList({ messages, isStreaming, streamingContent }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, streamingContent]);

  if (messages.length === 0 && !isStreaming) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 px-3 py-4">
      {messages.map((message) =>
        message.role === 'user' ? (
          <UserMessage key={message.id} message={message} />
        ) : (
          <AIMessage key={message.id} content={message.content} />
        ),
      )}

      {isStreaming && (
        <AIMessage content={streamingContent || ' '} isStreaming />
      )}

      <div ref={bottomRef} />
    </div>
  );
}
