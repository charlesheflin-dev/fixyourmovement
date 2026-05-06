import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen, Smartphone, ShieldCheck, ArrowRight, LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const tiers = [
  {
    image: "/images/TIER1B.png",
    alt: "Tier 1 — The Blueprint: complete 12-week self-guided foot capacity program",
    href: "https://whop.com/checkout/plan_Kb2UZ3Iqj7Vn9",
    buttonIcon: BookOpen as LucideIcon,
    buttonPrimary: "Follow the Blueprint",
    buttonSecondary: null as string | null,
  },
  {
    image: "/images/TIER2B.png",
    alt: "Tier 2 — The Guided Recovery System: app-guided daily progression with adaptive tracking",
    href: "https://whop.com/checkout/plan_f7hnKFT1vq0zb",
    buttonIcon: Smartphone as LucideIcon,
    buttonPrimary: "Get the Guided System",
    buttonSecondary: "Mobile App INCLUDED" as string | null,
  },
  {
    image: "/images/TIER3NEW.jpg",
    alt: "Tier 3 — Private Recovery Access: direct 1-on-1 oversight with Dr. Jonathan",
    href: "https://whop.com/checkout/plan_g6WVNs6annwO6",
    buttonIcon: ShieldCheck as LucideIcon,
    buttonPrimary: "Get Direct Access to Dr. Jonathan",
    buttonSecondary: "Mobile App INCLUDED" as string | null,
  },
];

type Tier = typeof tiers[0];

const TierButton = ({ tier }: { tier: Tier }) => {
  const Icon = tier.buttonIcon;
  return (
    <a
      href={tier.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between w-full mt-3 px-5 py-4 rounded-xl bg-blue hover:bg-blue-dark transition-colors text-white font-bold text-lg cursor-pointer no-underline"
    >
      <div className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 text-center px-3">
        <div>{tier.buttonPrimary}</div>
        {tier.buttonSecondary && (
          <div className="text-sm font-normal opacity-90">{tier.buttonSecondary}</div>
        )}
      </div>
      <ArrowRight className="w-6 h-6 text-white flex-shrink-0" />
    </a>
  );
};

const trustBadges = [
  { emoji: "🛡", label: "60-Day Guarantee", sub: "Walk Pain-Free or it's Free" },
  { emoji: "✅", label: "Evidence-Based Progression", sub: "Built on science. Designed for real results." },
  { emoji: "👟", label: "Built for Real-World Movement", sub: "Stronger feet. Lasting change." },
];

// Carousel order: index 0 = Tier 2 (focus on load)
// leftIndex  = (activeIndex - 1 + 3) % 3 → Tier 1 peek left
// rightIndex = (activeIndex + 1)     % 3 → Tier 3 peek right
const carouselCards = [tiers[1], tiers[2], tiers[0]]; // [T2, T3, T1]

const variants = {
  focus: { x: "0%",   scale: 1,    opacity: 1,    zIndex: 20 },
  left:  { x: "-62%", scale: 0.75, opacity: 0.45, zIndex: 10 },
  right: { x: "62%",  scale: 0.75, opacity: 0.45, zIndex: 10 },
} as const;

const ChooseYourPlan2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // Start with a tall default so the carousel isn't collapsed before images load
  const [containerHeight, setContainerHeight] = useState(800);
  const focusCardRef = useRef<HTMLDivElement>(null);

  const getPosition = (i: number): "focus" | "left" | "right" => {
    if (i === activeIndex) return "focus";
    if (i === (activeIndex - 1 + 3) % 3) return "left";
    return "right";
  };

  const advanceLeft  = () => setActiveIndex((p) => (p - 1 + 3) % 3);
  const advanceRight = () => setActiveIndex((p) => (p + 1) % 3);

  // Measure focus card height on mount and whenever active card changes.
  // ResizeObserver also catches image-load reflow so the container is always correct.
  useEffect(() => {
    const card = focusCardRef.current;
    if (!card) return;

    // Immediate read
    setContainerHeight(card.offsetHeight);

    // Watch for image-load reflow
    const obs = new ResizeObserver(() => {
      if (focusCardRef.current) {
        setContainerHeight(focusCardRef.current.offsetHeight);
      }
    });
    obs.observe(card);
    return () => obs.disconnect();
  }, [activeIndex]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-28 pb-16 md:pt-36 md:pb-24">

        {/* ── Page heading ── */}
        <div className="max-w-4xl mx-auto px-4 text-center pt-12 mb-12">
          <h1 className="font-display text-3xl md:text-5xl text-primary mb-4 leading-tight">
            Choose Your Path to Stronger, Pain-Free Movement
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed">
            Every tier rebuilds foot capacity. The difference is how guided, personalized, and accelerated your
            recovery becomes.
          </p>
        </div>

        {/* ── Mobile layout — single column, hidden on md+ ── */}
        <div className="max-w-4xl mx-auto px-4 md:hidden">
          <div className="grid grid-cols-1 gap-12">
            {tiers.map((tier, i) => (
              <div key={i}>
                <a href={tier.href} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                  <img
                    src={tier.image}
                    alt={tier.alt}
                    width="100%"
                    height="auto"
                    loading="lazy"
                    style={{ display: "block" }}
                  />
                </a>
                <TierButton tier={tier} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop carousel — hidden on mobile ── */}
        <div className="hidden md:block">
          {/*
            Outer wrapper: relative (containing block for arrows), no overflow-hidden.
            Inner viewport: relative + overflow-hidden (containing block for cards + clips peeks).
          */}
          <div className="relative w-full max-w-6xl mx-auto">

            {/* Left arrow */}
            <button
              onClick={advanceLeft}
              aria-label="Previous tier"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-blue-light transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 text-slate-500" />
            </button>

            {/* Viewport: clips peek cards, is the containing block for absolute cards */}
            <div
              className="relative overflow-hidden"
              style={{ height: `${containerHeight}px` }}
            >
              {carouselCards.map((card, i) => {
                const pos = getPosition(i);
                return (
                  <motion.div
                    key={i}
                    variants={variants}
                    animate={pos}
                    initial={false}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-x-0 mx-auto"
                    style={{
                      width: "100%",
                      maxWidth: "36rem",
                      cursor: pos !== "focus" ? "pointer" : undefined,
                    }}
                    onClick={pos !== "focus" ? () => setActiveIndex(i) : undefined}
                  >
                    <div ref={pos === "focus" ? focusCardRef : null}>
                      <a href={card.href} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                        <img
                          src={card.image}
                          alt={card.alt}
                          width="100%"
                          height="auto"
                          loading="lazy"
                          style={{ display: "block" }}
                        />
                      </a>
                      <TierButton tier={card} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right arrow */}
            <button
              onClick={advanceRight}
              aria-label="Next tier"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-blue-light transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 text-slate-500" />
            </button>
          </div>

          {/* Indicator dots */}
          <div className="hidden md:flex justify-center gap-3 mt-6">
            {carouselCards.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to tier ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === activeIndex ? "bg-blue" : "bg-slate-200 cursor-pointer"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Trust badges (both breakpoints) ── */}
        <div className="max-w-4xl mx-auto px-4 mt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustBadges.map((badge, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-center md:text-left justify-center md:justify-start"
              >
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{badge.emoji}</span>
                <div>
                  <p className="font-display font-bold text-primary text-base">{badge.label}</p>
                  <p className="text-muted-foreground font-body text-sm mt-0.5">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default ChooseYourPlan2;
