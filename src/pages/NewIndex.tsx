import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  CheckCircle,
  Shield,
  Play,
  BarChart2,
  ShieldCheck,
  ClipboardList,
  TrendingUp,
  SignpostBig,
  CalendarDays,
  Award,
  AlertCircle,
  Map,
  Target,
  HelpCircle,
  Smartphone,
} from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, label: "60-Day Guarantee" },
  { icon: CheckCircle, label: "Guided Recovery From Home" },
  { icon: CheckCircle, label: "Track Progress Daily" },
  { icon: CheckCircle, label: "Lifetime Access" },
];

export default function NewIndex() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // Sticky mobile CTA visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / document.body.scrollHeight;
      setShowStickyCTA(scrollProgress > 0.15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main>

        {/* ── 1. Hero ─────────────────────────────────────────────────── */}
        <section className="relative pt-8 pb-8 md:pt-16 md:pb-12 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="/photo_2026-03-25_13-59-21.jpg"
              alt=""
              className="hero-img-desktop hidden md:block w-full h-full object-cover"
              loading="eager"
            />
            <img
              src="/new-top2.png"
              alt=""
              className="block md:hidden w-full h-full object-cover"
              loading="eager"
            />
            <style>{`.hero-img-desktop { filter: grayscale(20%) saturate(70%) brightness(1.02); opacity: 0.32; }`}</style>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(245,248,252,0.96) 0%, rgba(240,244,250,0.88) 55%, rgba(232,238,247,0.78) 100%)",
              }}
            />
          </div>

          <div className="relative container mx-auto px-6 max-w-5xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">

              {/* Left column — headline, sub, CTA, trust row */}
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <h1 className="font-display text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
                    Stop Guessing Your Way Through Foot Pain
                  </h1>

                  <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-2">
                    Rebuild foot and ankle strength from home with a guided recovery system designed to reduce confusion, improve consistency, and help you move forward with more confidence.
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 italic">
                    Especially when flare-ups and conflicting advice keep pulling you backward.
                  </p>

                  {/* Primary CTA — above fold on mobile */}
                  <a
                    href="https://fixyourmovement.com/walkthrough"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button animate-pulse-glow text-base md:text-lg"
                  >
                    See How The Full System Works
                  </a>

                  <div className="flex items-center gap-3 mt-4 mb-2 justify-center lg:justify-start">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-blue-700 text-xs font-bold">A</div>
                      <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-white flex items-center justify-center text-blue-800 text-xs font-bold">B</div>
                      <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">C</div>
                    </div>
                    <p className="text-slate-500 text-xs">Trusted by people dealing with chronic foot and heel pain.</p>
                  </div>

                  {/* Trust row */}
                  <div className="text-sm text-slate-500 flex flex-wrap gap-4 justify-center lg:justify-start mt-4">
                    {trustItems.map(({ icon: Icon, label }) => (
                      <span key={label} className="flex items-center gap-1.5">
                        <Icon size={14} className="text-blue-600 shrink-0" />
                        {label}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right column — app visual */}
              <div className="lg:w-1/2 mt-8 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  <img
                    src="/images/3-phones-hero.png"
                    alt="The Foot Capacity System app"
                    className="w-full max-w-md rounded-2xl"
                  />
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ── NEW: Transformation Bridge ───────────────────────────────── */}
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-6">

            {/* Section header */}
            <div className="text-center mb-12">
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Why People Find This System</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Most People Arrive Here After Years Of Trying.
              </h2>
              <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">
                Not because they gave up — but because nothing they tried actually addressed the root of the problem.
              </p>
            </div>

            {/* Three panels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

              {/* Panel 1 — The Before */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
                <div className="w-8 h-0.5 bg-blue-600 mb-4" />
                <h3 className="font-display text-lg font-bold text-slate-900 mb-4">Where Most People Start</h3>
                <div className="space-y-3">
                  <p className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-blue-600 font-bold shrink-0 mt-0.5">—</span>
                    Recurring heel pain that keeps coming back no matter what they try
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-blue-600 font-bold shrink-0 mt-0.5">—</span>
                    Already tried stretching, orthotics, cortisone, rest, and physical therapy
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-blue-600 font-bold shrink-0 mt-0.5">—</span>
                    Temporary relief followed by another flare-up
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-blue-600 font-bold shrink-0 mt-0.5">—</span>
                    Quietly starting to wonder if this is just permanent
                  </p>
                </div>
              </div>

              {/* Panel 2 — The Missing Piece */}
              <div className="bg-blue-600 rounded-2xl p-8 text-white">
                <div className="w-8 h-0.5 bg-white/40 mb-4" />
                <h3 className="font-display text-lg font-bold text-white mb-4">Why Nothing Has Worked</h3>
                <div className="space-y-3">
                  <p className="text-blue-100 text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-white font-bold shrink-0 mt-0.5">—</span>
                    Most approaches treat the symptom, not the underlying tissue capacity
                  </p>
                  <p className="text-blue-100 text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-white font-bold shrink-0 mt-0.5">—</span>
                    Without progressive loading, the foot never builds the strength it needs
                  </p>
                  <p className="text-blue-100 text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-white font-bold shrink-0 mt-0.5">—</span>
                    Without structure, consistency becomes almost impossible to maintain
                  </p>
                  <p className="text-blue-100 text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-white font-bold shrink-0 mt-0.5">—</span>
                    The cycle continues until the approach changes
                  </p>
                </div>
              </div>

              {/* Panel 3 — The After */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
                <div className="w-8 h-0.5 bg-blue-600 mb-4" />
                <h3 className="font-display text-lg font-bold text-slate-900 mb-4">What Changes With Structure</h3>
                <div className="space-y-3">
                  <p className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-blue-600 font-bold shrink-0 mt-0.5">—</span>
                    A clear process to follow every day — not just on good days
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-blue-600 font-bold shrink-0 mt-0.5">—</span>
                    Progress you can actually track and see over time
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-blue-600 font-bold shrink-0 mt-0.5">—</span>
                    Flare-ups that no longer feel like complete restarts
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-blue-600 font-bold shrink-0 mt-0.5">—</span>
                    Recovery that finally starts moving in one direction
                  </p>
                </div>
              </div>

            </div>

            {/* Testimonial anchor */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-3xl mx-auto">
              <div className="text-blue-600 text-4xl font-bold leading-none mb-4">"</div>
              <p className="text-slate-800 text-lg md:text-xl font-medium leading-relaxed mb-6">
                I had heel pain for over five years. I tried everything — orthotics, steroid injections, stretching, different doctors. Nothing worked long-term. Dr. Jonathan Schutza was the first to explain the real cause of my pain and create a plan that finally worked. He's not just fixing the pain — he's teaching me how to stay better.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-blue-600" />
                <p className="text-blue-600 font-semibold text-sm">Dee Bell</p>
              </div>
            </div>

          </div>
        </section>

        {/* ── 2. Designed To Feel Clear, Organized, And Easy To Follow ── */}
        <section className="py-8 md:py-12 bg-slate-50">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Top: two columns */}
              <div className="flex flex-col lg:flex-row">

                {/* Left: heading + two feature rows */}
                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="w-8 h-0.5 bg-blue-600 mb-6" />
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                    Designed To Feel{" "}
                    <span className="text-blue-600">Clear, Organized, And Easy To Follow</span>
                  </h2>
                  <div className="w-full h-px bg-slate-200 mb-6" />
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 rounded-full p-3 shrink-0">
                        <HelpCircle size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm mb-1">Uncertainty makes recovery harder.</p>
                        <p className="text-slate-500 text-xs leading-relaxed">Not knowing what to do next — or whether you're doing too much — makes the process feel inconsistent and exhausting.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 rounded-full p-3 shrink-0">
                        <Smartphone size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm mb-1">Structure changes that.</p>
                        <p className="text-slate-500 text-xs leading-relaxed">Guided sessions, progress tracking, and clearer direction during setbacks make recovery feel far more manageable.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: 4 feature cards */}
                <div className="lg:w-1/2 p-8 md:p-12 bg-slate-50 flex flex-col justify-center gap-4">
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-start gap-4">
                    <div className="bg-blue-50 rounded-xl p-3 shrink-0">
                      <ClipboardList size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm mb-1">Guided Sessions</p>
                      <p className="text-slate-500 text-xs leading-relaxed">Follow structured recovery progressions step by step.</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-start gap-4">
                    <div className="bg-blue-50 rounded-xl p-3 shrink-0">
                      <TrendingUp size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm mb-1">Progress Tracking</p>
                      <p className="text-slate-500 text-xs leading-relaxed">Monitor symptoms, activity, and trends over time.</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-start gap-4">
                    <div className="bg-blue-50 rounded-xl p-3 shrink-0">
                      <Shield size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm mb-1">Flare-Up Support</p>
                      <p className="text-slate-500 text-xs leading-relaxed">Adjust without panic when setbacks happen.</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-start gap-4">
                    <div className="bg-blue-50 rounded-xl p-3 shrink-0">
                      <SignpostBig size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm mb-1">Clearer Direction</p>
                      <p className="text-slate-500 text-xs leading-relaxed">Spend less time second-guessing what to do next.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom callout */}
              <div className="border-t border-slate-200 bg-slate-50 px-8 py-6 flex items-start gap-4">
                <div className="bg-blue-50 rounded-full p-2 shrink-0 mt-0.5">
                  <CheckCircle size={20} className="text-blue-600" />
                </div>
                <p className="text-slate-800 text-base font-semibold leading-relaxed">
                  For many people, having a clearer structure becomes the difference between constantly restarting and finally moving forward again.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 3. Lifestyle Restoration ─────────────────────────────────── */}
        <section className="bg-white py-8 md:py-10">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

                {/* Top: text left, photos right */}
                <div className="flex flex-col lg:flex-row">

                  {/* Left: text */}
                  <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                    <div className="w-8 h-0.5 bg-blue-600 mb-4" />
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                      For Many People, Recovery Means{" "}
                      <span className="text-blue-600">Getting Parts Of Their Life Back.</span>
                    </h2>
                    <p className="text-slate-500 text-base leading-relaxed mb-4">
                      Recurring foot and ankle pain affects more than just movement— it affects{" "}
                      <span className="text-blue-600 font-medium">life.</span>
                    </p>
                    <div className="w-full h-px bg-slate-200 mb-4" />
                    <p className="text-slate-700 text-base leading-relaxed font-medium">
                      The goal isn't just temporary relief. It's helping you move through life with more{" "}
                      <span className="text-blue-600">confidence</span>,{" "}
                      <span className="text-blue-600">consistency</span>, and{" "}
                      <span className="text-blue-600">less fear</span> of setbacks.
                    </p>
                  </div>

                  {/* Right: 3 person photo cards */}
                  <div className="lg:w-3/5 p-6 lg:p-8">
                    <div className="grid grid-cols-3 gap-3 h-full">
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src="/images/person1.png"
                          alt="Move with confidence"
                          className="w-full h-32 md:h-40 rounded-2xl object-cover"
                        />
                        <p className="font-semibold text-slate-900 text-sm text-center">Move With Confidence</p>
                        <p className="text-slate-500 text-xs text-center leading-relaxed">
                          Walk, exercise, and enjoy daily activities with less hesitation.
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src="/images/person2.png"
                          alt="Live more freely"
                          className="w-full h-32 md:h-40 rounded-2xl object-cover"
                        />
                        <p className="font-semibold text-slate-900 text-sm text-center">Live More Freely</p>
                        <p className="text-slate-500 text-xs text-center leading-relaxed">
                          Travel, explore, and stay active without holding back.
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src="/images/person3.png"
                          alt="Get back to what matters"
                          className="w-full h-32 md:h-40 rounded-2xl object-cover"
                        />
                        <p className="font-semibold text-slate-900 text-sm text-center">Get Back To What Matters</p>
                        <p className="text-slate-500 text-xs text-center leading-relaxed">
                          Spend more time doing the things you love with the people you love.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom: 3 checkmark callouts */}
                <div className="border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-slate-50">
                  <div className="flex items-center gap-3 py-1.5 px-3">
                    <div className="bg-blue-50 rounded-full p-2 shrink-0">
                      <CheckCircle size={16} className="text-blue-600" />
                    </div>
                    <p className="font-semibold text-slate-900 text-sm">Less fear of setbacks.</p>
                  </div>
                  <div className="flex items-center gap-3 py-1.5 px-3">
                    <div className="bg-blue-50 rounded-full p-2 shrink-0">
                      <CheckCircle size={16} className="text-blue-600" />
                    </div>
                    <p className="font-semibold text-slate-900 text-sm">More consistency in daily life.</p>
                  </div>
                  <div className="flex items-center gap-3 py-1.5 px-3">
                    <div className="bg-blue-50 rounded-full p-2 shrink-0">
                      <CheckCircle size={16} className="text-blue-600" />
                    </div>
                    <p className="font-semibold text-slate-900 text-sm">More confidence in your body.</p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 4. Video VSL ─────────────────────────────────────────────── */}
        <section className="bg-white py-8 md:py-10">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">Why Plantar Fasciitis Keeps Coming Back</h2>

            <p className="text-slate-500 text-base text-center mb-6 max-w-xl mx-auto leading-relaxed">
              Discover the real reasons your heel pain returns — and the structured approach that helps you break the cycle for good.
            </p>

            <div
              style={{ position: "relative", paddingTop: "56.25%" }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <iframe
                src="https://customer-hene8ngxxo3eajlj.cloudflarestream.com/8e2a6e0621ae45bb67e928d218736905/iframe?preload=true&poster=https%3A%2F%2Fimagedelivery.net%2FZUbdF1A6bMNaR2l0OC84jw%2F7b4506b7-4b95-4594-423b-52eee844fd00%2Fpublic"
                loading="lazy"
                style={{
                  border: "none",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen={true}
              />
            </div>

            <p className="text-center text-slate-500 text-sm mt-4">
              No clinic visits required. No commitment.
            </p>

            <div className="flex justify-center mt-6">
              <a
                href="https://fixyourmovement.com/walkthrough"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button animate-pulse-glow text-base md:text-lg"
              >
                See How The Full System Works
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-blue-600 shrink-0" />
                100% from home
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-blue-600 shrink-0" />
                12-week guided system
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-blue-600 shrink-0" />
                60-day guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-blue-600 shrink-0" />
                Lifetime access
              </span>
            </div>
          </div>
        </section>

        {/* ── 5. Unified Testimonial Section ───────────────────────────── */}
        <section className="bg-slate-50 py-10 md:py-14">
          <div className="container mx-auto px-6">

            {/* Section header */}
            <div className="text-center mb-10">
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Patient Experiences</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-3">What Patients Shared After Following The System</h2>
              <p className="text-slate-500 text-base max-w-xl mx-auto">Real people. Real progress. Here's what people experienced after following The Foot Capacity System approach.</p>
            </div>

            {/* Editorial transition block */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Recovery finally stopped feeling overwhelming.
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-8 flex-wrap">
                <span className="text-slate-500 text-base italic">Walking no longer felt impossible.</span>
                <span className="hidden sm:inline text-slate-300">·</span>
                <span className="text-slate-500 text-base italic">Flare-ups stopped causing panic.</span>
                <span className="hidden sm:inline text-slate-300">·</span>
                <span className="text-slate-500 text-base italic">Recovery finally felt manageable.</span>
              </div>
            </div>

            {/* Featured testimonial — large */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
                <div className="text-blue-600 text-4xl font-bold leading-none mb-4">"</div>
                <p className="text-slate-800 text-lg md:text-xl font-medium leading-relaxed mb-2">
                  I've been struggling with plantar fasciitis for 3 years, tried cortisone, shockwave, thousands of different shoes. Until December when I saw one of your fascia strengthening exercises. For the first time it's been 2 weeks without pain.
                </p>
                <p className="text-blue-600 font-bold text-base mt-2 mb-6">It's unreal.</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-0.5 bg-blue-600" />
                  <p className="text-blue-600 font-semibold text-sm">Lorenzo Luongo</p>
                </div>
              </div>
            </div>

            {/* Secondary testimonial cards — 2 col grid desktop, stacked mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-8">

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="text-blue-600 text-3xl font-bold leading-none mb-3">"</div>
                <p className="text-slate-700 text-sm leading-relaxed mb-1">Over the years I've had numerous injuries requiring physical therapy. PT would often improve the immediate problem, but never addressed the deeper issues. Jonathan assessed my gait and began a regimen that got to the root of the problem — basically <span className="font-semibold text-slate-900">teaching me how to walk again.</span></p>
                <p className="text-blue-600 text-xs font-medium mt-1 mb-4 cursor-pointer hover:underline">Read Full Experience →</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-6 h-0.5 bg-blue-600" />
                  <p className="text-blue-600 font-semibold text-xs">Lory Tubbs</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="text-blue-600 text-3xl font-bold leading-none mb-3">"</div>
                <p className="text-slate-700 text-sm leading-relaxed mb-1">I tore a tendon in my plantar fascia in January and developed a DVT in the same leg in March. In May, I started with Dr. Jonathan Schutza and had <span className="font-semibold text-slate-900">remarkable progress.</span> Through his guided strengthening program, I was able to walk with better mobility and less pain.</p>
                <p className="text-blue-600 text-xs font-medium mt-1 mb-4 cursor-pointer hover:underline">Read Full Experience →</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-6 h-0.5 bg-blue-600" />
                  <p className="text-blue-600 font-semibold text-xs">Wendy Peterman</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="text-blue-600 text-3xl font-bold leading-none mb-3">"</div>
                <p className="text-slate-700 text-sm leading-relaxed mb-1">Dr. Jonathan Schutza is a truly exceptional Physical Therapist whose innovative approach has made a significant impact on my recovery. What sets him apart is <span className="font-semibold text-slate-900">recording himself demonstrating the correct form for every exercise</span> — ensuring clarity when I continue rehabilitation at home.</p>
                <p className="text-blue-600 text-xs font-medium mt-1 mb-4 cursor-pointer hover:underline">Read Full Experience →</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-6 h-0.5 bg-blue-600" />
                  <p className="text-blue-600 font-semibold text-xs">Debbie Wisenor</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="text-blue-600 text-3xl font-bold leading-none mb-3">"</div>
                <p className="text-slate-700 text-sm leading-relaxed mb-1">You have helped me and my chronically painful foot by giving me <span className="font-semibold text-slate-900">the language and background knowledge to talk to my doctor and my PT.</span> It has had an impact on my recovery for sure. Also — good reminders for me to keep practicing!</p>
                <p className="text-blue-600 text-xs font-medium mt-1 mb-4 cursor-pointer hover:underline">Read Full Experience →</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-6 h-0.5 bg-blue-600" />
                  <p className="text-blue-600 font-semibold text-xs">@vicbre415</p>
                </div>
              </div>

            </div>

            {/* Additional testimonials — 3 col grid desktop, stacked mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                <div className="text-blue-600 text-2xl font-bold leading-none mb-2">"</div>
                <p className="text-slate-700 text-xs leading-relaxed mb-3">I have had this pain since the beginning of cross country season and it has been bad enough that I couldn't run for a few meets. I talked to my athletic trainer but never got away from it — <span className="font-semibold text-slate-800">and this just gave me relief.</span></p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-blue-600" />
                  <p className="text-blue-600 font-semibold text-xs">Zaiden Peterson</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                <div className="text-blue-600 text-2xl font-bold leading-none mb-2">"</div>
                <p className="text-slate-700 text-xs leading-relaxed mb-3">I've suffered a lisfranc injury requiring surgery and I'm in rehab regaining all the strength I've lost. <span className="font-semibold text-slate-800">Very clear and exercises are achievable.</span> I'm from Australia — thanks for your work.</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-blue-600" />
                  <p className="text-blue-600 font-semibold text-xs">@youngcarol</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                <div className="text-blue-600 text-2xl font-bold leading-none mb-2">"</div>
                <p className="text-slate-700 text-xs leading-relaxed mb-3">You are the most positive, supportive physical therapist I have come across on social media. <span className="font-semibold text-slate-800">The fact that you focus on foot and ankle rehab is a bonus.</span> You have added greatly to my Post Tibial Tendonitis recovery.</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-blue-600" />
                  <p className="text-blue-600 font-semibold text-xs">@bogiegrl</p>
                </div>
              </div>

            </div>

            {/* Disclaimer */}
            <p className="text-xs text-slate-400 text-center mt-6">Results vary. These are real experiences from people who followed the system and stayed consistent.</p>

            {/* Closing quote */}
            <div className="max-w-3xl mx-auto text-center mt-8">
              <p className="text-[26px] font-medium leading-[1.45] text-gray-900">
                Most people are not lacking effort. They're lacking a system they can actually stay consistent with long enough to move forward.
              </p>
            </div>

          </div>
        </section>

        {/* ── 6. Doctor Credibility ────────────────────────────────────── */}
        <section className="py-8 md:py-10">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row">

                {/* Left: headshot + social buttons */}
                <div className="lg:w-2/5 p-8 md:p-12 flex flex-col items-center justify-center gap-6 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50">
                  <img
                    src="/images/dr-jonathan-schutza-headshot.png"
                    alt="Dr. Jonathan Schutza, PT, DPT"
                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                    loading="lazy"
                  />
                  <a
                    href="https://www.instagram.com/dr.schutza.pt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-[160px] hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="/images/follow-on-instagram.png"
                      alt="Follow on Instagram"
                      className="w-full rounded-xl"
                      loading="lazy"
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/share/18vGC5rzP8/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-[160px] hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="/images/follow-on-facebook.png"
                      alt="Follow on Facebook"
                      className="w-full rounded-xl"
                      loading="lazy"
                    />
                  </a>
                </div>

                {/* Right: text */}
                <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                    A Structured Approach Created By A Physical Therapist
                  </h2>
                   <div className="w-10 h-0.5 bg-blue-600 mb-6" />
                   <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                     <p><span className="text-blue-600 font-semibold">Dr. Jonathan Schutza, PT, DPT</span> is a licensed physical therapist who built this system around one core belief: lasting recovery requires structure, not just symptom management.</p>
                     <p>His approach focuses on progressive movement and guided consistency — helping people rebuild strength and confidence from home, at their own pace.</p>
                     <div className="space-y-3 mt-2">
                       <div className="flex items-center gap-3">
                         <div className="bg-blue-50 rounded-full p-2 shrink-0">
                           <CheckCircle size={16} className="text-blue-600" />
                         </div>
                         <p className="text-slate-700 text-sm">Evidence-based. Practical. Progressive.</p>
                       </div>
                       <div className="flex items-center gap-3">
                         <div className="bg-blue-50 rounded-full p-2 shrink-0">
                           <CheckCircle size={16} className="text-blue-600" />
                         </div>
                         <p className="text-slate-700 text-sm">Clarity and confidence in every step.</p>
                       </div>
                       <div className="flex items-center gap-3">
                         <div className="bg-blue-50 rounded-full p-2 shrink-0">
                           <CheckCircle size={16} className="text-blue-600" />
                         </div>
                         <p className="text-slate-700 text-sm">Designed for real life. Built for home recovery.</p>
                       </div>
                     </div>
                   </div>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 7. Guarantee ─────────────────────────────────────────────── */}
        <section className="py-8 md:py-10">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 md:p-10 max-w-2xl mx-auto text-center">

                  {/* Eyebrow */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Shield size={18} className="text-blue-600" />
                    <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest">Our 60-Day Guarantee</p>
                  </div>

                  {/* Primary headline */}
                  <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">
                    "Walk Pain-Free Or It's Free"
                  </h2>

                  <p className="text-slate-600 text-base mb-4">Our goal is meaningful progress, not pressure.</p>

                  <div className="w-10 h-0.5 bg-blue-600 mx-auto mb-6" />

                  {/* Body copy */}
                  <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-lg mx-auto">
                    Try the system for 60 days. Follow the program, track your progress, and if you do not experience meaningful improvement, we'll refund your investment. No questions asked.
                  </p>

                  {/* 3 inline trust bullets */}
                  <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-sm text-slate-700">
                    <span className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-blue-600 shrink-0" />
                      60 full days to build consistency
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-blue-600 shrink-0" />
                      Track improvement week by week
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-blue-600 shrink-0" />
                      Try the system risk-free
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs text-center mt-6">
                    Your investment is protected. Your recovery is the priority.
                  </p>

                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 8. FAQ ───────────────────────────────────────────────────── */}
        <section className="bg-slate-50 py-8 md:py-10">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display text-2xl md:text-4xl text-slate-900 mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-slate-500 text-center mb-4">
              A few common questions people ask before exploring The Foot Capacity System further.
            </p>
            <p className="text-sm text-slate-400 text-center italic mb-10 max-w-xl mx-auto">
              Most people are not wondering if they should recover. They're wondering if they can finally stay consistent long enough to make progress.
            </p>
            <Accordion type="single" collapsible defaultValue="faq-1" className="space-y-4">
              <AccordionItem
                value="faq-1"
                className="bg-white rounded-2xl border border-slate-200 px-6 md:px-8"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-5">
                  What makes this different from regular physical therapy?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-5">
                  Traditional physical therapy often focuses on hands-on treatment and short-term symptom management. The Foot Capacity System is built around progressive loading and structured daily guidance — giving you a clear process to follow from home, every day, not just during clinic visits. The difference is consistency and structure over time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="faq-2"
                className="bg-white rounded-2xl border border-slate-200 px-6 md:px-8"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-5">
                  What if I've already tried physical therapy, stretching, or orthotics?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-5">
                  Most people exploring The Foot Capacity System have already tried several approaches before finding it. Usually the missing piece is not one magical exercise. It's finally having a more structured process that helps people stay consistent and stop second-guessing recovery constantly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="faq-3"
                className="bg-white rounded-2xl border border-slate-200 px-6 md:px-8"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-5">
                  What if my pain has been going on for years?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-5">
                  Duration of pain does not determine outcome. Most people who go through this system have been dealing with foot pain for months or years before finding it. Consistency with the right process matters far more than how long the pain has been present.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="faq-4"
                className="bg-white rounded-2xl border border-slate-200 px-6 md:px-8"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-5">
                  What happens if symptoms flare up again?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-5">
                  Flare-ups are a normal part of recovery for many people. The system was designed to help people navigate setbacks with more structure and less panic instead of feeling like all their progress has disappeared.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="faq-5"
                className="bg-white rounded-2xl border border-slate-200 px-6 md:px-8"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-5">
                  Can this be followed from home?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-5">
                  Yes. The Foot Capacity System was specifically designed to help people follow a more structured recovery process from home through guided sessions, tracking tools, and built-in recovery support.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="faq-6"
                className="bg-white rounded-2xl border border-slate-200 px-6 md:px-8"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-5">
                  How much time does the system take each day?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-5">
                  Most daily sessions take around 10 to 15 minutes. The system is designed to fit into normal life without becoming overwhelming.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="faq-7"
                className="bg-white rounded-2xl border border-slate-200 px-6 md:px-8"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-5">
                  Do I need any special equipment?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-5">
                  No gym and no special equipment required. Everything in the system can be done at home. A few sessions may use a resistance band or a small towel, but nothing that requires a significant investment or a specific setup.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="faq-8"
                className="bg-white rounded-2xl border border-slate-200 px-6 md:px-8"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-5">
                  Is this only for plantar fasciitis?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-5">
                  No. While many people initially discover the system because of plantar fasciitis or heel pain, The Foot Capacity System was designed more broadly around improving foot and ankle strength, movement tolerance, and long-term recovery consistency.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* ── 9. Transition CTA ────────────────────────────────────────── */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              See How The Foot Capacity System Works
            </h2>
            <div className="w-10 h-0.5 bg-blue-600 mx-auto mb-6" />
            <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Understand how guided recovery, structured progression, and daily consistency work together inside The Foot Capacity System.
            </p>
            <a
              href="https://fixyourmovement.com/walkthrough"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button animate-pulse-glow"
            >
              Watch The Full Guided Walkthrough
            </a>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-blue-600 shrink-0" />
                Guided from home
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-blue-600 shrink-0" />
                60-day guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-blue-600 shrink-0" />
                Track progress daily
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-blue-600 shrink-0" />
                Lifetime access
              </span>
            </div>
          </div>
        </section>

      </main>
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs text-center md:text-left">
            © {new Date().getFullYear()} The Foot Capacity System. All rights reserved.
          </p>
    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 justify-center md:justify-end">
          <a href="/privacy-policy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          <a href="/refund-policy" className="hover:text-slate-600 transition-colors">Refund Policy</a>
          <a href="/eula" className="hover:text-slate-600 transition-colors">EULA</a>
          <a href="/contact" className="hover:text-slate-600 transition-colors">Contact</a>
          <a href="https://members.fixyourmovement.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Patient App</a>
        </div>
        </div>
      </footer>

      {/* ── Sticky Mobile CTA ────────────────────────────────────────── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-blue-600 text-white px-4 py-3 flex items-center justify-center shadow-lg transition-transform duration-300 ${
          showStickyCTA ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a
          href="https://fixyourmovement.com/walkthrough"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-base text-white text-center w-full"
        >
          See Full Walkthrough →
        </a>
      </div>
    </div>
  );
}
