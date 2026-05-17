import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialSection from "@/components/TestimonialSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "@/assets/logo.png";
import {
  Tag,
  ShieldCheck,
  Lock,
  Compass,
  Activity,
  BarChart2,
  Smartphone,
  SlidersHorizontal,
  Bell,
  RefreshCw,
  Infinity,
  Route,
  Leaf,
  Dumbbell,
  PersonStanding,
  Star,
  CheckCircle,
  AlertTriangle,
  ArrowDown,
  TrendingUp,
  Heart,
  Eye,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const painData = [
  { month: "May", pain: 8, trend: 7.5 },
  { month: "Jun", pain: 6.5, trend: 6.5 },
  { month: "Jul", pain: 5.5, trend: 5.5 },
  { month: "Aug", pain: 4, trend: 4.5 },
  { month: "Sep", pain: 2.5, trend: 3.5 },
  { month: "Oct", pain: 2, trend: 2.5 },
];

export default function Walkthrough() {
  return (
    <div className="min-h-screen bg-white font-inter">
      {/* 1. HEADER */}
      <Header />

      {/* 2. HERO SECTION */}
      <section className="bg-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Recovery Becomes Much Less Overwhelming With The{" "}
            <span className="text-blue-600">Right Structure</span>
          </h1>
          <p className="text-slate-600 text-base mt-3 max-w-xl mx-auto">
            The Foot Capacity System helps people move through recovery more
            calmly through guided support, progress tracking, and a clearer
            day-to-day process.
          </p>

          {/* Video Placeholder */}
          <div className="bg-slate-100 rounded-2xl aspect-video max-w-2xl mx-auto mt-8 flex items-center justify-center">
            <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="8,5 20,12 8,19" />
              </svg>
            </div>
          </div>

          <p className="text-slate-600 text-center mt-6 max-w-xl mx-auto">
            The system was built to help people spend less time feeling stuck
            and more time steadily moving forward.
          </p>

          <a
            href="https://whop.com/checkout/plan_f7hnKFT1vq0zb"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg mt-8 inline-block"
          >
            Get Started With The Foot Capacity System &rarr;
          </a>

          {/* Trust Badges */}
          <div className="mt-4 flex justify-center gap-6 text-sm text-slate-500">
            <span>
              <Tag size={16} className="inline mr-1 text-blue-500" />
              One-time purchase
            </span>
            <span>
              <ShieldCheck size={16} className="inline mr-1 text-blue-500" />
              Lifetime access included
            </span>
            <span>
              <Lock size={16} className="inline mr-1 text-blue-500" />
              Secure checkout
            </span>
          </div>
        </div>
      </section>

      {/* 3. WHAT STARTS CHANGING SECTION */}
      <section className="bg-slate-50 py-16 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-blue-600 uppercase tracking-widest text-xs font-semibold mb-2">
            WHAT STARTS CHANGING
          </p>
          <h2 className="text-slate-900 text-3xl font-bold">
            What Starts Changing With
            <br />
            <span className="text-blue-600">A Clearer Recovery Process</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 text-left shadow-sm">
              <div className="bg-blue-50 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Compass size={20} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base mb-1">
                Less Second-Guessing
              </h3>
              <div className="w-8 h-0.5 bg-blue-600 mb-3" />
              <p className="text-slate-600 text-sm">
                Spend less time wondering whether you're doing too much, too
                little, or heading in the wrong direction.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 text-left shadow-sm">
              <div className="bg-blue-50 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Activity size={20} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base mb-1">
                More Consistency Through Flare-Ups
              </h3>
              <div className="w-8 h-0.5 bg-blue-600 mb-3" />
              <p className="text-slate-600 text-sm">
                Setbacks stop feeling like complete restarts when recovery is
                approached with more structure over time.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 text-left shadow-sm">
              <div className="bg-blue-50 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <BarChart2 size={20} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base mb-1">
                A Clearer Sense Of Progress
              </h3>
              <div className="w-8 h-0.5 bg-blue-600 mb-3" />
              <p className="text-slate-600 text-sm">
                Tracking trends over time helps recovery feel less emotional and
                much easier to understand.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 text-left shadow-sm">
              <div className="bg-blue-50 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <ShieldCheck size={20} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base mb-1">
                More Confidence Moving Forward
              </h3>
              <div className="w-8 h-0.5 bg-blue-600 mb-3" />
              <p className="text-slate-600 text-sm">
                The goal is not perfection. The goal is helping recovery feel
                more steady, manageable, and sustainable long term.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT SUMMARY SECTION */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <img
            src="/images/whats-included.png"
            alt="What's included in the Foot Capacity System"
            className="w-full rounded-2xl shadow-sm"
          />
        </div>
      </section>

      {/* 5. HOW THE SYSTEM SUPPORTS YOU — ACCORDION SECTION */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-blue-600 uppercase tracking-widest text-xs font-semibold text-center mb-2">
            HOW THE SYSTEM SUPPORTS YOU
          </p>
          <h2 className="text-center text-3xl font-bold text-slate-900 mb-10">
            A closer look at how the system helps guide recovery through both
            progress and setbacks.
          </h2>

          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="max-w-2xl mx-auto space-y-3"
          >
            {/* Accordion Item 1 */}
            <AccordionItem
              value="item-1"
              className="rounded-xl border border-slate-200 bg-white shadow-sm px-4"
            >
              <AccordionTrigger className="flex gap-3 items-center">
                <div className="flex gap-3 items-center">
                  <Route
                    size={32}
                    className="p-1.5 bg-blue-50 rounded-full text-blue-600 shrink-0"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-slate-900">
                      A Clearer Recovery Process
                    </div>
                    <div className="text-sm text-slate-500">
                      A step-by-step structure that keeps you focused,
                      consistent, and moving forward.
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-2">
                <p className="text-slate-600 text-sm mb-6">
                  Recovery happens in phases. The system gives you a clear plan
                  for each stage—so you always know what to focus on and why.
                </p>

                {/* 4-step flow */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
                  <div className="text-center flex-1">
                    <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Leaf size={20} className="text-green-600" />
                    </div>
                    <p className="font-bold text-slate-900 text-sm">Reset</p>
                    <p className="text-slate-500 text-xs">Weeks 1–4</p>
                    <p className="text-slate-600 text-xs mt-1">
                      Calm pain and restore movement.
                    </p>
                  </div>
                  <div className="text-center flex-1">
                    <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Dumbbell size={20} className="text-blue-600" />
                    </div>
                    <p className="font-bold text-slate-900 text-sm">Restore</p>
                    <p className="text-slate-500 text-xs">Weeks 5–8</p>
                    <p className="text-slate-600 text-xs mt-1">
                      Build strength and capacity.
                    </p>
                  </div>
                  <div className="text-center flex-1">
                    <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <PersonStanding size={20} className="text-purple-600" />
                    </div>
                    <p className="font-bold text-slate-900 text-sm">Perform</p>
                    <p className="text-slate-500 text-xs">Weeks 9–12</p>
                    <p className="text-slate-600 text-xs mt-1">
                      Improve function and tolerance.
                    </p>
                  </div>
                  <div className="text-center flex-1">
                    <div className="bg-yellow-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Star size={20} className="text-yellow-500" />
                    </div>
                    <p className="font-bold text-slate-900 text-sm">
                      Maintain
                    </p>
                    <p className="text-slate-500 text-xs">For Life</p>
                    <p className="text-slate-600 text-xs mt-1">
                      Keep progress moving long term.
                    </p>
                  </div>
                </div>

                {/* Highlight box */}
                <div className="bg-blue-50 rounded-xl p-4 flex gap-3 items-center">
                  <CheckCircle
                    size={20}
                    className="text-blue-600 shrink-0"
                  />
                  <p className="text-slate-700 text-sm font-medium">
                    The system looks for consistent trends, not perfect days.
                  </p>
                </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Accordion Item 2 */}
            <AccordionItem
              value="item-2"
              className="rounded-xl border border-slate-200 bg-white shadow-sm px-4"
            >
              <AccordionTrigger className="flex gap-3 items-center">
                <div className="flex gap-3 items-center">
                  <Activity
                    size={32}
                    className="p-1.5 bg-red-50 rounded-full text-red-500 shrink-0"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-slate-900">
                      Support During Flare-Ups
                    </div>
                    <div className="text-sm text-slate-500">
                      Tools and guidance that help you navigate setbacks without
                      starting over.
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-2">
                <p className="text-slate-600 text-sm mb-6">
                  Flare-ups happen during recovery. The system helps you
                  temporarily reduce overload, adjust your plan, and keep
                  progressing—without feeling like you're starting over.
                </p>

                {/* 3-step flow */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="text-center flex-1">
                    <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <AlertTriangle size={20} className="text-red-500" />
                    </div>
                    <p className="font-bold text-slate-900 text-sm">
                      Flare-Up Detected
                    </p>
                    <p className="text-slate-600 text-xs mt-1">
                      The system recognizes the change.
                    </p>
                  </div>
                  <div className="text-center flex-1">
                    <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ArrowDown size={20} className="text-purple-500" />
                    </div>
                    <p className="font-bold text-slate-900 text-sm">
                      Reduce Load Temporarily
                    </p>
                    <p className="text-slate-600 text-xs mt-1">
                      Lower stress. Keep moving.
                    </p>
                  </div>
                  <div className="text-center flex-1">
                    <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp size={20} className="text-green-600" />
                    </div>
                    <p className="font-bold text-slate-900 text-sm">
                      Build Back Gradually
                    </p>
                    <p className="text-slate-600 text-xs mt-1">
                      Progress resumes step by step.
                    </p>
                  </div>
                </div>

                {/* Highlight box */}
                <div className="bg-red-50 rounded-xl p-4 flex gap-3 items-center">
                  <Heart size={20} className="text-red-500 shrink-0" />
                  <p className="text-red-700 text-sm font-medium">
                    Setbacks are normal. They don't erase progress. The system
                    helps you reset, not restart.
                  </p>
                </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Accordion Item 3 */}
            <AccordionItem
              value="item-3"
              className="rounded-xl border border-slate-200 bg-white shadow-sm px-4"
            >
              <AccordionTrigger className="flex gap-3 items-center">
                <div className="flex gap-3 items-center">
                  <BarChart2
                    size={32}
                    className="p-1.5 bg-green-50 rounded-full text-green-600 shrink-0"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-slate-900">
                      Tracking Progress Over Time
                    </div>
                    <div className="text-sm text-slate-500">
                      Insights and data that help you understand what's
                      improving over time.
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-2">
                <p className="text-slate-600 text-sm mb-4">
                  Recovery is rarely perfectly linear. The system helps you look
                  at longer-term trends instead of reacting emotionally to every
                  difficult day or temporary setback.
                </p>

                {/* Recharts Line Chart */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 mb-4">
                  <p className="font-semibold text-slate-900 text-sm mb-1">
                    Pain Over Time
                  </p>
                  <p className="text-slate-500 text-xs mb-3">
                    Daily pain scores from 0 (no pain) to 10 (worst)
                  </p>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={painData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f1f5f9"
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis
                        domain={[0, 10]}
                        tick={{ fontSize: 11 }}
                      />
                      <Tooltip />
                      <Legend
                        verticalAlign="bottom"
                        wrapperStyle={{ fontSize: "12px" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="pain"
                        stroke="#16A34A"
                        dot={true}
                        strokeWidth={2}
                        name="Daily Pain"
                      />
                      <Line
                        type="monotone"
                        dataKey="trend"
                        stroke="#94a3b8"
                        dot={false}
                        strokeDasharray="5 5"
                        name="Trend"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Highlight box */}
                <div className="bg-green-50 rounded-xl p-4 flex gap-3 items-center">
                  <Eye size={20} className="text-green-600 shrink-0" />
                  <p className="text-slate-700 text-sm font-medium">
                    Some days will feel better than others. What matters most is
                    the overall direction over time.
                  </p>
                </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Privacy note */}
          <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
            <Lock size={12} />
            Your data is private, encrypted, and never shared.
          </p>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <TestimonialSection />

      {/* 7. FAQ SECTION */}
      <section className="bg-white py-16">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-blue-600 uppercase tracking-widest text-xs font-semibold">
            COMMON QUESTIONS
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mt-1 mb-2">
            Common Questions
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            A few things people often ask before getting started.
          </p>

          <Accordion
            type="single"
            collapsible
            className="space-y-3"
          >
            <AccordionItem
              value="faq-1"
              className="rounded-xl border border-slate-200 px-4"
            >
              <AccordionTrigger className="flex items-center">
                <div className="flex items-center">
                  <span className="inline-flex w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm items-center justify-center mr-3 shrink-0">
                    1
                  </span>
                  What if I've been dealing with foot pain for a long time?
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-2">
                  <p className="text-slate-600 text-sm">
                    The system is designed to meet you where you are. Whether
                    you've been dealing with foot pain for weeks, months, or
                    years, the structured phases help you start making progress
                    from your current baseline.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="faq-2"
              className="rounded-xl border border-slate-200 px-4"
            >
              <AccordionTrigger className="flex items-center">
                <div className="flex items-center">
                  <span className="inline-flex w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm items-center justify-center mr-3 shrink-0">
                    2
                  </span>
                  What happens if I have a flare-up during the program?
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-2">
                  <p className="text-slate-600 text-sm">
                    Flare-ups are a normal part of recovery. The system is
                    designed to help you adjust temporarily, reduce overload, and
                    keep moving forward without feeling like you're starting over.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="faq-3"
              className="rounded-xl border border-slate-200 px-4"
            >
              <AccordionTrigger className="flex items-center">
                <div className="flex items-center">
                  <span className="inline-flex w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm items-center justify-center mr-3 shrink-0">
                    3
                  </span>
                  How much time does the system take each day?
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-2">
                  <p className="text-slate-600 text-sm">
                    Most daily tasks take around 10–15 minutes. The system is
                    designed to fit into your existing routine without adding
                    unnecessary burden.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="faq-4"
              className="rounded-xl border border-slate-200 px-4"
            >
              <AccordionTrigger className="flex items-center">
                <div className="flex items-center">
                  <span className="inline-flex w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm items-center justify-center mr-3 shrink-0">
                    4
                  </span>
                  Do I need a gym or special equipment?
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-2">
                  <p className="text-slate-600 text-sm">
                    No. The exercises and activities in the system can be done at
                    home with minimal or no equipment.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="faq-5"
              className="rounded-xl border border-slate-200 px-4"
            >
              <AccordionTrigger className="flex items-center">
                <div className="flex items-center">
                  <span className="inline-flex w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm items-center justify-center mr-3 shrink-0">
                    5
                  </span>
                  Will I still have access after the 12 weeks?
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-2">
                  <p className="text-slate-600 text-sm">
                    Yes. You get lifetime access. Return to the system anytime you
                    need structure, guidance, or support.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="faq-6"
              className="rounded-xl border border-slate-200 px-4"
            >
              <AccordionTrigger className="flex items-center">
                <div className="flex items-center">
                  <span className="inline-flex w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm items-center justify-center mr-3 shrink-0">
                    6
                  </span>
                  Is the system personalized?
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-2">
                  <p className="text-slate-600 text-sm">
                    The system includes structured phases that adapt based on how
                    you're responding. While it follows a guided framework, it's
                    designed to flex around your progress.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="faq-7"
              className="rounded-xl border border-slate-200 px-4"
            >
              <AccordionTrigger className="flex items-center">
                <div className="flex items-center">
                  <span className="inline-flex w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm items-center justify-center mr-3 shrink-0">
                    7
                  </span>
                  What if I don't feel like I'm progressing?
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-2">
                  <p className="text-slate-600 text-sm">
                    That's what the 60-day guarantee is for. If you genuinely
                    follow the structure and don't feel like you're heading in the
                    right direction, we'll make it right.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 8. FINAL CTA SECTION */}
      <section className="bg-slate-50 py-16 text-center">
        <div className="bg-gradient-to-br from-blue-50 to-slate-100 max-w-3xl mx-auto px-8 py-12 rounded-2xl">
          <ShieldCheck size={40} className="text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-slate-900">
            A More Supported Way
            <br />
            To Move Through Recovery
          </h2>
          <div className="w-10 h-0.5 bg-blue-600 mx-auto my-4" />
          <p className="text-slate-600 text-base max-w-lg mx-auto mb-8">
            Access the complete system, app, and tools designed to help recovery
            feel less overwhelming and easier to manage over time.
          </p>
          <a
            href="https://whop.com/checkout/plan_f7hnKFT1vq0zb"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg inline-block"
          >
            Get Started With The Foot Capacity System &rarr;
          </a>

          {/* Trust Badges */}
          <div className="mt-4 flex justify-center gap-6 text-sm text-slate-500">
            <span>
              <Tag size={16} className="inline mr-1 text-blue-500" />
              One-time purchase
            </span>
            <span>
              <ShieldCheck size={16} className="inline mr-1 text-blue-500" />
              Lifetime access included
            </span>
            <span>
              <Lock size={16} className="inline mr-1 text-blue-500" />
              Secure checkout
            </span>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <Footer />
    </div>
  );
}
