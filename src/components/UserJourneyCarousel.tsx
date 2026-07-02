import { useState, useEffect, useRef } from "react";

const stories = [
  {
    id: 1,
    alias: "Jamie B.",
    phase: "Phase 2",
    week: "Week 5",
    stats: [
      { label: "Pain Reduction", value: "60%", detail: "7.0 → 2.8 /10", sub: "Pain score" },
      { label: "FAAM Improvement", value: "+33%", detail: "72.6% → 96.4%", sub: "Measured using the validated Foot and Ankle Ability Measure (FAAM)." },
      { label: "Logging Streak", value: "16", detail: "Consecutive", sub: "Days" },
    ],
    headline: "From 7/10 pain to nearly pain-free — while still actively progressing through the program.",
    story: "Jamie B. came into the Foot Capacity System reporting pain at 7 out of 10 — enough to disrupt daily life and limit what she could do on her feet. Her baseline FAAM score of 72.6% told the same story: her foot function was meaningfully impaired before she started.\n\nFive weeks and 27 logged sessions later, Jamie B.'s pain has dropped to 2.8 out of 10 — a 60% reduction. But the number that stands out even more is her FAAM score: 96.4%, up from 72.6% at baseline. That's a 33-point functional improvement — moving from impaired to near-perfect foot function — while she's still mid-program in Phase 2.\n\nWhat makes Jamie B.'s story particularly compelling: she has a current 16-day logging streak and has been consistent throughout. Her results aren't a fluke of a good few days — they're built from showing up every day and letting the system do its work. She's still going. The trajectory is pointing further up.",
  },
  {
    id: 2,
    alias: "Maria G.",
    phase: "Phase 2",
    week: "Week 3",
    stats: [
      { label: "Pain Reduction", value: "86%", detail: "7.0 → 1.0 /10", sub: "Pain score" },
      { label: "FAAM Improvement", value: "+26%", detail: "77.4% → 97.6%", sub: "Measured using the validated Foot and Ankle Ability Measure (FAAM)." },
      { label: "Time in Program", value: "3", detail: "Weeks", sub: "" },
    ],
    headline: "86% pain reduction in 3 weeks. From 7/10 to virtually pain-free.",
    story: "Maria G. started the Foot Capacity System with a pain score of 7 out of 10 and a FAAM score of 77.4% — functional, but clearly limited. In just 3 weeks, her pain score has dropped to 1.0 out of 10. That's an 86% reduction — the single largest pain improvement of any user currently in the program.\n\nHer FAAM score has climbed in parallel: from 77.4% at baseline to 97.6% at the start of Phase 2. A 20-point functional improvement alongside near-complete pain resolution, in less than a month.\n\nMaria G. is now in Phase 2, Week 3 — which means these results came during the foundational stage of the program. She hasn't even reached the higher-intensity phases yet. Maria G. didn't just reduce her pain — she essentially eliminated it, while simultaneously regaining near-full foot function.",
  },
  {
    id: 3,
    alias: "Annie T.",
    phase: "Phase 2",
    week: "Week 2",
    stats: [
      { label: "Pain Reduction", value: "76%", detail: "5.0 → 1.2 /10", sub: "Pain score" },
      { label: "FAAM Improvement", value: "+12%", detail: "83.3% → 92.9%", sub: "Measured using the validated Foot and Ankle Ability Measure (FAAM)." },
      { label: "Longest Streak", value: "8", detail: "Consecutive", sub: "Days" },
    ],
    headline: "76% pain reduction and full Phase 2 function restored — in 2 weeks.",
    story: "Annie T. came in with pain at 5 out of 10 and a FAAM baseline of 83.3% — suggesting she was still reasonably functional but dealing with real, persistent pain that wasn't going away on its own. Within 2 weeks of starting the program, her pain is down to 1.2 out of 10 — a 76% reduction — and her FAAM has climbed to 92.9%.\n\nWhat makes Annie T.'s story a strong one for a different audience segment: her starting numbers weren't dramatic. She wasn't a 9/10 pain patient — she was someone with moderate chronic foot pain and good-but-not-great function. That's a profile a lot of people will recognise themselves in. The message it sends: you don't have to be in crisis for this to work.\n\nShe's 8 logged sessions deep, currently in Phase 2, and her consistency is holding.",
  },
];

export default function UserJourneyCarousel() {
    const [activeModal, setActiveModal] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number | null>(null);
    const posRef = useRef(0);
    const isPausedRef = useRef(false);
  const CARD_HEIGHT = 220;
  const GAP = 24;
  const STEP = CARD_HEIGHT + GAP;
  const SPEED = 0.5;

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const total = stories.length * STEP;
    const animate = () => {
      if (!isPausedRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= total) posRef.current = 0;
        if (trackRef.current) {
          trackRef.current.style.transform = `translateY(-${posRef.current}px)`;
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const openModal = (id: number) => {
    isPausedRef.current = true;
    setActiveModal(id);
  };

  const closeModal = () => {
    setActiveModal(null);
    isPausedRef.current = false;
  };

  const activeStory = stories.find((s) => s.id === activeModal) ?? null;
  const loopedStories = [...stories, ...stories, ...stories];

  return (
    <div className="relative w-full">
      {isMobile && (
        <p className="text-center text-slate-400 text-sm mb-4 md:hidden">
          Tap a card to read the patient's story.
        </p>
      )}

      <div className="overflow-hidden" style={{ height: `${STEP * 2.5}px` }}>
        <div ref={trackRef} className="flex flex-col" style={{ gap: `${GAP}px` }}>
          {loopedStories.map((story, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 cursor-pointer transition-shadow hover:shadow-md flex-shrink-0"
              style={{ height: `${CARD_HEIGHT}px` }}
              onMouseEnter={() => { if (!isMobile) isPausedRef.current = true; }}
              onMouseLeave={() => { if (!isMobile && activeModal === null) isPausedRef.current = false; }}
              onClick={() => openModal(story.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-bold text-slate-900 text-base">{story.alias}</p>
                  <p className="text-slate-400 text-xs">Foot Capacity System Member</p>
                </div>
                <span className="text-blue-600 text-xs font-semibold border border-blue-200 rounded-full px-3 py-1 bg-blue-50">
                  {story.phase} · {story.week}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {story.stats.map((stat, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center text-center">
                    <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wide mb-0.5">{stat.label}</p>
                    {stat.label === "FAAM Improvement" && (
                      <p className="text-slate-400 text-[9px] leading-snug mb-1">Capacity/Strength Improvement</p>
                    )}
                    <p className="text-blue-600 text-2xl font-bold leading-none mb-1">{stat.value}</p>
                    <p className="text-slate-600 text-[10px] leading-snug">{stat.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-slate-400 text-[10px] mt-3">Click to read the full story</p>
            </div>
          ))}
        </div>
      </div>

      {activeModal !== null && activeStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl leading-none"
            >
              ×
            </button>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-bold text-slate-900 text-lg">{activeStory.alias}</p>
                <p className="text-slate-400 text-xs">Foot Capacity System Member</p>
              </div>
              <span className="text-blue-600 text-xs font-semibold border border-blue-200 rounded-full px-3 py-1 bg-blue-50">
                {activeStory.phase} · {activeStory.week}
              </span>
            </div>
            <p className="text-blue-600 font-semibold text-sm mb-4">{activeStory.headline}</p>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {activeStory.stats.map((stat, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center text-center">
                  <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wide mb-1">{stat.label}</p>
                  <p className="text-blue-600 text-xl font-bold leading-none mb-1">{stat.value}</p>
                  <p className="text-slate-600 text-[10px] leading-snug">{stat.detail}</p>
                </div>
              ))}
            </div>
            <div className="text-slate-600 text-sm leading-relaxed space-y-3">
              {activeStory.story.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}