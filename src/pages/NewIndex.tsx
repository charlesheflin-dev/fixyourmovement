import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
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
import testimonial1 from "@/assets/testimonials/1B.jpg";
import testimonial2 from "@/assets/testimonials/2B.jpg";
import testimonial3 from "@/assets/testimonials/3B.jpg";
import testimonial4 from "@/assets/testimonials/4B.jpg";
import testimonial5 from "@/assets/testimonials/5B.jpg";
import testimonial6 from "@/assets/testimonials/6B.jpg";
import testimonial7 from "@/assets/testimonials/7B.jpg";
import testimonial8 from "@/assets/testimonials/8B.jpg";
import testimonial9 from "@/assets/testimonials/9B.jpg";

const testimonialImages = [
  testimonial1,
  testimonial2,
  testimonial3,
  testimonial4,
  testimonial5,
  testimonial6,
  testimonial7,
  testimonial8,
  testimonial9,
];

const trustItems = [
  { icon: ShieldCheck, label: "90-Day Guarantee" },
  { icon: CheckCircle, label: "Guided Recovery From Home" },
  { icon: CheckCircle, label: "Track Progress Daily" },
  { icon: CheckCircle, label: "Lifetime Access" },
];

const microQuotes = [
  "Walking no longer felt impossible.",
  "The structure finally made recovery make sense.",
  "I stopped panicking during flare-ups.",
  "Recovery finally felt manageable.",
];

export default function NewIndex() {
  const [api, setApi] = useState<CarouselApi>();
  const [isHovered, setIsHovered] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // Auto-scroll testimonial carousel
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      if (!isHovered) {
        api.scrollNext();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [api, isHovered]);

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
      <Header />
      <main>

        {/* ── Section 1: Hero ─────────────────────────────────────────── */}
        <section className="relative pt-16 pb-8 md:pt-24 md:pb-12 overflow-hidden">
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

                  <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
                    A guided recovery system designed to help people rebuild foot and ankle strength from home with more structure, more clarity, and less second-guessing.
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

              {/* Right column — headshot + two app screenshots */}
              <div className="lg:w-1/2 mt-8 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  <img
                    src="/images/dr-jonathan-schutza-headshot.png"
                    alt="Dr. Jonathan Schutza"
                    className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-lg mx-auto mb-4"
                  />
                  <div className="flex gap-4 w-full">
                    <img
                      src="/images/new-phone.jpg"
                      alt="App screenshot"
                      className="w-1/2 rounded-2xl shadow-md"
                    />
                    <img
                      src="/images/new-phone2.jpg"
                      alt="App screenshot 2"
                      className="w-1/2 rounded-2xl shadow-md"
                    />
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Section 2: Video VSL ─────────────────────────────────────── */}
        <section className="bg-white py-8 md:py-10">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">A Structured Approach To Foot & Ankle Recovery</h2>

            <div
              style={{ position: "relative", paddingTop: "56.25%" }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <iframe
                src="https://customer-hene8ngxxo3eajlj.cloudflarestream.com/8e2a6e0621ae45bb67e928d218736905/iframe?preload=true&poster=https%3A%2F%2Fimagedelivery.net%2FZUbdF1A6bMNaR2l0OC84jw%2F465ad095-c137-48c8-47e0-fb9792922200%2Fpublic"
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
              No clinic visits required. Designed to be followed from home at your own pace.
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
          </div>
        </section>

        {/* ── Section 3: Designed To Feel Clear, Organized, And Easy To Follow ── */}
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
                  <p className="text-slate-600 text-base leading-relaxed mb-6">
                    Recovery becomes much less stressful when people stop trying to figure everything out on their own.
                  </p>
                  <div className="w-full h-px bg-slate-200 mb-6" />
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-50 rounded-full p-3 shrink-0">
                        <HelpCircle size={18} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm mb-1">Uncertainty makes recovery harder.</p>
                        <p className="text-slate-500 text-xs leading-relaxed">
                          Not knowing if you're doing too much, too little, or the right thing can make the process feel frustrating and inconsistent.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-green-50 rounded-full p-3 shrink-0">
                        <Smartphone size={18} className="text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm mb-1">We built a better way.</p>
                        <p className="text-slate-500 text-xs leading-relaxed">
                          The Foot Capacity System simplifies recovery with guided sessions, progress tracking, structured phases, and clearer direction during setbacks.
                        </p>
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
                    <div className="bg-green-50 rounded-xl p-3 shrink-0">
                      <TrendingUp size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm mb-1">Progress Tracking</p>
                      <p className="text-slate-500 text-xs leading-relaxed">Monitor symptoms, activity, and trends over time.</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-start gap-4">
                    <div className="bg-purple-50 rounded-xl p-3 shrink-0">
                      <Shield size={20} className="text-purple-600" />
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

        {/* ── Section 4: Lifestyle Restoration ────────────────────────── */}
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
                  <div className="flex items-center gap-3 p-3">
                    <div className="bg-blue-50 rounded-full p-2 shrink-0">
                      <CheckCircle size={16} className="text-blue-600" />
                    </div>
                    <p className="font-semibold text-slate-900 text-sm">Less fear of setbacks.</p>
                  </div>
                  <div className="flex items-center gap-3 p-3">
                    <div className="bg-green-50 rounded-full p-2 shrink-0">
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                    <p className="font-semibold text-slate-900 text-sm">More consistency in daily life.</p>
                  </div>
                  <div className="flex items-center gap-3 p-3">
                    <div className="bg-purple-50 rounded-full p-2 shrink-0">
                      <CheckCircle size={16} className="text-purple-600" />
                    </div>
                    <p className="font-semibold text-slate-900 text-sm">More confidence in your body.</p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-slate-50 py-10 md:py-14">
          <div className="container mx-auto px-6">

            {/* Section header */}
            <div className="text-center mb-10">
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Patient Experiences</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-3">What Patients Shared After Following The System</h2>
              <p className="text-slate-500 text-base max-w-xl mx-auto">Here is what people shared after following The Foot Capacity System approach.</p>
            </div>

            {/* Micro quote cards — desktop 2x2 grid, mobile carousel */}
            {/* Desktop */}
            <div className="hidden md:grid grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
              {microQuotes.map((quote, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 border-l-4 border-l-blue-600 p-6">
                  <p className="text-xl font-medium text-slate-900 leading-snug">{quote}</p>
                </div>
              ))}
            </div>

            {/* Mobile carousel */}
            <div className="md:hidden mb-8">
              <Carousel opts={{ loop: true, align: "start" }} className="w-full">
                <CarouselContent>
                  {microQuotes.map((quote, i) => (
                    <CarouselItem key={i} className="basis-full">
                      <div className="bg-white rounded-2xl border border-slate-200 border-l-4 border-l-blue-600 p-6">
                        <p className="text-xl font-medium text-slate-900 leading-snug">{quote}</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            {/* patient-experiences.png */}
            <div className="max-w-3xl mx-auto mb-8">
              <img src="/images/patient-experiences.png" alt="Patient experiences with The Foot Capacity System" className="w-full rounded-2xl" />
            </div>

            {/* Testimonial carousel */}
            <div
              className="max-w-6xl mx-auto"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => setIsHovered(false)}
            >
              <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {testimonialImages.map((image, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <div className="section-card overflow-hidden">
                          <img src={image} alt={`Testimonial ${index + 1}`} className="w-full h-auto object-cover" />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-slate-400 text-center mt-6">
              Individual results vary. These reflect real experiences and may not be typical for everyone.
            </p>

            {/* Closing quote */}
            <div className="max-w-3xl mx-auto text-center mt-8">
              <p className="text-[26px] font-medium leading-[1.45] text-gray-900">
                Most people are not lacking effort. They're lacking a system they can actually stay consistent with long enough to move forward.
              </p>
            </div>

          </div>
        </section>

        {/* ── Section 7: Doctor Credibility ───────────────────────────── */}
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
                    Built by a Doctor<br />of Physical Therapy
                  </h2>
                   <div className="w-10 h-0.5 bg-blue-600 mb-6" />
                   <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                     <p><span className="text-blue-600 font-semibold">Dr. Jonathan Schutza, PT, DPT</span> is a licensed physical therapist specializing in biomechanics-driven rehabilitation for chronic foot and ankle pain.</p>
                     <p>His approach is built around progressive loading and structured movement — not passive treatments or temporary fixes.</p>
                     <div className="space-y-2 mt-2">
                       <div className="flex items-center gap-2"><span className="text-blue-600 font-bold">—</span><p className="text-slate-700 text-sm">Biomechanics-driven rehabilitation</p></div>
                       <div className="flex items-center gap-2"><span className="text-blue-600 font-bold">—</span><p className="text-slate-700 text-sm">Progressive loading principles</p></div>
                       <div className="flex items-center gap-2"><span className="text-blue-600 font-bold">—</span><p className="text-slate-700 text-sm">Built for guided recovery at home</p></div>
                     </div>
                   </div>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Section 8: Guarantee ─────────────────────────────────────── */}
        <section className="py-8 md:py-10">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 md:p-14 max-w-2xl mx-auto text-center">

                  {/* Eyebrow */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Shield size={18} className="text-blue-600" />
                    <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest">Our 60-Day Guarantee</p>
                  </div>

                  {/* Headline */}
                  <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                    The <span className="text-blue-600">"Walk Pain-Free Or It's Free"</span> 60-Day Guarantee
                  </h2>

                  <div className="w-10 h-0.5 bg-blue-600 mx-auto mb-6" />

                  {/* Body copy */}
                  <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-lg mx-auto">
                    Try the system for 60 days. Follow the program, track your progress, and if you do not experience meaningful improvement, we'll refund your investment. No questions asked.
                  </p>

                  {/* 3 inline trust bullets */}
                  <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-sm text-slate-700">
                    <span className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-blue-600 shrink-0" />
                      60 full days to test the system
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-blue-600 shrink-0" />
                      Progress tracking inside the app
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-blue-600 shrink-0" />
                      Full refund if the program is not right for you
                    </span>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Section 9: Transition CTA ────────────────────────────────── */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-4">
              Ready To See How The Full System Works?
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready To See How The Full System Works?
            </h2>
            <div className="w-10 h-0.5 bg-blue-600 mx-auto mb-6" />
            <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Explore how The Foot Capacity System helps people approach recovery with more structure, more clarity, and less guesswork from home.
            </p>
            <a
              href="https://fixyourmovement.com/walkthrough"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button animate-pulse-glow"
            >
              Watch The Full Guided Walkthrough
            </a>
            <p className="text-slate-400 text-sm mt-4">
              No clinic visits required. One-time investment. Lifetime access.
            </p>
          </div>
        </section>

        {/* ── Section 10: FAQ ──────────────────────────────────────────── */}
        <section className="bg-slate-50 py-8 md:py-10">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display text-2xl md:text-4xl text-slate-900 mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-slate-500 text-center mb-10">
              A few common questions people ask before exploring The Foot Capacity System further.
            </p>
            <Accordion type="single" collapsible className="space-y-4">
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

      </main>
      <Footer />

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
