import { motion } from "framer-motion";
import { Check } from "lucide-react";
import logo from "@/assets/logo.png";
import headshot from "@/assets/dj-head-2.jpg";

const EXPERTISE = [
  "Plantar fasciitis and plantar fasciopathy",
  "Heel pain",
  "Foot and ankle rehabilitation",
  "Foot and ankle mechanics",
  "Movement rehabilitation",
  "Therapeutic exercise progression",
  "Injury recovery",
  "Progressive loading and capacity development",
  "Flare-up management",
  "Return to running, exercise, and meaningful activity",
];

const CREDENTIALS = [
  "Doctor of Physical Therapy — LSU Health Sciences Center Shreveport, School of Allied Health Professions",
  "Licensed Physical Therapist — Louisiana Physical Therapy License #10272, issued by the Louisiana Physical Therapy Board",
  "National Provider Identifier — NPI 1487332854 (verifiable in the public CMS NPPES registry)",
  "Certified in Dry Needling, 2019",
  "In clinical practice since 2019",
  "Founder and Physical Therapist — Back At It Physical Therapy, LLC",
  "Creator — Foot Capacity System",
];

const REVIEWS = [
  {
    name: "Carol-Anne",
    body: "The best strength building course I have ever done for my plantar fasciitis issues. Issues that I have had for 5+ years. I have tried so many things. Some helped a bit but Dr Schutza's strength building programme is outstanding and in a league of its own. I am in weeks 4 and have experienced a massive difference in my feet. Dr Schutza has designed an amazing app with superb exercises. He provides oversight on one's progress allowing one to proceed with confidence. Simply outstanding. If I could give a score of 10 stars I would!",
  },
  {
    name: "Karen",
    body: "Dealing with plantar fasciitis pain since October, seeing a doctor, going to PT, I was fed up. I searched online for exercises and came across Dr. Jonathan's site. I started following his exercise suggestions before the Foot Capacity System because I liked his demeanor. When he presented the system, I admit, I was skeptical; I gave the Trial a chance and was impressed. Along with the progression of exercises, it's the accountability and consistency that are making a big difference. My pain is minimal compared to where I started. Currently in Phase 2 - week 4, and seeing my strength and mobility improve is encouraging. I am impressed with the option to continue with this program, or never really leave, should the pain and limitations return. I feel confident that this is the right approach for me. Thank you so much for this program!",
  },
  {
    name: "Brittany",
    body: "I am so happy that I found Dr Jonathan's program and app! I have been at it 3 weeks and have had so much progress already. I have gone from hobbling around all day everyday for the last 4 months to walking normally with very little pain. I was constantly looking online for exercises and tricks to help my foot feel better - there is so much out there and so much conflicting advice. It wasn't until I started using The Foot Capacity System that I really started getting better. The app is clear and straightforward and adjusts to how my foot feels each day. I do my exercises each day and then move on with my day knowing I've done what I need to so that I keep progressing. I have gained so much confidence and strength already. I know I am going to be able to meet my goal. Thank you Dr. Jonathan!",
  },
];

export default function DrJonathanSchutza() {
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
              <div className="flex items-center gap-3.5 mb-10">
                <img src={logo} alt="The Foot Capacity System" className="h-[34px] md:h-[42px] w-auto shrink-0" />
                <span className="text-slate-900 font-bold text-base md:text-lg leading-tight tracking-tight whitespace-nowrap">The Foot Capacity System</span>
              </div>

              <img
                src={headshot}
                alt="Dr. Jonathan Schutza, PT, DPT"
                className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover shadow-sm mb-8"
              />

              <h1 className="font-display text-3xl md:text-[2.75rem] font-bold text-slate-900 leading-snug mb-5">
                Dr. Jonathan Schutza, PT, DPT
              </h1>

              <p className="text-slate-600 text-lg leading-relaxed">
                Doctor of Physical Therapy with emphasis in foot and ankle rehabilitation, movement, and the Foot Capacity System.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 — ABOUT */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                About Dr. Jonathan Schutza
              </h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed">
                <p>Dr. Jonathan Schutza is a Doctor of Physical Therapy and licensed physical therapist practicing in the Shreveport–Bossier City area of Louisiana. At Back At It Physical Therapy, he treats a wide range of musculoskeletal conditions, with a particular emphasis on foot and ankle pain, movement limitations, and progressive rehabilitation.</p>
                <p>He earned his Doctor of Physical Therapy degree from LSU Health Sciences Center Shreveport and has practiced since 2019. He is also certified in dry needling.</p>
                <p>Dr. Schutza's approach emphasizes active rehabilitation through structured, progressive therapeutic exercise rather than long-term dependence on passive treatment. His goal is to help each person gradually build the strength, mobility, confidence, and physical capacity needed to return to meaningful activity.</p>
                <p>Treatment is guided by how the individual responds over time. Symptoms, activity levels, exercise tolerance, and functional progress are monitored so the rehabilitation plan can be adjusted as capacity improves. Flare-ups are treated as a normal and manageable part of recovery—not automatically as evidence of new injury or damage.</p>
                <p>This clinical methodology became the foundation of the Foot Capacity System, a structured digital rehabilitation program developed to help people work through persistent heel pain and plantar fasciitis with greater clarity. The system combines guided exercise instruction, symptom and activity tracking, progress monitoring, flare-up support, and adaptive rehabilitation planning designed to restore movement and build long-term resilience.</p>
                <p>Dr. Schutza's educational articles, videos, and clinical resources reflect the same principles that guide his patient care: understand the problem, manage symptoms appropriately, progressively rebuild capacity, and make decisions based on the body's response.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3 — EXPERIENCE */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Experience
              </h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed">
                <p>Early in his career, Dr. Schutza worked in the physical therapy department of a Level I trauma center within a teaching hospital. There, he had the opportunity to work with athletes of all ages and help rehabilitate a wide range of complex orthopedic conditions—from modern post-surgical cases following severe trauma to competitive athletes working toward a safe return to sport.</p>
                <p>This was one of the most challenging and rewarding periods of his clinical practice. He was regularly exposed to complicated injuries, demanding rehabilitation timelines, and cases that required careful problem-solving, collaboration, and continual adaptation. Working within a teaching hospital also allowed him to practice alongside and learn from some of the area's leading surgeons and medical professionals.</p>
                <p>That experience helped shape the principles that continue to guide his work today: assess the individual in front of you, understand their current capacity, create a structured plan, monitor how they respond, and progress rehabilitation based on function rather than a rigid timeline.</p>
                <p>Dr. Schutza later applied these lessons to the systems he uses at Back At It Physical Therapy and to the development of the Foot Capacity System. Both were built around the same clinical foundation—structured progression, thoughtful decision-making, symptom and activity monitoring, and helping people rebuild the physical capacity and confidence required to return to meaningful activity.</p>
                <p>The Foot Capacity System was also shaped by Dr. Schutza's experience treating people with persistent heel pain who had become trapped between temporary symptom relief and a lack of clear direction. Many had been told to rest, stretch, change shoes, or avoid painful activity, but they had never been given a structured process for rebuilding what their foot needed to tolerate.</p>
                <p>His work with plantar fasciitis and other foot and ankle conditions reinforced that recovery is rarely about finding one perfect exercise or treatment. It is about understanding the person's current capacity, introducing the appropriate amount of movement and load, monitoring the response, and progressing at a pace the body can tolerate.</p>
                <p>He created the Foot Capacity System to make that process easier to understand and follow. It gives people a structured path forward while recognizing that progress is rarely perfectly linear and that flare-ups, uncertainty, and temporary setbacks can be managed without abandoning the rehabilitation process.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4 — AREAS OF EXPERTISE */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Areas of Expertise
              </h2>
              <div className="bg-slate-50 rounded-2xl p-7">
                <ul className="space-y-3">
                  {EXPERTISE.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={18} className="text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5 — PROFESSIONAL CREDENTIALS */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Professional Credentials
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200 p-7">
                <ul className="space-y-3">
                  {CREDENTIALS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={18} className="text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6 — WHAT PATIENTS SAY */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-8">
                What Patients Say
              </h2>
              <div className="space-y-4">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 shadow-sm px-6 py-6">
                    <p className="text-slate-900 text-sm font-bold">{r.name}</p>
                    <p className="text-amber-400 text-sm tracking-wide mb-3">★★★★★</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{r.body}</p>
                  </div>
                ))}

                <div className="rounded-2xl border border-slate-200 shadow-sm px-6 py-6">
                  <div className="text-slate-600 text-sm leading-relaxed space-y-2">
                    <p>After my first week, I wasn&apos;t completely sure yet.</p>
                    <p>Seven weeks later, my pain has gone from a 5/10 to about a 1/10.</p>
                    <p>I finally feel like I&apos;m making real progress instead of just managing the pain.</p>
                  </div>
                  <p className="text-slate-900 text-sm font-semibold mt-4">— Jana D.</p>
                  <p className="text-slate-400 text-xs">Original trial member</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 7 — ARTICLES */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Articles by Dr. Schutza
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Dr. Schutza&apos;s published articles are coming soon.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 8 — CONNECT */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Connect
              </h2>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.linkedin.com/in/jonathan-schutza-b05838a1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  LinkedIn →
                </a>
                <a
                  href="https://www.instagram.com/dr.schutza.pt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Instagram →
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61551075877536"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Facebook →
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 9 — PRACTICE & CONTACT */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Practice &amp; Contact
              </h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  Back At It Physical Therapy, LLC —{" "}
                  <a
                    href="https://backatitpt.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    backatitpt.com
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:SchutzaPT@gmail.com"
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    SchutzaPT@gmail.com
                  </a>
                </p>
              </div>
            </motion.div>
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
            <a href="https://app.fixyourmovement.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Patient App</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
