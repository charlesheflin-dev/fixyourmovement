import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, ShieldCheck } from "lucide-react";

export default function NewIndex2() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

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
            <style>{`.hero-img-desktop { filter: grayscale(20%) saturate(70%) brightness(1.02); opacity: 0.32; }`}</style>
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
                    Stop Guessing Your Way Through<br />
                    <span className="text-blue-600">Foot Pain.</span>
                  </h1>

                  <p className="text-slate-700 text-xl leading-relaxed mb-3">
                    A guided recovery system designed to help people move beyond recurring foot and heel pain — with more structure, more clarity, and less second-guessing.
                  </p>

                  <p className="text-slate-400 text-base italic leading-relaxed mb-8">
                    Especially when flare-ups and conflicting advice keep pulling you backward.
                  </p>

                  <a
                    href="https://fixyourmovement.com/newwalkthrough2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
                  >
                    See The Full System And Pricing →
                  </a>

                  <div className="flex flex-wrap gap-4 mt-6 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-blue-600" />60-Day Guarantee</span>
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

        {/* SECTION 2 — THE PROBLEM */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">Why You're Still Stuck</p>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-8">
                Most people dealing with chronic foot pain are not failing recovery.<br />
                They're stuck in a cycle that no one helped them escape.
              </h2>

              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  You've probably tried stretching every morning. Rolled a frozen water bottle under your heel. Bought new shoes, tried orthotics, rested for weeks. Maybe you did a round of physical therapy, got some relief, and then — the pain came back the moment life returned to normal.
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

        {/* SECTION 3 — THE INSIGHT */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">The Missing Piece</p>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-8">
                Temporary relief and long-term recovery are not the same thing.
              </h2>

              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Stretching reduces tension temporarily. Rest reduces load temporarily. Orthotics redistribute pressure temporarily. None of these approaches are wrong — but none of them ask the foot to actually get stronger.
                </p>
                <p>
                  What the foot needs — what it has never gotten in most standard treatment approaches — is progressive loading. Gradually increasing the demands placed on the tissue over time, in a structured way, so that the foot builds the capacity to handle real life without breaking down.
                </p>
                <p>
                  That's not complicated. But it requires consistency. And consistency requires structure — a clear process, daily guidance, and a way to know whether you're moving in the right direction.
                </p>
              </div>

              {/* Pull quote */}
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
                  The system works in phases. Each phase builds on the last, gradually increasing the demands on your foot as your capacity improves. You track your symptoms and progress over time, so you can actually see whether things are getting better — instead of guessing.
                </p>
                <p>
                  When setbacks happen — and they will — the system tells you exactly how to adjust. Temporarily reduce load. Keep moving. Build back gradually. A flare-up is not a restart. It's a signal to adjust, not stop.
                </p>
                <p>
                  Everything is done at home. No clinic visits. No special equipment. No need to figure it out on your own.
                </p>
              </div>

              <div className="mt-10">
                <a
                  href="https://fixyourmovement.com/newwalkthrough2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
                >
                  See The Full System And Pricing →
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

        {/* SECTION 6 — VSL */}
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
                  href="https://fixyourmovement.com/newwalkthrough2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
                >
                  See The Full System And Pricing →
                </a>
                <p className="text-slate-400 text-sm mt-3">No clinic visits required. No commitment.</p>
              </div>
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
                <div className="shrink-0">
                  <img
                    src="/images/dr-jonathan-schutza-headshot.png"
                    alt="Dr. Jonathan Schutza, PT, DPT"
                    className="w-32 h-32 rounded-full object-cover border-4 border-slate-100 shadow-sm"
                    loading="lazy"
                  />
                </div>

                <div>
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-4">Built By A Physical Therapist</p>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                    Dr. Jonathan Schutza, PT, DPT
                  </h2>
                  <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                    <p>
                      Dr. Schutza is a licensed physical therapist who built this system around one core belief: lasting recovery requires structure, not just symptom management.
                    </p>
                    <p>
                      His approach focuses on progressive movement and guided consistency — helping people rebuild strength and confidence from home, at their own pace. The Foot Capacity System is the result of that philosophy applied to the most common and most mismanaged condition in foot and ankle rehabilitation.
                    </p>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <a href="https://www.instagram.com/dr.schutza.pt/" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium hover:underline">Instagram</a>
                    <a href="https://www.facebook.com/share/18vGC5rzP8/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium hover:underline">Facebook</a>
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

              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                "Walk Pain-Free Or It's Free."
              </h2>

              <p className="text-slate-600 text-xl leading-relaxed mb-4">
                Try the system for 60 days. Follow the program, track your progress, and if you do not experience meaningful improvement, we'll refund your investment. No questions asked.
              </p>

              <p className="text-slate-400 text-base italic mb-10">
                Our goal is meaningful progress, not pressure. Your investment is protected. Your recovery is the priority.
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-2"><CheckCircle size={15} className="text-blue-600 shrink-0" />60 full days to build consistency</span>
                <span className="flex items-center gap-2"><CheckCircle size={15} className="text-blue-600 shrink-0" />Track improvement week by week</span>
                <span className="flex items-center gap-2"><CheckCircle size={15} className="text-blue-600 shrink-0" />Try the system risk-free</span>
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

            <p className="text-slate-500 text-lg mb-4">
              A few common questions people ask before exploring The Foot Capacity System further.
            </p>

            <p className="text-slate-400 text-base italic mb-12">
              Most people are not wondering if they should recover. They're wondering if they can finally stay consistent long enough to make progress.
            </p>

            <Accordion type="single" collapsible defaultValue="faq-1" className="space-y-3">
              <AccordionItem value="faq-1" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  What makes this different from regular physical therapy?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  Traditional physical therapy often focuses on hands-on treatment and short-term symptom management. The Foot Capacity System is built around progressive loading and structured daily guidance — giving you a clear process to follow from home, every day, not just during clinic visits. The difference is consistency and structure over time.
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
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  Duration of pain does not determine outcome. Most people who go through this system have been dealing with foot pain for months or years before finding it. Consistency with the right process matters far more than how long the pain has been present.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  What happens if symptoms flare up again?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  Flare-ups are a normal part of recovery for many people. The system was designed to help people navigate setbacks with more structure and less panic instead of feeling like all their progress has disappeared.
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
                href="https://fixyourmovement.com/newwalkthrough2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-5 rounded-xl text-xl transition-colors"
              >
                See The Full System And Pricing →
              </a>

              <div className="flex flex-wrap gap-6 mt-8 text-sm text-slate-500">
                <span className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-600 shrink-0" />Guided from home</span>
                <span className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-600 shrink-0" />60-day guarantee</span>
                <span className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-600 shrink-0" />Track progress daily</span>
                <span className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-600 shrink-0" />Lifetime access</span>
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
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-blue-600 text-white px-4 py-3 flex items-center justify-center shadow-lg transition-transform duration-300 ${
          showStickyCTA ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a
          href="https://fixyourmovement.com/newwalkthrough2"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-base text-white text-center w-full"
        >
          See Full System & Pricing →
        </a>
      </div>
    </div>
  );
}
