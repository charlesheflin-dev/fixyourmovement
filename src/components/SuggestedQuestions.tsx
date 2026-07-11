// src/components/SuggestedQuestions.tsx
// Suggested question pills shown above the Ask Dr. Jonathan input on first load.
// Fills the existing controlled input via setValue/inputRef — never submits automatically.

import { useState } from 'react';
import {
  HelpCircle,
  Sunrise,
  Footprints,
  Clock,
  GitCompare,
  Lock,
  CreditCard,
  Activity,
  ChevronRight,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';

interface SuggestedQuestion {
  text: string;
  Icon: LucideIcon;
}

const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  { text: 'Will this work for me?', Icon: HelpCircle },
  { text: 'Why does my heel hurt more in the morning?', Icon: Sunrise },
  { text: 'Can I keep walking while I recover?', Icon: Footprints },
  { text: 'How long does recovery usually take?', Icon: Clock },
  { text: 'How is this different from physical therapy?', Icon: GitCompare },
  { text: "What's included in Lifetime Access?", Icon: Lock },
  { text: 'Can I use my HSA or FSA?', Icon: CreditCard },
  { text: "What if I don't have plantar fasciitis?", Icon: Activity },
];

interface SuggestedQuestionsProps {
  setValue: (value: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  conversationStarted?: boolean;
}

export default function SuggestedQuestions({
  setValue,
  inputRef,
  conversationStarted = false,
}: SuggestedQuestionsProps) {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleQuestionClick = (question: string) => {
    // Updates the existing controlled input. Does not touch the DOM directly,
    // so the selected question survives future React renders.
    setValue(question);
    setDismissed(true);

    // Wait for React to flush the controlled input update before focusing —
    // nothing is submitted automatically.
    window.requestAnimationFrame(() => {
      const input = inputRef.current;
      input?.focus();
      if (input && typeof input.setSelectionRange === 'function') {
        const cursorPosition = question.length;
        input.setSelectionRange(cursorPosition, cursorPosition);
      }
    });
  };

  // Hide once a question is picked or the conversation has moved past the
  // welcome message. Reappears only if the parent remounts this component
  // (page refresh / new conversation).
  if (dismissed || conversationStarted) {
    return null;
  }

  const visibleQuestions = expanded ? SUGGESTED_QUESTIONS : SUGGESTED_QUESTIONS.slice(0, 4);

  return (
    <section aria-labelledby="suggested-questions-heading" className="mx-auto max-w-2xl">
      <h2
        id="suggested-questions-heading"
        className="mb-3 text-sm font-semibold text-gray-700"
      >
        Not sure where to start? Try one of these:
      </h2>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {visibleQuestions.map(({ text, Icon }) => (
          <button
            key={text}
            type="button"
            onClick={() => handleQuestionClick(text)}
            aria-label={`Use suggested question: ${text}`}
            className="flex min-h-[48px] items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Icon className="h-5 w-5 flex-shrink-0 text-blue-600" strokeWidth={1.8} />
            <span className="flex-1 text-sm font-medium leading-snug text-gray-800">
              {text}
            </span>
            <ChevronRight className="h-4 w-4 flex-shrink-0 text-blue-600" />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
        aria-controls="additional-suggested-questions"
        className="mt-2 flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800"
      >
        <span>{expanded ? 'Fewer questions' : 'More questions'}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      <span
        id="additional-suggested-questions"
        role="status"
        aria-live="polite"
        className="sr-only"
      >
        {expanded ? 'All eight suggested questions are visible.' : 'Four suggested questions are visible.'}
      </span>
    </section>
  );
}
