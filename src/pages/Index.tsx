import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, ShieldCheck } from "lucide-react";

export default function Index() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSubscribedModal, setShowSubscribedModal] = useState(
    searchParams.get("subscribed") === "true"
  );

  useEffect(() => {
    if (showSubscribedModal) {
      const timer = setTimeout(() => {
        setShowSubscribedModal(false);
        setSearchParams({});
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showSubscribedModal]);

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
        {/* SECTION 1 — HERO */}
        <section className="relative pt-10 pb-16 md:pt-20 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
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
            <style>{`.hero-img-desktop { filter: grayscale(20%) saturate(70%) brightness(1.02); opacity: 0.32; } @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(245,248,252,0.96) 0%, rgba(240,244,250,0.88) 55%, rgba(232,238,247,0.78) 100%)" }}
            />
          </div>

          <div className="relative container mx-auto px-6 max-w-5xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
              {/* Left column */}
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-4">The Foot Capacity System</p>

                  <h1 className="font-display text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1] mb-6">
                    Stop Guessing Through<br />
                    <span className="text-blue-600">Plantar Fasciitis Recovery.</span>
                  </h1>

                  <p className="text-slate-700 text-xl leading-relaxed mb-3">
                    A guided recovery system designed to help people move beyond recurring foot and heel pain — with more structure, more clarity, and less second-guessing.
                  </p>

                  <p className="text-slate-400 text-base italic leading-relaxed mb-3">
                    Especially when flare-ups and conflicting advice keep pulling you backward.
                  </p>
                  <div className="flex flex-col gap-1.5 mb-8">
                    <span className="flex items-center gap-2 text-slate-500 text-sm"><span className="text-blue-600 font-bold shrink-0">—</span>Sharp pain with your first steps in the morning</span>
                    <span className="flex items-center gap-2 text-slate-500 text-sm"><span className="text-blue-600 font-bold shrink-0">—</span>Heel pain that improves as you move but returns later</span>
                    <span className="flex items-center gap-2 text-slate-500 text-sm"><span className="text-blue-600 font-bold shrink-0">—</span>Flare-ups after walking more than usual</span>
                    <span className="flex items-center gap-2 text-slate-500 text-sm"><span className="text-blue-600 font-bold shrink-0">—</span>Symptoms that improve temporarily but always come back</span>
                  </div>

                  <a
                    href="/walkthrough"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-5 rounded-xl text-xl transition-colors"
                  >
                    See How The Full System Works →
                  </a>

                  <div className="flex flex-wrap gap-4 mt-6 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-blue-600" />30-Day Guarantee</span>
                    <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-blue-600" />Guided Recovery From Home</span>
                    <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-blue-600" />Track Progress Daily</span>
                    <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-blue-600" />Lifetime Access</span>
                  </div>
                </motion.div>
              </div>

              {/* Right column */}
              <div className="lg:w-1/2 mt-10 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  <img
                    src="/images/3-phones-hero.png"
                    alt="The Foot Capacity System app"
                    className="w-full max-w-md"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — VSL */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">Watch The Overview</p>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                Why Plantar Fasciitis Keeps Coming Back
              </h2>

              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                Discover the real reasons your heel pain returns — and the structured approach that helps you break the cycle for good.
              </p>

              <div style={{ position: "relative", paddingTop: "56.25%" }} className="rounded-2xl overflow-hidden shadow-xl mb-8">
                <iframe
                  src="https://customer-hene8ngxxo3eajlj.cloudflarestream.com/8e2a6e0621ae45bb67e928d218736905/iframe?preload=true&poster=https%3A%2F%2Fimagedelivery.net%2FZUbdF1A6bMNaR2l0OC84jw%2F7b4506b7-4b95-4594-423b-52eee844fd00%2Fpublic"
                  loading="lazy"
                  style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen={true}
                />
              </div>

              <div className="text-center">
                <a
                  href="/walkthrough"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
                >
                  See How The Full System Works →
                </a>
                <p className="text-slate-400 text-sm mt-3">No clinic visits required. No commitment.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3 — THE PROBLEM */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">Why Plantar Fasciitis Keeps Coming Back</p>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-8">
                Most people dealing with chronic foot pain are not failing recovery.<br />
                They're stuck in a cycle that no one helped them escape.
              </h2>

              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  You've probably tried stretching your plantar fascia every morning. Rolled a frozen water bottle under your heel. Bought new shoes, tried orthotics, rested for weeks, maybe even had a cortisone injection. You did a round of physical therapy, got some relief — and then the heel pain came back the moment life returned to normal.
                </p>
                <p>
                  That cycle isn't a sign that your foot is permanently broken. It's a sign that the approaches you've tried were focused on managing symptoms rather than building the underlying capacity your foot needs to actually handle the demands of daily life.
                </p>
                <p>
                  Most people are never shown how to rebuild that capacity. They're never given a clear, structured process to follow. So they improvise. They second-guess every decision. They push too hard on good days and panic on hard ones. They restart from zero after every flare-up.
                </p>
                <p className="text-slate-900 font-semibold text-xl">
                  The problem isn't effort. The problem is the absence of a clear structure to follow.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3 — TRANSFORMATION BRIDGE */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">Why People Find This System</p>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                Most People Don't End Up Here First.
              </h2>

              <p className="text-slate-500 text-lg leading-relaxed mb-10">
                They usually arrive after months, or years, of trying things that temporarily calm symptoms without ever creating lasting progress.
              </p>

              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  By the time most people find this system, they've already tried stretching routines, orthotics, rest, injections, physical therapy, massage tools, online videos, and multiple pairs of shoes.
                </p>
                <p>
                  Sometimes something helps briefly. Then the pain returns.
                </p>
                <p>
                  The frustrating part is not just the discomfort itself. It's the feeling of constantly restarting. Good weeks followed by setbacks. Progress followed by uncertainty. Relief followed by another flare-up.
                </p>
                <p>
                  Over time, many people quietly begin wondering: <span className="text-slate-900 font-semibold italic">"Why does this keep happening?"</span>
                </p>
                <p>
                  In many cases, the issue is not effort. It's that most recovery approaches never build enough structure, consistency, and progressive capacity over time.
                </p>
                <p className="text-slate-900 font-semibold text-xl">
                  That is what this system is designed to change.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-3">
                <span className="flex items-center gap-3 text-slate-600 text-base"><span className="text-blue-600 font-bold shrink-0">—</span>No more guessing what to do next</span>
                <span className="flex items-center gap-3 text-slate-600 text-base"><span className="text-blue-600 font-bold shrink-0">—</span>Progress you can actually track</span>
                <span className="flex items-center gap-3 text-slate-600 text-base"><span className="text-blue-600 font-bold shrink-0">—</span>Structure that helps consistency stick</span>
                <span className="flex items-center gap-3 text-slate-600 text-base"><span className="text-blue-600 font-bold shrink-0">—</span>Flare-ups that no longer feel like complete restarts</span>
              </div>

              <div className="mt-12 pl-6 border-l-4 border-blue-600">
                <p className="text-slate-800 text-xl md:text-2xl font-medium leading-relaxed italic">
                  "I had heel pain for over five years. I tried everything. Dr. Jonathan Schutza was the first to explain the real cause of my pain and create a plan that finally worked. He's not just fixing the pain — he's teaching me how to stay better."
                </p>
                <p className="text-blue-600 font-semibold text-sm mt-4">— Dee Bell</p>
              </div>

            </motion.div>
          </div>
        </section>

        {/* SECTION 4 — THE SYSTEM */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">How It Works</p>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-8">
                A structured recovery process designed to be followed from home — every day, not just on good days.
              </h2>

              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  The Foot Capacity System is a 12-week guided recovery program built by Dr. Jonathan Schutza, PT, DPT. It gives you a clear process to follow every day — structured sessions, daily tracking, and built-in guidance for when flare-ups happen.
                </p>
                <p>
                  The system works in phases. Each phase builds on the last, gradually increasing the demands on your foot as your capacity improves. You track your symptoms and progress over time, so you can start trusting your feet again — instead of guessing after every walk whether you pushed too far.
                </p>
                <p>
                  When setbacks happen — and they will — the system tells you exactly how to adjust. Temporarily reduce load. Keep moving. Build back gradually. A flare-up is not a restart. It's a signal to adjust, not stop.
                </p>
                <p>
                  Everything is done at home. No clinic visits. No special equipment. And for the first time, you'll know exactly what to do during a flare-up instead of panicking and starting over.
                </p>
              </div>

              <div className="mt-10">
                <a
                  href="/walkthrough"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
                >
                  See How The Full System Works →
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5 — TESTIMONIALS */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">What People Shared</p>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-16">
                Real people. Real progress.
              </h2>

              <div className="mb-16">
                <p className="text-slate-900 text-2xl md:text-3xl font-medium leading-relaxed mb-6">
                  "I've been struggling with plantar fasciitis for 3 years. Tried cortisone, shockwave, thousands of different shoes. For the first time it's been 2 weeks without pain. <span className="text-blue-600">It's unreal.</span>"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-0.5 bg-blue-600" />
                  <p className="text-slate-500 text-sm font-medium">Lorenzo Luongo</p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100 mb-16" />

              <div className="mb-16">
                <p className="text-slate-900 text-2xl md:text-3xl font-medium leading-relaxed mb-6">
                  "I had heel pain for over five years. I tried everything — orthotics, steroid injections, stretching, different doctors. Nothing worked long-term. <span className="text-blue-600">He's not just fixing the pain — he's teaching me how to stay better.</span>"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-0.5 bg-blue-600" />
                  <p className="text-slate-500 text-sm font-medium">Dee Bell</p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100 mb-16" />

              <div className="mb-16">
                <p className="text-slate-900 text-2xl md:text-3xl font-medium leading-relaxed mb-6">
                  "PT would often improve the immediate problem, but never addressed the deeper issues. Jonathan assessed my gait and began a regimen that got to the root of the problem — <span className="text-blue-600">basically teaching me how to walk again.</span>"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-0.5 bg-blue-600" />
                  <p className="text-slate-500 text-sm font-medium">Lory Tubbs</p>
                </div>
              </div>

              <p className="text-slate-400 text-xs">Results vary. These are real experiences from people who followed the system and stayed consistent.</p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 7 — DOCTOR */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-10">
                <div className="shrink-0 mt-8 md:mt-10">
                  <img
                    src="/images/dr-jonathan-schutza-headshot.png"
                    alt="Dr. Jonathan Schutza, PT, DPT"
                    className="w-32 h-32 rounded-full object-cover border-4 border-slate-100 shadow-sm"
                    loading="lazy"
                  />
                </div>

                <div className="max-w-[88%]">
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Built By A Physical Therapist</p>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-snug mb-5">
                    Built Around How Recovery Actually Works
                  </h2>
                  <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                    <p>
                      Dr. Jonathan Schutza, PT, DPT created The Foot Capacity System after seeing how many people struggled with the same cycle: temporary relief, conflicting advice, inconsistent routines, and repeated flare-ups.
                    </p>
                    <p className="text-slate-800 text-xl font-semibold mt-6 mb-6 leading-snug">
                      Most people were not lacking motivation.
                    </p>
                    <p>
                      They were lacking a process they could realistically follow consistently long enough to build meaningful progress.
                    </p>
                    <p>
                      That is why this system focuses less on passive treatment and more on progressive loading, structure, guidance, and helping people regain confidence in how they move over time.
                    </p>
                    <p>
                      The goal is not perfection. It is helping recovery finally feel clearer, calmer, and more manageable again.
                    </p>
                  </div>
                  <p className="text-slate-500 text-sm font-medium italic mt-6">
                    Designed for guided recovery from home, with more structure and less guesswork.
                  </p>
                  <div className="flex gap-3 mt-6">
                    <a href="https://www.instagram.com/dr.schutza.pt/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                      Instagram
                    </a>
                    <a href="https://www.facebook.com/share/18vGC5rzP8/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 8 — GUARANTEE */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">Risk-Free</p>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">
                30-Day Satisfaction Guarantee
              </h2>

              <p className="text-blue-600 font-semibold text-lg mb-6">Walk Pain-Free Or It's Free — 30-Day Guarantee</p>

              <div className="w-10 h-0.5 bg-blue-600 mb-8" />

              <div className="space-y-5 text-slate-600 text-lg leading-relaxed mb-8">
                <p>
                  Recovery can feel frustrating when you've already invested time, money, and energy into things that never fully solved the problem.
                </p>
                <p>
                  That is why we want people to explore this system without pressure. Follow the program, track your progress, and give yourself time to build consistency.
                </p>
                <p>
                  If you do not feel the system is helping you make meaningful progress within 30 days of purchase, email us at contact@fixyourmovement.com and we'll refund your investment. No complicated forms, no hoops to jump through.
                </p>
                <p className="text-slate-900 font-semibold">
                  Our goal is not perfection overnight. It is helping recovery finally feel more clear, manageable, and sustainable.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <span className="flex items-center gap-3 text-slate-600 text-base"><CheckCircle size={16} className="text-blue-600 shrink-0" />30 full days to explore the system</span>
                <span className="flex items-center gap-3 text-slate-600 text-base"><CheckCircle size={16} className="text-blue-600 shrink-0" />Track progress directly inside the app</span>
                <span className="flex items-center gap-3 text-slate-600 text-base"><CheckCircle size={16} className="text-blue-600 shrink-0" />Built for consistency from home</span>
                <span className="flex items-center gap-3 text-slate-600 text-base"><CheckCircle size={16} className="text-blue-600 shrink-0" />Full refund if the program is not right for you</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 9 — FAQ */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">Common Questions</p>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-4">
              Most people are not wondering whether recovery matters. They're wondering whether they can finally stay consistent long enough to make meaningful progress without constantly second-guessing themselves.
            </p>
            <p className="text-slate-400 text-base mb-12">
              Below are some of the most common questions people ask before starting.
            </p>

            <Accordion type="single" collapsible defaultValue="faq-1" className="space-y-3">
              <AccordionItem value="faq-1" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  What makes this different from regular physical therapy?
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Recovery Process</p>
                  <div className="space-y-3 text-slate-600 text-base leading-relaxed">
                    <p>Many people feel frustrated because recovery advice often changes from visit to visit, or focuses only on temporary symptom relief.</p>
                    <p>The Foot Capacity System is designed differently. Instead of relying on occasional appointments, the system gives you a structured process to follow consistently from home, with guided progressions, progress tracking, and clearer direction during setbacks.</p>
                    <p>The goal is not just temporary relief. The goal is helping you steadily build more confidence and capacity over time.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  What if I've already tried physical therapy, stretching, or orthotics?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  Most people exploring The Foot Capacity System have already tried several approaches before finding it. Usually the missing piece is not one magical exercise. It's finally having a more structured process that helps people stay consistent and stop second-guessing recovery constantly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  What if my pain has been going on for years?
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Chronic Pain</p>
                  <div className="space-y-3 text-slate-600 text-base leading-relaxed">
                    <p>Many people who use this system have already been dealing with foot or heel pain for a long time before starting. Chronic symptoms can make recovery feel discouraging, especially after trying multiple approaches without lasting progress.</p>
                    <p>That is why this system focuses heavily on consistency, gradual progression, and reducing the constant stop-and-start cycle that keeps many people stuck.</p>
                    <p>The goal is not overnight change. It is creating a clearer process that becomes more manageable to follow over time.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  What happens if symptoms flare up again?
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Flare-Ups</p>
                  <div className="space-y-3 text-slate-600 text-base leading-relaxed">
                    <p>Flare-ups are common during recovery, especially when pain has been ongoing for a long time. That does not automatically mean you are back at the beginning.</p>
                    <p>One of the biggest goals of this system is helping people respond to setbacks with more clarity instead of panic. Rather than completely stopping or guessing what to do next, the system helps you adjust gradually while continuing to move forward safely.</p>
                    <p>Over time, many people find that flare-ups feel less overwhelming and easier to navigate.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-5" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  Can this be followed from home?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  Yes. The Foot Capacity System was specifically designed to help people follow a more structured recovery process from home through guided sessions, tracking tools, and built-in recovery support.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-6" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  How much time does the system take each day?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  Most daily sessions take around 10 to 15 minutes. The system is designed to fit into normal life without becoming overwhelming.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-7" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  Do I need any special equipment?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  No gym and no special equipment required. Everything in the system can be done at home. A few sessions may use a resistance band or a small towel, but nothing that requires a significant investment or a specific setup.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-8" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  Is this only for plantar fasciitis?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  No. While many people initially discover the system because of plantar fasciitis or heel pain, The Foot Capacity System was designed more broadly around improving foot and ankle strength, movement tolerance, and long-term recovery consistency.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* SECTION 10 — FINAL CTA */}
        <section className="py-16 md:py-24 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                See How The Foot Capacity System Works
              </h2>

              <p className="text-slate-600 text-xl leading-relaxed mb-10">
                Understand how guided recovery, structured progression, and daily consistency work together — and whether this system is the right fit for where you are right now.
              </p>

              <a
                href="/walkthrough"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
              >
                See How The Full System Works →
              </a>

              <div className="flex flex-wrap gap-6 mt-8 text-sm text-slate-500">
                <span className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-600 shrink-0" />Guided from home</span>
                <span className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-600 shrink-0" />30-day guarantee</span>
                <span className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-600 shrink-0" />Track progress daily</span>
                <span className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-600 shrink-0" />Lifetime access</span>
              </div>
            </motion.div>
          </div>
        </section>
        {/* SECTION 11 — EMAIL OPT-IN */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">Free Newsletter</p>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                Not ready yet? That's okay.
              </h2>

              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                Join people working through chronic foot and heel pain who want clearer guidance, more consistency, and less second-guessing. Practical content from Dr. Jonathan Schutza, PT, DPT — delivered to your inbox. Free, no spam, unsubscribe any time.
              </p>

              <form
                method="post"
                acceptCharset="UTF-8"
                action="https://www.aweber.com/scripts/addlead.pl"
                className="flex flex-col sm:flex-row gap-3 mb-4"
              >
                <input type="hidden" name="meta_web_form_id" value="356574860" />
                <input type="hidden" name="meta_split_id" value="" />
                <input type="hidden" name="listname" value="awlist6958674" />
                <input type="hidden" name="redirect" value="https://fixyourmovement.com/email-confirmation" />
                <input type="hidden" name="meta_redirect_onlist" value="https://www.aweber.com/thankyou-coi.htm?m=text" />
                <input type="hidden" name="meta_adtracking" value="Homepage_Optin" />
                <input type="hidden" name="meta_message" value="1" />
                <input type="hidden" name="meta_required" value="name,email" />
                <input type="hidden" name="meta_tooltip" value="" />

                <input
                  id="awf_field-118710031"
                  type="text"
                  name="name"
                  placeholder="First name"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <input
                  id="awf_field-118710032"
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-base transition-colors whitespace-nowrap"
                >
                  Join The Newsletter
                </button>
              </form>

              <div className="flex items-center gap-2">
                <ShieldCheck size={13} className="text-blue-500 shrink-0" />
                <p className="text-slate-400 text-xs">Free. No spam. Unsubscribe any time.</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
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

      {/* STICKY MOBILE CTA */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-blue-600 text-white px-4 py-3 flex items-center justify-center shadow-lg transition-transform duration-300 ${showStickyCTA ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <a
          href="/walkthrough"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-base text-white text-center w-full"
        >
          See How The Full System Works →
        </a>
      </div>

      {/* SUBSCRIBED MODAL */}
      {showSubscribedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl px-10 py-10 max-w-sm w-full text-center"
            style={{ animation: "fadeUp 0.4s ease-out" }}
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2">You're confirmed</p>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">Subscription confirmed.</h2>
            <p className="text-slate-500 text-base leading-relaxed">Thank you for subscribing. Check your inbox — your first email is on its way.</p>
          </div>
        </div>
      )}

    </div>
  );
}
