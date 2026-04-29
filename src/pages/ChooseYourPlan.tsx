// ChooseYourPlan — v3 focus carousel
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Layers,
  Play,
  CheckCircle,
  Shield,
  Users,
  ArrowRight,
  Smartphone,
  BarChart2,
  SlidersHorizontal,
  Bell,
  RefreshCw,
  Cpu,
  Target,
  Calendar,
  User,
  MessageSquare,
  Star,
  Lock,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Shared sub-components ──────────────────────────────────────────────────

const FeatureRow = ({
  icon: Icon,
  title,
  subtitle,
  last = false,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  last?: boolean;
}) => (
  <>
    <div className="flex items-start gap-3 py-3.5">
      <span className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-teal-700" />
      </span>
      <div>
        <p className="font-semibold text-gray-800 font-body text-sm leading-snug">{title}</p>
        <p className="text-xs text-gray-500 font-body mt-0.5 leading-relaxed">{subtitle}</p>
      </div>
    </div>
    {!last && <hr className="border-gray-100" />}
  </>
);

const GuaranteeRow = ({ subtitle }: { subtitle?: string }) => (
  <div className="border border-gray-200 rounded-xl mx-6 mb-6">
    <div className="grid grid-cols-2">
      <div className="flex items-start gap-2.5 p-4">
        <Shield className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-teal-700 text-sm font-body leading-snug">
            Walk Pain-Free or It's Free — 90-Day Guarantee
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 font-body italic mt-1 leading-relaxed">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 border-l border-gray-200 px-4">
        <span className="text-teal-700 text-xl font-bold leading-none">∞</span>
        <p className="font-bold text-gray-800 text-sm font-body">LIFETIME ACCESS</p>
      </div>
    </div>
  </div>
);

const BestNotForRow = ({
  bestFor,
  notFor,
}: {
  bestFor: string[];
  notFor: string[];
}) => (
  <div className="grid grid-cols-2 gap-4 mx-6 mb-6">
    <div className="bg-teal-50 rounded-xl p-4">
      <div className="flex items-center gap-1.5 mb-2.5">
        <Users className="w-4 h-4 text-teal-700 flex-shrink-0" />
        <p className="font-bold text-teal-700 text-xs uppercase tracking-wider font-body">Best For</p>
      </div>
      <div className="text-xs text-gray-700 font-body space-y-1.5 leading-relaxed">
        {bestFor.map((item, i) => (
          <p key={i}>✅ {item}</p>
        ))}
      </div>
    </div>
    <div className="bg-red-50 rounded-xl p-4">
      <div className="flex items-center gap-1.5 mb-2.5">
        <X className="w-4 h-4 text-red-500 flex-shrink-0" />
        <p className="font-bold text-red-500 text-xs uppercase tracking-wider font-body">Not For</p>
      </div>
      <div className="text-xs text-gray-700 font-body space-y-1.5 leading-relaxed">
        {notFor.map((item, i) => (
          <p key={i}>❌ {item}</p>
        ))}
      </div>
    </div>
  </div>
);

const CTAButton = ({
  href,
  LeftIcon,
  label,
}: {
  href: string;
  LeftIcon: LucideIcon;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-teal-800 hover:bg-teal-900 text-white font-bold py-5 px-6 w-full flex items-center justify-between text-base md:text-lg transition-colors font-body rounded-b-2xl"
  >
    <LeftIcon className="w-5 h-5 flex-shrink-0" />
    <span className="flex-1 text-center px-3">{label}</span>
    <ArrowRight className="w-5 h-5 flex-shrink-0" />
  </a>
);

// ─── Card content components ─────────────────────────────────────────────────

const Tier1Content = () => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
    <div className="flex justify-center py-4 bg-gray-50 border-b border-gray-100">
      <span className="bg-teal-800 text-white text-xs font-bold font-body tracking-widest uppercase px-5 py-1.5 rounded-full">
        TIER 1
      </span>
    </div>
    <div className="px-6 pt-5 pb-6 border-b border-gray-100">
      <h2 className="font-display text-3xl font-bold text-gray-900 mb-1">The Blueprint</h2>
      <p className="text-teal-700 font-body text-base mb-4">
        The complete Foot Capacity System. Self-guided. Structured. Ready to follow.
      </p>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="font-display text-4xl font-bold text-gray-900">$247</span>
        <span className="text-gray-400 font-body text-sm">USD / one-time</span>
      </div>
      <span className="inline-flex items-center gap-1.5 border border-teal-700 text-teal-700 text-xs font-bold font-body px-4 py-1.5 rounded-full">
        <span className="text-base leading-none">∞</span>
        LIFETIME ACCESS
      </span>
    </div>
    <div className="px-6 pt-2 pb-2">
      <FeatureRow icon={BookOpen} title="Full 12-week progression" subtitle="A complete plan from start to finish." />
      <FeatureRow icon={Layers} title="Step-by-step, pre-mapped system" subtitle="Every week, every phase — already planned." />
      <FeatureRow icon={Play} title="Every exercise demonstrated" subtitle="Clear video guidance for every movement." />
      <FeatureRow icon={CheckCircle} title="No interpretation required" subtitle="Just follow the plan and execute." last />
    </div>
    <p className="text-center text-teal-600 italic font-body text-sm px-6 py-4">
      Web portal access only — no app guidance
    </p>
    <GuaranteeRow />
    <BestNotForRow
      bestFor={[
        "Self-starters who execute when the path is clear",
        "People who do not need feedback to move forward",
      ]}
      notFor={[
        "Those who want guidance or confirmation",
        "Complex or stalled cases needing support",
      ]}
    />
    <CTAButton href="https://whop.com/checkout/plan_Kb2UZ3Iqj7Vn9" LeftIcon={BookOpen} label="Follow the Blueprint →" />
  </div>
);

const Tier2Content = () => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
    <div className="flex flex-col items-center gap-2 py-4 bg-gray-50 border-b border-gray-100">
      <span
        className="inline-flex items-center gap-1.5 text-white text-xs font-bold font-body tracking-widest uppercase px-5 py-1.5 rounded-full"
        style={{ backgroundColor: "#c9930a" }}
      >
        <Star className="w-3.5 h-3.5 fill-white stroke-none" />
        MOST POPULAR
      </span>
      <span className="bg-teal-800 text-white text-xs font-bold font-body tracking-widest uppercase px-5 py-1.5 rounded-full">
        TIER 2
      </span>
    </div>
    <div className="px-6 pt-5 pb-6 border-b border-gray-100">
      <h2 className="font-display text-3xl font-bold text-gray-900 mb-1">The System in Your Pocket</h2>
      <p className="text-teal-700 font-body text-base mb-3">Dr. Jonathan guides you day by day.</p>
      <p className="font-semibold text-gray-800 font-body text-sm leading-relaxed mb-4">
        The Foot Capacity app adapts to you in real time — tracking your pain, adjusting your
        progression, and keeping you accountable.
      </p>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold text-gray-900">$397</span>
        <span className="text-gray-400 font-body text-sm">USD / one-time</span>
      </div>
    </div>
    <div className="flex justify-center py-4 px-6">
      <span className="bg-teal-50 text-teal-700 text-xs font-bold font-body tracking-wide px-5 py-2 rounded-full border border-teal-200">
        Everything in Tier 1, plus:
      </span>
    </div>
    <div className="grid md:grid-cols-2 gap-6 px-6 pb-6">
      <img src="/images/app-mockup-t2.png" alt="Foot Capacity App" className="w-full rounded-xl shadow-md object-contain" />
      <div className="pt-1">
        <FeatureRow icon={Smartphone} title="Full app access" subtitle="The system lives on your phone." />
        <FeatureRow icon={BarChart2} title="Daily pain + progress tracking" subtitle="Log your pain. Track your trend. See what's improving." />
        <FeatureRow icon={SlidersHorizontal} title="Adaptive progression" subtitle="The app adjusts your plan based on your inputs and results." />
        <FeatureRow icon={Bell} title="In-app accountability" subtitle="Reminders, streaks, and milestones keep you consistent." />
        <FeatureRow icon={RefreshCw} title="Smart check-ins" subtitle="The system responds to your data and keeps you on track." last />
      </div>
    </div>
    <div className="mx-6 mb-4 border-t border-gray-100 pt-5">
      <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-5 font-body">How It Works</p>
      <div className="flex items-start justify-center gap-2 flex-wrap pb-4">
        <div className="flex flex-col items-center gap-1.5 max-w-[90px]">
          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-teal-700" />
          </div>
          <p className="text-xs text-gray-600 font-body text-center leading-tight">You log your pain each day</p>
        </div>
        <ArrowRight className="w-5 h-5 text-teal-400 flex-shrink-0 mt-2.5" />
        <div className="flex flex-col items-center gap-1.5 max-w-[90px]">
          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-teal-700" />
          </div>
          <p className="text-xs text-gray-600 font-body text-center leading-tight">The app analyzes your trend</p>
        </div>
        <ArrowRight className="w-5 h-5 text-teal-400 flex-shrink-0 mt-2.5" />
        <div className="flex flex-col items-center gap-1.5 max-w-[90px]">
          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
            <Target className="w-5 h-5 text-teal-700" />
          </div>
          <p className="text-xs text-gray-600 font-body text-center leading-tight">It adjusts what you do next</p>
        </div>
      </div>
    </div>
    <div className="mx-6 mb-5 rounded-xl overflow-hidden grid grid-cols-3 bg-teal-800 text-white">
      <div className="p-4 text-center border-r border-teal-700">
        <p className="text-xs font-bold font-body mb-1">🟢 IMPROVING?</p>
        <p className="text-xs font-body text-teal-200">You progress.</p>
      </div>
      <div className="p-4 text-center border-r border-teal-700">
        <p className="text-xs font-bold font-body mb-1">🟡 STALLED?</p>
        <p className="text-xs font-body text-teal-200">You hold.</p>
      </div>
      <div className="p-4 text-center">
        <p className="text-xs font-bold font-body mb-1">🔴 PAIN UP?</p>
        <p className="text-xs font-body text-teal-200">You modify immediately.</p>
      </div>
    </div>
    <div className="flex items-center justify-center gap-2 pb-6 px-6">
      <CheckCircle className="w-4 h-4 text-teal-700 flex-shrink-0" />
      <p className="text-sm font-body text-gray-600">No guessing. No second-guessing. Just forward progress.</p>
    </div>
    <CTAButton href="https://whop.com/checkout/plan_f7hnKFT1vq0zb" LeftIcon={Smartphone} label="Get the Guided System – Mobile App INCLUDED →" />
  </div>
);

const Tier3Content = () => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
    <div className="flex flex-col items-center gap-2 py-4 bg-gray-50 border-b border-gray-100">
      <span
        className="inline-flex items-center gap-1.5 text-white text-xs font-bold font-body tracking-widest uppercase px-5 py-1.5 rounded-full"
        style={{ backgroundColor: "#c9930a" }}
      >
        <Lock className="w-3.5 h-3.5" />
        LIMITED ACCESS
      </span>
      <span className="bg-teal-800 text-white text-xs font-bold font-body tracking-widest uppercase px-5 py-1.5 rounded-full">
        ONLY 10 SPOTS AVAILABLE
      </span>
      <span className="bg-teal-800 text-white text-xs font-bold font-body tracking-widest uppercase px-5 py-1.5 rounded-full">
        TIER 3
      </span>
    </div>
    <div className="px-6 pt-5 pb-6 border-b border-gray-100">
      <h2 className="font-display text-3xl font-bold text-gray-900 mb-1">Private Recovery Access</h2>
      <p className="text-teal-700 font-body text-base mb-4">The Doctor in Your Pocket</p>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="font-display text-4xl font-bold text-gray-900">$697</span>
        <span className="text-gray-400 font-body text-sm">USD / one-time</span>
      </div>
      <span className="inline-flex items-center gap-1.5 border border-teal-700 text-teal-700 text-xs font-bold font-body px-4 py-1.5 rounded-full">
        <span className="text-base leading-none">∞</span>
        LIFETIME ACCESS
      </span>
    </div>
    <div className="grid md:grid-cols-2 gap-6 px-6 py-6">
      <img src="/images/app-mockup-t3.png" alt="Private Recovery App" className="w-full rounded-xl shadow-md object-contain" />
      <div className="pt-1">
        <p className="font-bold text-gray-900 text-sm font-body uppercase tracking-wider mb-1">
          Direct Access to Dr. Jonathan
        </p>
        <p className="text-teal-700 font-body text-sm mb-4 leading-relaxed">
          Everything in Tier 2 — now personally guided.
        </p>
        <FeatureRow icon={Calendar} title="Priority 1:1 Sessions When Needed" subtitle="Two private 30-minute sessions per month for 6 months (12 total), plus 2 bonus months (14 total) for extra support when you need it." />
        <FeatureRow icon={User} title="Your Progress Personally Reviewed" subtitle="Dr. Jonathan monitors your data throughout the program and adjusts your plan as needed." />
        <FeatureRow icon={MessageSquare} title="Dr. Jonathan Reaches Out First" subtitle="Your data is flagged for review. He reaches out when patterns need attention — before problems become setbacks." />
        <FeatureRow icon={Bell} title="Pain Spikes Flagged Early" subtitle="Active monitoring identifies issues early so they don't derail your recovery." />
        <FeatureRow icon={SlidersHorizontal} title="Case-Specific Adjustments" subtitle="Modifications and progressions based on your diagnosis, history, response to load, and goals." last />
      </div>
    </div>
    <GuaranteeRow subtitle="Try the system risk-free for 90 days. Your success is our promise." />
    <BestNotForRow
      bestFor={[
        "Those who want maximum confidence and direct access when it matters",
        "People who want expert oversight throughout their recovery",
      ]}
      notFor={[
        "Those comfortable working independently without direct expert support",
        "People looking for a one-time check-in or quick fixes",
      ]}
    />
    <CTAButton href="https://whop.com/checkout/plan_g6WVNs6annwO6" LeftIcon={Shield} label="Get Direct Access to Dr. Jonathan – Mobile App INCLUDED →" />
  </div>
);

// ─── Carousel variants ────────────────────────────────────────────────────────

const variants = {
  focus: { x: "0%",   scale: 1,    opacity: 1,   zIndex: 20 },
  left:  { x: "-65%", scale: 0.85, opacity: 0.5, zIndex: 10 },
  right: { x: "65%",  scale: 0.85, opacity: 0.5, zIndex: 10 },
} as const;

// Cards ordered so index 0 = Tier 2 (focus on load),
// advancing RIGHT goes Tier 2 → Tier 3 → Tier 1 → Tier 2
const CARD_COMPONENTS = [Tier2Content, Tier3Content, Tier1Content];

// ─── Page ─────────────────────────────────────────────────────────────────────

const ChooseYourPlan = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number>(0);

  const getPosition = (i: number): "focus" | "left" | "right" => {
    if (i === activeIndex) return "focus";
    if (i === (activeIndex - 1 + 3) % 3) return "left";
    return "right";
  };

  const advanceRight = () => setActiveIndex((prev) => (prev + 1) % 3);
  const advanceLeft  = () => setActiveIndex((prev) => (prev - 1 + 3) % 3);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50)  advanceRight();
    if (diff < -50) advanceLeft();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-5xl mx-auto px-4 py-12">

          {/* Page heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h1 className="font-display text-3xl md:text-5xl text-primary mb-4 leading-tight">
              Choose Your Path to Stronger, Pain-Free Movement
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed">
              Every tier rebuilds foot capacity. The difference is how guided, personalized, and accelerated your
              recovery becomes.
            </p>
          </motion.div>

          {/* ── Carousel ── */}
          <div
            className="relative overflow-hidden w-full max-w-5xl mx-auto"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left arrow */}
            <button
              onClick={advanceLeft}
              aria-label="Previous tier"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-teal-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Card grid — all cards share the same grid cell */}
            <div style={{ display: "grid" }}>
              {CARD_COMPONENTS.map((CardContent, i) => {
                const pos = getPosition(i);
                return (
                  <motion.div
                    key={i}
                    variants={variants}
                    animate={pos}
                    initial={false}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                      gridArea: "1 / 1",
                      width: "100%",
                      maxWidth: "42rem",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    className={pos !== "focus" ? "cursor-pointer" : ""}
                    onClick={pos !== "focus" ? () => setActiveIndex(i) : undefined}
                  >
                    <CardContent />
                  </motion.div>
                );
              })}
            </div>

            {/* Right arrow */}
            <button
              onClick={advanceRight}
              aria-label="Next tier"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-teal-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-6">
            {CARD_COMPONENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to tier ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === activeIndex ? "bg-teal-700" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChooseYourPlan;
