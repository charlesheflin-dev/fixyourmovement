// src/pages/AskDrJonathan.tsx
// Full-page version of the Ask Dr. Jonathan chat for the /ask route.
// Same logic as the widget, but full-screen layout.

import { useState, useRef, useEffect } from 'react';
import logo from '@/assets/logo.png';
import headshot from '@/assets/headshot2.png';
import SuggestedQuestions from '@/components/SuggestedQuestions';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function MessageText({ content, isUser }: { content: string; isUser: boolean }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const isUrl = /^https?:\/\//;
  const parts = content.split(urlRegex);
  return (
    <>
      {parts.map((part, i) => {
        if (!isUrl.test(part)) return <span key={i}>{part}</span>;
        const cleanUrl = part.replace(/[.,:;!?)]+$/, '');
        const trailing = part.slice(cleanUrl.length);
        const href = cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`;
        return (
          <span key={i}>
            <a href={href} target="_blank" rel="noopener noreferrer" className={`underline break-all ${isUser ? 'text-blue-200 hover:text-white' : 'text-blue-600 hover:text-blue-800'}`}>
              {cleanUrl}
            </a>
            {trailing}
          </span>
        );
      })}
    </>
  );
}

function WelcomeCard() {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <img
        src={headshot}
        alt="Dr. Jonathan Schutza"
        className="w-16 flex-shrink-0 rounded-xl object-cover grayscale aspect-[176/250] sm:w-20"
      />
      <div className="space-y-3 text-sm leading-relaxed text-gray-800 sm:text-base">
        <h2 className="text-xl font-bold text-blue-600 sm:text-2xl">Welcome.</h2>
        <p className="font-semibold text-gray-900">
          Before you leave with unanswered questions, ask me.
        </p>
        <p>
          Whether your question is about heel pain, recovery, or if the Foot
          Capacity System is right for you, I'm here to help.
        </p>
        <p>
          I'm Ask Dr. Jonathan, an AI assistant trained on Dr. Jonathan
          Schutza's rehabilitation philosophy, educational content, and the
          Foot Capacity System.
        </p>
        <p>
          You can ask about heel pain, plantar fasciitis, recovery timelines,
          walking, exercise and activity, how the app works, Lifetime Access,
          or HSA/FSA reimbursement. If it's on your mind, there's a good
          chance someone else has wondered the same thing.
        </p>
      </div>
    </div>
  );
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi — I'm Ask Dr. Jonathan, an AI assistant trained on Dr. Jonathan Schutza's clinical knowledge and the Foot Capacity System program. I can answer questions about plantar fasciitis recovery, how the program works, what to expect from the app, and whether this approach might be right for your situation. What's on your mind?",
};

const API_URL = import.meta.env.VITE_ASK_DR_JONATHAN_URL as string;

export default function AskDrJonathanPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isFirstRenderRef = useRef(true);

  const conversationStarted = messages.length > 1;

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

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
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Page header — collapses to a compact bar once the conversation starts */}
      {conversationStarted ? (
        <header className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
          <img src={logo} alt="Foot Capacity System" className="h-9 w-auto" />
          <div>
            <h1 className="text-base font-semibold text-gray-900">Ask Dr. Jonathan</h1>
            <p className="text-xs text-gray-500">Plantar fasciitis recovery Q&A</p>
          </div>
        </header>
      ) : (
        <header className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <div className="mx-auto flex max-w-2xl items-center gap-4">
            <img src={logo} alt="Foot Capacity System" className="h-14 w-auto flex-shrink-0" />
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Ask Dr. Jonathan
              </h1>
              <p className="text-base font-semibold text-blue-600 sm:text-lg">
                Get Answers Before You Decide
              </p>
            </div>
          </div>
        </header>
      )}

      {/* Message thread */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {!conversationStarted && (
            <>
              <WelcomeCard />
              <p className="text-center text-sm leading-relaxed text-gray-600">
                If you're unsure whether the Foot Capacity System is right for
                you, ask before you leave. I'd rather answer your questions
                than have you leave wondering.
              </p>
              <hr className="border-gray-200" />
            </>
          )}

          {messages
            .filter((m) => m !== WELCOME_MESSAGE)
            .map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="mr-2 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    J
                  </div>
                )}
                <div
                  className={`
                    max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                    ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'border border-gray-200 bg-white text-gray-800 rounded-bl-sm shadow-sm'
                    }
                  `}
                >
                  <MessageText content={msg.content} isUser={msg.role === 'user'} />
                </div>
              </div>
            ))}

          <SuggestedQuestions
            setValue={setInput}
            inputRef={inputRef}
            conversationStarted={conversationStarted}
          />

          {isLoading && (
            <div className="flex justify-start">
              <div className="mr-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                J
              </div>
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-gray-200 bg-white px-4 py-3 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about plantar fasciitis recovery..."
            disabled={isLoading}
            rows={2}
            className="flex-1 rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow transition-colors hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 rotate-90"
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
          Ask about recovery, the program, or how the app works. Dr. Jonathan reviews unanswered questions personally.
        </p>
      </div>
    </div>
  );
}
