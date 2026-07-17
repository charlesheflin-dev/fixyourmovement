import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check } from "lucide-react";
import logo from "@/assets/logo.png";
import headshot from "@/assets/headshot2.png";
import receiptPreview from "@/assets/receipt-provider-preview.png";
import UserJourneyCarousel from "@/components/UserJourneyCarousel";

const CHECKOUT_URL = "/checkout";

// Page-scoped smooth scroll for internal section CTAs. Kept local (scrollIntoView,
// no global scroll-behavior) so the site-wide ScrollToTop route reset is unaffected.
const scrollToId = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function HsaFsa() {
  return (
    <div className="min-h-screen bg-white font-inter">
      <main>

        {/* SECTION 1 — HERO */}
        <section className="bg-white pt-20 pb-12 md:pt-28 md:pb-16">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3.5 mb-8">
                <img src={logo} alt="The Foot Capacity System" className="h-[34px] md:h-[42px] w-auto shrink-0" />
                <span className="text-slate-900 font-bold text-base md:text-lg leading-tight tracking-tight whitespace-nowrap">The Foot Capacity System</span>
              </div>

              <h1 className="font-display text-3xl md:text-[2.75rem] font-bold text-slate-900 leading-snug mb-5">
                Use Your HSA or FSA for the Foot Capacity System
              </h1>

              <p className="text-slate-600 text-lg leading-relaxed mb-5">
                Everything you need to understand the reimbursement process, the documentation you'll receive, and the steps to request reimbursement, all in one place.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-5">
                Whether you're considering Lifetime Access or the Monthly Recovery Plan, this page explains what to expect before and after your purchase.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                We've built this resource to answer the questions we hear most often, explain the reimbursement process in plain English, and show you exactly what you'll receive after your purchase.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                <a
                  href={CHECKOUT_URL}
                  target="_self"
                  rel="noopener noreferrer"
                  onClick={() => window.gtag?.('event', 'checkout_click', { event_category: 'conversion', event_label: 'hsa_hero' })}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors text-center"
                >
                  Start My Recovery →
                </a>
                <a
                  href="#how-reimbursement-works"
                  onClick={scrollToId("how-reimbursement-works")}
                  className="inline-flex items-center justify-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  See How Reimbursement Works →
                </a>
              </div>

              <div className="bg-slate-50 rounded-xl p-5">
                <p className="text-slate-900 font-semibold text-sm mb-1">Remember</p>
                <p className="text-slate-600 text-base leading-relaxed">
                  Every HSA and FSA plan is different. Your administrator makes the reimbursement decision, not the Foot Capacity System.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 — CAN I USE MY HSA OR FSA */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Can I Use My HSA or FSA?
              </h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed">
                <p>Many Health Savings Accounts (HSAs) and Flexible Spending Accounts (FSAs) may reimburse qualified healthcare expenses, depending on your individual plan.</p>
                <p>The Foot Capacity System was developed and is overseen by a licensed physical therapist and provides structured rehabilitation for foot and ankle conditions.</p>
                <p>Every purchase includes professional reimbursement documentation designed to support your reimbursement request.</p>
                <p>Because every HSA and FSA plan is different, your administrator determines eligibility and reimbursement according to your individual plan.</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 mt-8">
                <p className="text-slate-900 font-semibold text-sm mb-1">Remember</p>
                <p className="text-slate-600 text-base leading-relaxed">
                  Every HSA and FSA plan is different. Your administrator makes the reimbursement decision, not the Foot Capacity System.
                </p>
              </div>

              <div className="mt-8">
                <a href="#documentation" onClick={scrollToId("documentation")} className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  See Your Reimbursement Documentation →
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3 — MEET YOUR REIMBURSEMENT DOCUMENTATION */}
        <section id="documentation" className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Meet Your Reimbursement Documentation
              </h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed mb-10">
                <p>Immediately after your purchase, you'll receive your Receipt &amp; Provider Information PDF by email, usually within a few minutes.</p>
                <p>This professionally prepared document combines your purchase details with licensed provider credentials and a detailed service description, giving you the documentation commonly requested during the reimbursement process.</p>
              </div>

              <div className="flex justify-center mb-10">
                <img
                  src={receiptPreview}
                  alt="Sample Receipt & Provider Information PDF showing purchaser information, payment details, receipt number, licensed physical therapist credentials, NPI, Louisiana Physical Therapy License, and a detailed service description."
                  className="w-full max-w-lg rounded-2xl border border-slate-200 shadow-sm"
                />
              </div>

              <div className="bg-white rounded-2xl p-7 mb-6">
                <p className="text-slate-900 font-semibold text-base mb-4">Every document includes</p>
                <ul className="space-y-3">
                  {[
                    "Purchaser information",
                    "Payment information",
                    "Receipt number",
                    "Payment reference",
                    "Licensed physical therapist credentials",
                    "National Provider Identifier (NPI)",
                    "Louisiana Physical Therapy License",
                    "Detailed service description",
                    "Ready to submit with your reimbursement request",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={18} className="text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-slate-500 text-sm italic text-center max-w-xl mx-auto mb-8">
                Illustration shown with sample purchaser information. Your documentation will contain your own purchase and payment details.
              </p>

              <div>
                <a href="#how-reimbursement-works" onClick={scrollToId("how-reimbursement-works")} className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  See How to Request Reimbursement →
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4 — HOW TO REQUEST REIMBURSEMENT */}
        <section id="how-reimbursement-works" className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                How to Request Reimbursement
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-12">
                Requesting reimbursement is usually straightforward. While every HSA and FSA administrator has its own process, the general steps are similar.
              </p>

              <div className="flex flex-col md:flex-row md:gap-6">
                {[
                  { n: "1", title: "Purchase the Foot Capacity System", body: "Purchase either Lifetime Access or the Monthly Recovery Plan using any accepted payment method.", note: "You don't have to pay with your HSA or FSA card. Many plans allow you to request reimbursement after you've already made your purchase. Follow your administrator's requirements for your specific plan." },
                  { n: "2", title: "Receive Your Reimbursement Documentation", body: "Within minutes of completing your purchase, you'll automatically receive your Receipt & Provider Information PDF by email.", note: "Save this document for your records and for your reimbursement request." },
                  { n: "3", title: "Submit Your Request", body: "Submit your reimbursement documentation using the reimbursement process required by your HSA or FSA administrator.", note: "Some administrators provide an online portal, while others may require a reimbursement form. Follow the instructions provided by your individual plan." },
                  { n: "4", title: "Administrator Review", body: "Your administrator reviews your request according to your individual benefits plan.", note: "If additional documentation is requested, contact the Foot Capacity System support team first. We'll review the request with you and provide any additional documentation we reasonably can." },
                ].map((step) => (
                  <div
                    key={step.n}
                    className="flex-1 py-6 md:py-0 md:px-5 border-t md:border-t-0 md:border-l border-slate-200 first:border-t-0 first:md:border-l-0 first:md:pl-0 last:md:pr-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mb-4">{step.n}</div>
                    <p className="font-semibold text-slate-900 text-base mb-2">{step.title}</p>
                    <p className="text-slate-600 text-base leading-relaxed mb-3">{step.body}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.note}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 rounded-xl p-5 mt-12">
                <p className="text-slate-900 font-semibold text-sm mb-1">Remember</p>
                <p className="text-slate-600 text-base leading-relaxed">
                  The Foot Capacity System provides your reimbursement documentation. Your HSA or FSA administrator determines eligibility and reimbursement according to your individual plan.
                </p>
              </div>

              <div className="mt-8">
                <a href="#why-documentation-matters" onClick={scrollToId("why-documentation-matters")} className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Why This Documentation Matters →
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5 — WHY THIS DOCUMENTATION MATTERS */}
        <section id="why-documentation-matters" className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Why This Documentation Matters
              </h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed mb-10">
                <p>Most online purchases generate a basic payment receipt.</p>
                <p>That's usually enough for everyday purchases, but healthcare reimbursement requests often require additional information.</p>
                <p>That's why every Foot Capacity System purchase includes more than a standard receipt.</p>
                <p>You'll automatically receive Your Reimbursement Documentation, formally titled Receipt &amp; Provider Information, which combines purchaser information, payment details, licensed provider credentials, and a detailed service description in one professional document.</p>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-stretch">
                <div className="flex-1 bg-white rounded-2xl p-7">
                  <p className="font-bold text-slate-900 text-lg mb-4">Typical Online Receipt</p>
                  <ul className="space-y-3">
                    {["Purchase confirmation", "Payment amount", "Date of purchase", "Transaction ID"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check size={18} className="text-slate-300 shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-base leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 bg-blue-50 rounded-2xl p-7">
                  <p className="font-bold text-blue-600 text-lg mb-4">Your Reimbursement Documentation</p>
                  <ul className="space-y-3">
                    {["Purchaser information", "Payment information", "Receipt number", "Payment reference", "Licensed physical therapist credentials", "National Provider Identifier (NPI)", "Louisiana Physical Therapy License", "Detailed service description", "Documentation for your records"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check size={18} className="text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-base leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-slate-600 text-lg leading-relaxed mt-10">
                We've designed this documentation to help make the reimbursement process as straightforward as possible.
              </p>

              <div className="mt-8">
                <a href="#meet-the-pt" onClick={scrollToId("meet-the-pt")} className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Meet the Physical Therapist Behind the Program →
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6 — DEVELOPED BY A LICENSED PHYSICAL THERAPIST */}
        <section id="meet-the-pt" className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-8">
                Developed by a Licensed Physical Therapist
              </h2>

              <div className="flex flex-col md:flex-row gap-8 md:items-start mb-8">
                <img
                  src={headshot}
                  alt="Dr. Jonathan Schutza, PT, DPT, Cert. DN"
                  className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover shrink-0 mx-auto md:mx-0"
                />
                <div className="text-slate-600 text-lg leading-relaxed">
                  <p className="font-bold text-slate-900 text-xl mb-3">Dr. Jonathan Schutza, PT, DPT, Cert. DN</p>
                  <p className="mb-4">Dr. Jonathan Schutza earned his Doctor of Physical Therapy degree from LSU Health Shreveport in 2019 and is the founder of Back At It Physical Therapy. He specializes in evidence-based rehabilitation of musculoskeletal injuries, with a particular focus on foot and ankle conditions.</p>
                  <p>Dr. Schutza developed and oversees the Foot Capacity System, a structured foot and ankle rehabilitation program built around progressive loading, symptom tracking, and individualized progression to help users reduce pain and improve function.</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-3">Why provider credentials are included</h3>
                <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                  <p>The provider information included with your reimbursement documentation identifies the licensed physical therapist who developed and oversees the Foot Capacity System.</p>
                  <p>Some HSA and FSA administrators request provider credentials during the reimbursement review process. Including this information from the beginning helps ensure your documentation is as complete as possible.</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <p className="text-blue-700 font-semibold text-sm mb-1">Good to Know</p>
                <p className="text-slate-600 text-base leading-relaxed">
                  Your reimbursement documentation includes Dr. Schutza's National Provider Identifier (NPI) and Louisiana Physical Therapy License because some administrators request this information during the reimbursement review process.
                </p>
              </div>

              <div className="mt-8">
                <a href="#member-progress" onClick={scrollToId("member-progress")} className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  See Real Member Progress →
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 7 — REAL PROGRESS INSIDE THE FOOT CAPACITY SYSTEM */}
        <section id="member-progress" className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Real Progress Inside the Foot Capacity System
              </h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>Your reimbursement documentation supports your purchase.</p>
                <p>Your progress is what makes the investment worthwhile.</p>
                <p>Below are examples of real member progress tracked inside the Foot Capacity System.</p>
              </div>
            </motion.div>

            <div className="my-8">
              <UserJourneyCarousel />
            </div>

            <p className="text-slate-500 text-base leading-relaxed mb-8">
              These examples represent real member progress captured inside the Foot Capacity System. Individual results vary based on many factors, including starting condition, consistency, and adherence to the program.
            </p>

            <a
              href={CHECKOUT_URL}
              target="_self"
              rel="noopener noreferrer"
              onClick={() => window.gtag?.('event', 'checkout_click', { event_category: 'conversion', event_label: 'hsa_progress' })}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Get Lifetime Access →
            </a>
          </div>
        </section>

        {/* SECTION 8 — WHY MANY PEOPLE CHOOSE TO USE THEIR HSA OR FSA */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Why Many People Choose to Use Their HSA or FSA
              </h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed mb-8">
                <p>Many people contribute money to an HSA or FSA before taxes are deducted from their paycheck.</p>
                <p>Because those dollars are generally contributed before taxes, using them for eligible healthcare expenses can cost less than paying with money that's already been taxed.</p>
                <p>For example, someone whose combined federal and state tax savings are approximately 24% could reduce the effective cost of a $397 Lifetime Access purchase by about $95.</p>
                <p>Actual savings vary based on your individual tax situation and your HSA or FSA plan.</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <p className="text-blue-700 font-semibold text-sm mb-1">Good to Know</p>
                <p className="text-slate-600 text-base leading-relaxed">
                  You don't receive a discount from the Foot Capacity System. Any potential savings come from how HSA or FSA funds are treated under your individual benefits plan and tax situation.
                </p>
              </div>

              <div className="mt-8">
                <a href="#common-situations" onClick={scrollToId("common-situations")} className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Common Situations →
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 9 — COMMON SITUATIONS */}
        <section id="common-situations" className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
              Common Situations
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Every HSA and FSA administrator has its own reimbursement process. Here are answers to some of the situations people ask us about most often.
            </p>

            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="situation-1" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">HSA or FSA card declined?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">A declined HSA or FSA card doesn't necessarily mean your purchase isn't eligible for reimbursement. Many plans allow you to purchase using another payment method and request reimbursement afterward. Follow your administrator's reimbursement process for your individual plan.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="situation-2" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Paid with a personal credit card?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Many HSA and FSA plans allow reimbursement after you've already completed your purchase. Your reimbursement documentation is designed to support that reimbursement request.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="situation-3" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Lost your reimbursement documentation?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">No problem. Contact the Foot Capacity System support team and we'll help you obtain another copy of your Receipt &amp; Provider Information PDF.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="situation-4" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Administrator requested more information?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Contact us first. We'll review the request with you and provide any additional documentation we reasonably can. Some documentation may need to come from your own treating healthcare provider if your administrator requires it.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="situation-5" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Reimbursement request wasn't approved?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Every administrator has different reimbursement requirements. If your administrator explains why your request wasn't approved, let us know. We'll review the reason with you and determine whether additional documentation may be available.</AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="bg-blue-50 rounded-xl p-5 mt-8">
              <p className="text-blue-700 font-semibold text-sm mb-1">Good to Know</p>
              <p className="text-slate-600 text-base leading-relaxed">
                If you're unsure what your administrator is requesting, contact us before submitting additional paperwork. We'll help you understand what documentation you already have and whether anything else may be appropriate.
              </p>
            </div>

            <div className="mt-8">
              <a href="#faq" onClick={scrollToId("faq")} className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Browse Frequently Asked Questions →
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 10 — WHY WE BUILT THIS RESOURCE */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Why We Built This Resource
              </h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed">
                <p>We know HSA and FSA reimbursement can feel confusing.</p>
                <p>That's why we created this resource, to explain the process in plain English, show you exactly what documentation you'll receive, and answer the questions we hear most often before you purchase.</p>
                <p>If you still need help after reading through this page, we're happy to point you in the right direction.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 11 — FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-8">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-3">
              <h3 className="font-display text-lg font-bold text-slate-900 mb-3">Before You Purchase</h3>
              <AccordionItem value="faq-1" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Should I contact my administrator before purchasing?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">You don't have to, but you're always welcome to contact your HSA or FSA administrator if you'd like to better understand your individual plan's reimbursement process.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">What information should I have ready?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">The most helpful information is simply knowing how your administrator handles reimbursement requests. Every Foot Capacity System purchase includes your Receipt &amp; Provider Information PDF to support that process.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Can I share this page with my HSA or FSA administrator?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Yes. This page explains the reimbursement documentation you'll receive and how the process generally works.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">What documentation will I receive after purchase?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Immediately after purchase you'll receive your Receipt &amp; Provider Information PDF by email. This document includes purchaser information, payment details, provider credentials, receipt information, and a detailed service description.</AccordionContent>
              </AccordionItem>

              <h3 className="font-display text-lg font-bold text-slate-900 mt-8 mb-3">Eligibility</h3>
              <AccordionItem value="faq-5" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Can I use my HSA?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Many HSA plans reimburse qualified healthcare expenses. Your administrator determines eligibility according to your individual plan.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-6" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Can I use my FSA?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Many FSA plans reimburse qualified healthcare expenses. Your administrator determines eligibility according to your individual plan.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-7" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Who decides eligibility?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Your HSA or FSA administrator. The Foot Capacity System cannot approve or deny reimbursement.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-8" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Does the Foot Capacity System guarantee reimbursement?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">No. Reimbursement decisions are made solely by your HSA or FSA administrator.</AccordionContent>
              </AccordionItem>

              <h3 className="font-display text-lg font-bold text-slate-900 mt-8 mb-3">Purchasing</h3>
              <AccordionItem value="faq-9" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Do I have to use my HSA or FSA card?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">No. Many plans allow reimbursement after purchase.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-10" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Can I pay with my personal credit card?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Yes. Many administrators allow reimbursement after you've already completed your purchase.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-11" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Does Lifetime Access differ from the Monthly Recovery Plan?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Eligibility decisions are made by your administrator according to your individual benefits plan.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-12" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Can I submit my reimbursement request later?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Submission deadlines vary by administrator. Follow your individual plan's reimbursement requirements.</AccordionContent>
              </AccordionItem>

              <h3 className="font-display text-lg font-bold text-slate-900 mt-8 mb-3">Your Reimbursement Documentation</h3>
              <AccordionItem value="faq-13" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">What is included?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Your Receipt &amp; Provider Information PDF includes purchaser information, payment information, receipt number, payment reference, provider credentials, NPI, Louisiana Physical Therapy License, and a detailed service description.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-14" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Why is Dr. Jonathan's information included?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Some administrators request provider information when reviewing reimbursement requests. Your documentation identifies the licensed physical therapist who developed and oversees the Foot Capacity System.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-15" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">What is an NPI?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">An NPI is a National Provider Identifier assigned to healthcare providers in the United States.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-16" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Why is a physical therapy license included?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Some administrators request provider credentials during reimbursement review.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-17" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Can I obtain another copy?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Yes. Contact the Foot Capacity System support team and we'll help you obtain another copy.</AccordionContent>
              </AccordionItem>

              <h3 className="font-display text-lg font-bold text-slate-900 mt-8 mb-3">Reimbursement</h3>
              <AccordionItem value="faq-18" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">How do I request reimbursement?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Submit your reimbursement documentation according to the instructions provided by your HSA or FSA administrator.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-19" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">How long does reimbursement usually take?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Processing times vary by administrator.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-20" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">What if additional documentation is requested?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Contact us first. We'll review the request and provide any additional documentation we reasonably can.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-21" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Why do I receive more than a standard receipt?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Healthcare reimbursement requests often require more information than a standard online purchase receipt. That's why every purchase includes a professionally prepared Receipt &amp; Provider Information PDF.</AccordionContent>
              </AccordionItem>

              <h3 className="font-display text-lg font-bold text-slate-900 mt-8 mb-3">Support</h3>
              <AccordionItem value="faq-22" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Who should I contact?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Questions about reimbursement decisions should be directed to your HSA or FSA administrator. Questions about your purchase or documentation should be directed to the Foot Capacity System support team.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* SECTION 12 — INVEST IN YOUR RECOVERY WITH CONFIDENCE */}
        <section className="py-16 md:py-24 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">Invest in Your Recovery with Confidence</p>
              <h2 className="font-display text-3xl md:text-[2.5rem] font-bold text-slate-900 leading-tight mb-6">
                Everything You Need. Nothing You Don't.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Whether you're using HSA or FSA funds, paying with a personal credit card, or simply learning more about the reimbursement process, we've designed the Foot Capacity System to make every step as straightforward as possible.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  "One purchase. Lifetime access. All future updates included.",
                  "Your Reimbursement Documentation emailed automatically after purchase.",
                  "Developed by a licensed physical therapist.",
                  "30-Day Money-Back Guarantee.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={20} className="text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-lg leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={CHECKOUT_URL}
                target="_self"
                rel="noopener noreferrer"
                onClick={() => window.gtag?.('event', 'checkout_click', { event_category: 'conversion', event_label: 'hsa_final' })}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-5 rounded-xl text-xl transition-colors"
              >
                Invest in My Recovery →
              </a>
            </motion.div>
          </div>
        </section>

        {/* FOOTER DISCLAIMER */}
        <section className="py-10 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-slate-900 font-semibold text-sm mb-2">Important</p>
            <div className="space-y-3 text-slate-500 text-sm leading-relaxed">
              <p>The Foot Capacity System cannot determine HSA or FSA eligibility or reimbursement.</p>
              <p>Eligibility, documentation requirements, and reimbursement decisions are determined solely by your HSA or FSA administrator and your individual benefits plan.</p>
              <p>This page is provided for educational purposes and should not be considered medical, legal, tax, insurance, or financial advice.</p>
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
    </div>
  );
}
