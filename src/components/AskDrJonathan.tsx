// src/components/AskDrJonathan.tsx
// Floating chat widget — embed on any page.
// On screens < 640px: full-width bottom sheet.
// On desktop: 380×500 fixed panel, bottom-right.

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function MessageText({ content }: { content: string }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);
  return (
    <>
      {parts.map((part, i) => {
        if (!urlRegex.test(part)) return <span key={i}>{part}</span>;
        const cleanUrl = part.replace(/[.,;:!?)]+$/, '');
        const trailing = part.slice(cleanUrl.length);
        const href = cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`;
        return (
          <span key={i}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline text-blue-300 hover:text-blue-100 break-all">
              {cleanUrl}
            </a>
            {trailing}
          </span>
        );
      })}
    </>
  );
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi — I'm Ask Dr. Jonathan, an AI assistant trained on Dr. Jonathan Schutza's clinical knowledge and the Foot Capacity System program. I can answer questions about plantar fasciitis recovery, how the program works, what to expect from the app, and whether this approach might be right for your situation. What's on your mind?",
};

const API_URL = import.meta.env.VITE_ASK_DR_JONATHAN_URL as string;

export default function AskDrJonathan() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Build history: all messages except the welcome message, last 4 turns
    const history = messages
      .filter((m) => m !== WELCOME_MESSAGE)
      .slice(-4) as Message[];

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok) throw new Error('Network response not ok');

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Something went wrong — please try again or email contact@fixyourmovement.com.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* ── Floating trigger button ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-white shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Open Ask Dr. Jonathan chat"
        >
          {/* Speech bubble icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 16c0 1.1-.9 2-2 2H7l-4 4V6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v10z"
            />
          </svg>
          <span className="text-sm font-medium">Ask Dr. Jonathan</span>
        </button>
      )}

      {/* ── Chat panel ── */}
      {isOpen && (
        <div
          className={`
            fixed z-50 flex flex-col bg-white shadow-2xl
            /* Mobile: full-width bottom sheet */
            bottom-0 left-0 right-0 h-[85vh] rounded-t-2xl
            /* Desktop: fixed panel bottom-right */
            sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto sm:h-[500px] sm:w-[380px] sm:rounded-2xl
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-blue-600 px-4 py-3">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M21 16c0 1.1-.9 2-2 2H7l-4 4V6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v10z"
                />
              </svg>
              <span className="font-semibold text-white">Ask Dr. Jonathan</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-blue-100 hover:bg-blue-700 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Message thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed
                    ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'border border-gray-200 bg-white text-gray-800 rounded-bl-sm'
                    }
                  `}
                >
                  <MessageText content={msg.content} />
                </div>
              </div>
            ))}

            {/* Loading dots */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-gray-200 bg-white px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 p-3">
            <div className="flex items-center gap-2">
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                disabled={isLoading}
                rows={2}
                className="flex-1 rounded-2xl border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 resize-none"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 rotate-90"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-gray-400">
              Powered by The Foot Capacity System
            </p>
          </div>
        </div>
      )}
    </>
  );
}
