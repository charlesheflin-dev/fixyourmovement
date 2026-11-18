import type { ReactNode } from "react";
import logo from "@/assets/logo.png";

// Fair comparison page (SPEC-ai-discoverability-fixes item 24, built 2026-11-18 after items 1-13).
// Rules from the spec: disclose that we wrote it, link the primary evidence, invent nothing about
// competitors. Competitor facts come ONLY from their own pages, read 2026-11-18:
//   E3 Rehab  https://e3rehab.com/programs/rehab/plantar-fasciitis/  (price, length, frequency,
//             session time, equipment, format, community, access, refund line)
//   Vivobarefoot https://www.vivobarefoot.com/us/plantar-fasciitis-rehab-programme (price, format,
//             clinician). Nothing else was stated on the page, so nothing else is claimed here.
// Guideline citation confirmed via Europe PMC (PMID 38037331); its recommendation grades were not
// readable (publisher bot-check), so the page links it and does not quote grades.
// FCS facts are copied from /foot-capacity-system. No equipment line for FCS (pending Dr. Schutza,
// same as that page). Re-check competitor details before any copy change. Head is set at the edge:
// functions/best-at-home-plantar-fasciitis-programs.js.

const CHECKED = "November 2026";
const GUIDELINE_URL = "https://doi.org/10.2519/jospt.2023.0303";

type Option = {
  name: string;
  ours?: boolean;
  what: string;
  facts: [string, string][];
  fit: string;
  link?: { href: string; label: string };
};

const OPTIONS: Option[] = [
  {
    name: "The Foot Capacity System (ours)",
    ours: true,
    what: "A guided home program in an app, created by Dr. Jonathan Schutza, PT, DPT. You log a short daily check-in and the plan adjusts to how your foot is doing.",
    facts: [
      ["Price", "Free for your first 7 check-ins. Then $47/month, $97/month for 6 months (then lifetime access), or $297 or $497 one time."],
      ["Length and time", "Three phases over about 12 weeks. About 15 minutes a day."],
      ["Format", "App with daily guided exercises, video instruction, pain tracking and progress history."],
      ["Clinician contact", "Direct messaging with Dr. Jonathan for the first 6 months on the $97 and $497 plans. Every plan includes Ask Dr. Jonathan AI."],
      ["When pain flares", "Built-in Calm Mode reduces load temporarily without losing your progress."],
      ["Refunds", "30-day money-back guarantee on every plan."],
    ],
    fit: "A good fit if you want daily structure, tracking, and a plan that changes when your symptoms do. Not the cheapest option, and it asks for a short check-in every day.",
    link: { href: "/foot-capacity-system", label: "See plans and how it works →" },
  },
  {
    name: "E3 Rehab Plantar Fasciitis Program",
    what: "A self-directed digital program designed by Doctors of Physical Therapy, delivered as a PDF and spreadsheet with written and video instructions.",
    facts: [
      ["Price", "$99.99 as listed on their page, with lifetime access including future updates."],
      ["Length and time", "16 weeks, 3 days a week. Basic sessions 8–12 minutes; Comprehensive sessions 20–45 minutes."],
      ["Equipment", "None needed to start. The full program uses weights, resistance bands and a step."],
      ["Clinician contact", "Questions through a private Facebook community."],
      ["Refunds", "Their page states no refunds are available for downloadable products."],
    ],
    fit: "A good fit if you like a clear written plan you work through on your own, at a lower one-time price.",
    link: { href: "https://e3rehab.com/programs/rehab/plantar-fasciitis/", label: "E3 Rehab program page →" },
  },
  {
    name: "Vivobarefoot Plantar Fasciopathy Rehab Programme",
    what: "An online course with Functional Podiatrist Rina Harris that teaches what causes plantar fasciitis and guides you through exercises for foot function and mobility.",
    facts: [
      ["Price", "$124 as listed on their page."],
      ["Other details", "Length, time per day, clinician contact and refund terms weren't stated on the page we checked. See their page."],
    ],
    fit: "A good fit if you want an education-focused course from a podiatrist.",
    link: { href: "https://www.vivobarefoot.com/us/plantar-fasciitis-rehab-programme", label: "Vivobarefoot course page →" },
  },
  {
    name: "Free videos and articles",
    what: "Stretching and strengthening routines on YouTube, blogs and clinic websites, including our own articles.",
    facts: [
      ["Price", "Free."],
      ["What you don't get", "Usually no set progression, no tracking, and no one checking how you're responding."],
    ],
    fit: "A reasonable place to start if your symptoms are mild or new, or you want to try the basics before paying for anything.",
    link: { href: "/blog/", label: "Our free plantar fasciitis articles →" },
  },
  {
    name: "In-person or telehealth physical therapy",
    what: "A licensed physical therapist examines you, rules out other causes of heel pain, and tailors treatment to you.",
    facts: [
      ["Price", "Depends on your insurance, location and number of visits."],
      ["What you get", "An individual assessment and hands-on or live guidance that no home program can replace."],
    ],
    fit: "The right choice if your pain is severe, isn't improving, or you have any of the warning signs on our when-to-get-seen page.",
    link: { href: "/when-to-get-seen-in-person", label: "When to get seen in person →" },
  },
  {
    name: "Supportive devices: inserts, night splints, stretching tools",
    what: "Shoe inserts, overnight splints and calf-stretching devices.",
    facts: [
      ["Role", "Add-ons, not full programs. They can make standing or first steps in the morning more comfortable for some people, but they don't build strength on their own."],
    ],
    fit: "Worth considering alongside an exercise program, not instead of one.",
  },
];

const QUESTIONS = [
  "What does it cost in total, and is it one payment or monthly?",
  "How long does it run, and how much time does it take each day or week?",
  "What equipment do you need?",
  "Who designed it, and can you actually contact a clinician?",
  "What happens when your pain flares up — does the plan change?",
  "What are the refund terms?",
];

function Panel({ children, highlight }: { children: ReactNode; highlight?: boolean }) {
  return (
    <section className={`rounded-2xl border bg-white px-4 py-5 sm:px-6 ${highlight ? "border-blue-300" : "border-slate-200"}`}>
      {children}
    </section>
  );
}

export default function ProgramsCompared() {
  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      <div className="mx-auto w-full max-w-[720px] px-4 pt-7 sm:px-6 sm:pt-12">
        <a href="/" className="flex items-center gap-3.5">
          <img src={logo} alt="The Foot Capacity System" className="h-[34px] md:h-[42px] w-auto shrink-0" />
          <span className="text-slate-900 font-bold text-base md:text-lg leading-tight tracking-tight whitespace-nowrap">The Foot Capacity System</span>
        </a>
      </div>

      <main className="mx-auto w-full max-w-[720px] px-4 max-[359px]:px-3 pt-8 pb-12 sm:px-6 flex flex-col gap-5">
        <div>
          <h1 className="text-slate-900 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Best At-Home Plantar Fasciitis Programs: How to Choose
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            There are several good ways to work on plantar fasciitis and heel pain at home. They differ in price, structure, how much support you get, and what happens when your pain flares. This page lays them side by side so you can pick the one that fits you.
          </p>
        </div>

        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-slate-800 text-sm leading-relaxed">
          <strong>Disclosure:</strong> we make the Foot Capacity System, one of the options below. Details for other programs come from their own websites, checked in {CHECKED}. Prices and terms can change, so check each provider's page before you buy.
        </p>

        <Panel>
          <h2 className="text-slate-900 text-xl font-bold leading-snug">What the evidence says</h2>
          <p className="mt-2 text-slate-700 text-[15px] leading-relaxed">
            The American Physical Therapy Association publishes a clinical practice guideline for heel pain and plantar fasciitis, last revised in 2023. It's written for clinicians and is the best single summary of what conservative treatments the research supports.
          </p>
          <p className="mt-2 text-slate-700 text-[15px] leading-relaxed">
            That research is about types of treatment, not about any one paid program. We're not aware of a published controlled trial of any specific program on this page, including ours.
          </p>
          <p className="mt-3 text-sm">
            <a href={GUIDELINE_URL} className="text-blue-600 font-semibold hover:underline" rel="noopener">
              Koc TA, et al. Heel Pain – Plantar Fasciitis: Revision 2023. J Orthop Sports Phys Ther. 2023;53(12):CPG1–CPG39 →
            </a>
          </p>
        </Panel>

        <Panel>
          <h2 className="text-slate-900 text-xl font-bold leading-snug">Questions to ask any program</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-slate-700 text-[15px] leading-relaxed">
            {QUESTIONS.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </Panel>

        <h2 className="mt-4 text-slate-900 text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">The options</h2>

        {OPTIONS.map((o) => (
          <Panel key={o.name} highlight={o.ours}>
            <h3 className="text-slate-900 text-lg font-bold leading-snug">{o.name}</h3>
            <p className="mt-2 text-slate-700 text-[15px] leading-relaxed">{o.what}</p>
            <dl className="mt-4 divide-y divide-slate-100 border-y border-slate-100">
              {o.facts.map(([label, value]) => (
                <div key={label} className="py-2.5 sm:grid sm:grid-cols-[150px_1fr] sm:gap-4">
                  <dt className="text-slate-500 text-sm font-semibold">{label}</dt>
                  <dd className="mt-0.5 sm:mt-0 text-slate-800 text-[15px] leading-snug">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-slate-700 text-[15px] leading-relaxed">{o.fit}</p>
            {o.link && (
              <p className="mt-3 text-sm">
                <a href={o.link.href} className="text-blue-600 font-semibold hover:underline" {...(o.link.href.startsWith("http") ? { rel: "noopener" } : {})}>
                  {o.link.label}
                </a>
              </p>
            )}
          </Panel>
        ))}

        <Panel>
          <h2 className="text-slate-900 text-xl font-bold leading-snug">How to choose</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-slate-700 text-[15px] leading-relaxed">
            <li>Severe pain, pain that isn't improving, or any warning signs: see a physical therapist or doctor first.</li>
            <li>Mild or new symptoms and you'd like to try the basics: start with free routines.</li>
            <li>You're self-motivated and want a clear written plan at a lower price: a self-directed program like E3 Rehab.</li>
            <li>You want to understand what's going on, from a podiatrist: an education-focused course like Vivobarefoot's.</li>
            <li>You want daily structure, tracking, and a plan that adjusts when your pain flares: the Foot Capacity System.</li>
            <li>Whatever you choose, inserts or a night splint can be added for comfort, but not as a replacement for exercise.</li>
          </ul>
        </Panel>

        <p className="text-slate-500 text-sm leading-relaxed">
          Written by the Foot Capacity System team. Questions or a correction about another program? Email <a href="mailto:contact@fixyourmovement.com" className="underline">contact@fixyourmovement.com</a>.
        </p>
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
            <a href="/dr-jonathan-schutza" className="hover:text-slate-600 transition-colors">About Dr. Schutza</a>
            <a href="/contact" className="hover:text-slate-600 transition-colors">Contact</a>
          </div>
        </div>
        <p className="max-w-5xl mx-auto px-6 mt-4 text-slate-400 text-xs text-center md:text-left">
          This program is for educational purposes and is not a substitute for personalized medical advice. Consult your healthcare provider before beginning any exercise program.
        </p>
        <p className="max-w-5xl mx-auto px-6 mt-2 text-slate-400 text-xs text-center md:text-left">
          <a href="/when-to-get-seen-in-person" className="underline hover:text-slate-600 transition-colors">When to get seen in person</a>
        </p>
      </footer>
    </div>
  );
}
