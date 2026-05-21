import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WalkthroughTestimonialSection from "@/components/WalkthroughTestimonialSection";
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
  UserCheck,
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
      <section className="bg-white pt-24 py-16 text-center">
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
          <div className="max-w-2xl mx-auto mt-8">
            <div style={{ position: "relative", paddingTop: "56.25%" }} className="rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://customer-hene8ngxxo3eajlj.cloudflarestream.com/b37100f8162e1ab91cf86c9e284447da/iframe?preload=true&poster=https%3A%2F%2Fimagedelivery.net%2FZUbdF1A6bMNaR2l0OC84jw%2F6ec4d8b4-8156-40b2-b196-836d95530f00%2Fpublic"
                loading="lazy"
                style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen={true}
              ></iframe>
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
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">

            {/* Header */}
            <div className="text-center px-8 pt-10 pb-6">
              <img src={logo} alt="FCS" className="h-10 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-slate-900 mb-2">The Foot Capacity System</h2>
              <p className="text-blue-600 italic text-sm max-w-md mx-auto">A structured recovery system designed to help you stop guessing and move forward with more clarity and confidence.</p>
            </div>

            {/* Phone + Charts */}
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Phone */}
                <div className="sm:w-2/5 flex flex-col items-center gap-4">
                  <img src="/images/new-phone.jpg" alt="App screenshot" className="w-full max-w-[180px] rounded-2xl" />
                  <img src="/images/new-phone2.jpg" alt="App screenshot 2" className="w-full max-w-[180px] rounded-2xl mt-4" />
                </div>
                {/* Charts column */}
                <div className="sm:w-3/5 flex flex-col gap-4">

                  {/* Phase 1 Reset Chart */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <p className="font-semibold text-slate-900 text-sm">Phase 1: Reset</p>
                    <p className="text-slate-500 text-xs mb-3">May 11 – present</p>
                    <ResponsiveContainer width="100%" height={80}>
                      <LineChart data={[
                        { day: "May 11", red: 7, green: 5 },
                        { day: "May 12", red: 6, green: 5.5 },
                        { day: "May 13", red: 6.5, green: 6 },
                        { day: "May 14", red: 5.5, green: 6.5 },
                        { day: "May 15", red: 6, green: 7 },
                        { day: "May 16", red: 5, green: 7.5 },
                        { day: "May 17", red: 5.5, green: 8 },
                        { day: "May 18", red: 4.5, green: 8.5 },
                        { day: "Jun 16", red: 5, green: 9 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="day" tick={{ fontSize: 9 }} interval="preserveStartEnd" />
                        <YAxis domain={[0, 10]} tick={{ fontSize: 9 }} width={20} />
                        <Line type="monotone" dataKey="red" stroke="#ef4444" dot={false} strokeWidth={2} />
                        <Line type="monotone" dataKey="green" stroke="#16A34A" dot={false} strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="flex justify-around mt-3 text-center">
                      <div><p className="text-lg font-bold text-slate-900">8</p><p className="text-xs text-slate-500">Starting pain</p></div>
                      <div><p className="text-lg font-bold text-slate-900">6</p><p className="text-xs text-slate-500">Ending pain</p></div>
                      <div><p className="text-lg font-bold text-slate-900">10</p><p className="text-xs text-slate-500">Days logged</p></div>
                    </div>
                  </div>

                  {/* FAAM */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <p className="font-semibold text-slate-900 text-sm">Foot Function Progress (FAAM)</p>
                    <p className="text-slate-500 text-xs mb-3">Your Foot and Ankle Ability score at each phase — higher is better. 100% = full function.</p>
                    <div className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2">
                      <span className="text-sm text-slate-700">Baseline (Onboarding)</span>
                      <span className="text-xl font-bold text-red-500">31%</span>
                    </div>
                  </div>

                  {/* Pain Over Time Chart */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <p className="font-semibold text-slate-900 text-sm">Insights</p>
                    <p className="font-medium text-slate-700 text-xs mt-1">Pain Over Time</p>
                    <p className="text-slate-500 text-xs mb-3">Daily pain scores from 0 (no pain) to 10 (worst)</p>
                    <ResponsiveContainer width="100%" height={100}>
                      <LineChart data={[
                        { month: "May 11", pain: 8 },
                        { month: "May 12", pain: 7 },
                        { month: "May 13", pain: 7.5 },
                        { month: "May 14", pain: 6 },
                        { month: "May 15", pain: 6.5 },
                        { month: "May 16", pain: 5.5 },
                        { month: "May 17", pain: 6 },
                        { month: "Jun 15", pain: 5 },
                        { month: "Jun 16", pain: 6 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 9 }} interval="preserveStartEnd" />
                        <YAxis domain={[0, 10]} tick={{ fontSize: 9 }} width={20} />
                        <Line type="monotone" dataKey="pain" stroke="#16A34A" dot={{ r: 3, fill: "#16A34A" }} strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                    {/* Analytics */}
                    <div className="flex justify-around mt-3 text-center flex-wrap gap-2">
                      <div><p className="text-base font-bold text-slate-900">30</p><p className="text-xs text-slate-500">Rehab Minutes</p></div>
                      <div><p className="text-base font-bold text-slate-900">10</p><p className="text-xs text-slate-500">Days Logged</p></div>
                      <div><p className="text-base font-bold text-slate-900">7</p><p className="text-xs text-slate-500">Avg Pain Score</p></div>
                      <div><p className="text-base font-bold text-green-600">-3</p><p className="text-xs text-slate-500">Pain Change</p></div>
                      <div><p className="text-base font-bold text-slate-900">4</p><p className="text-xs text-slate-500">Milestones</p></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="px-8 pb-6">
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest text-center mb-6">What's Included</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col items-start gap-2">
                  <div className="bg-blue-50 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                    <Smartphone size={18} className="text-blue-600" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">Full App Access</p>
                  <p className="text-slate-500 text-xs">Complete access to the app, exercises, and all program features.</p>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <div className="bg-blue-50 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                    <BarChart2 size={18} className="text-blue-600" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">Progress Tracking</p>
                  <p className="text-slate-500 text-xs">Track strength, mobility, and consistency with powerful visual insights.</p>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <div className="bg-blue-50 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                    <SlidersHorizontal size={18} className="text-blue-600" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">Structured Phases</p>
                  <p className="text-slate-500 text-xs">Step-by-step phases guide you from foundation to fuller function.</p>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <div className="bg-blue-50 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                    <Heart size={18} className="text-blue-600" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">Flare-Up Support</p>
                  <p className="text-slate-500 text-xs">Tools and guidance to help you manage setbacks and stay on track.</p>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <div className="bg-blue-50 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                    <Infinity size={18} className="text-blue-600" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">Lifetime Access</p>
                  <p className="text-slate-500 text-xs">Use the system for as long as you need, with future updates included.</p>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <div className="bg-blue-50 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                    <UserCheck size={18} className="text-blue-600" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">Guided Recovery</p>
                  <p className="text-slate-500 text-xs">Clear instructions and expert guidance every step of the way.</p>
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="mx-6 mb-4 bg-blue-50 rounded-2xl p-5 flex gap-4 items-start">
              <div className="bg-blue-600 rounded-full p-2 shrink-0">
                <ShieldCheck size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">60-Day Guarantee</p>
                <p className="text-slate-600 text-xs mt-1">Try The Foot Capacity System risk-free for 60 days. If you don't feel it's the right fit, let us know and we'll make it right—no hassle.</p>
              </div>
            </div>

            {/* Price */}
            <div className="mx-6 mb-6 border border-slate-200 rounded-2xl p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-4xl font-bold text-blue-600">$397</p>
                <p className="text-blue-600 text-xs font-semibold">One-Time Payment</p>
                <p className="text-slate-500 text-xs">No monthly fees. No subscriptions.</p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                  <Infinity size={20} className="text-slate-400" />
                  <p className="font-semibold text-slate-900 text-sm">Lifetime Access Included</p>
                </div>
                <p className="text-slate-500 text-xs">Get lifetime access to the complete system, all updates, and everything you need to keep moving forward.</p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="border-t border-slate-100 px-8 py-4 flex justify-around text-xs text-slate-500">
              <span className="flex items-center gap-1"><Lock size={12} className="text-blue-500" /> Secure Checkout</span>
              <span className="flex items-center gap-1"><Tag size={12} className="text-blue-500" /> One-Time Payment</span>
              <span className="flex items-center gap-1"><Infinity size={12} className="text-blue-500" /> Lifetime Access</span>
            </div>

          </div>
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
      <WalkthroughTestimonialSection />

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
