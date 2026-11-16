// Approved named testimonials for the /testimonials wall (Charles 2026-11-16; SPEC-ai-discoverability-fixes
// item 3: label each by source + carry "Selected examples shared with permission; individual results vary.").
//
// EVERY quote below is copied word for word from text the site already publishes — never rewrite,
// shorten or embellish one here. The comment on each entry names where the live copy lives.
//   - Homepage block (src/pages/NewIndex.tsx, "What Patients Shared After Following The System" + the
//     Dee Bell anchor quote): Dr. Schutza confirmed 2026-11-13 every homepage quote is from an app member.
//   - Other entries: the source page itself frames them as members (purchase/joining dates, "What Members
//     Are Saying", "Member testimonials").
// NOT included on purpose: the UserJourneyCarousel ALIASED progress stories (aliases, not named
// testimonials), and anything whose source is unconfirmed — see the build report.
//
// The homepage still renders its own inline copy; this module duplicates the text only.

export type TestimonialSource = "app_member" | "clinic_patient" | "content_follower";

export const SOURCE_LABEL: Record<TestimonialSource, string> = {
  app_member: "App member",
  clinic_patient: "Clinic patient",
  content_follower: "Content follower",
};

export type Testimonial = {
  id: string;
  name: string;
  source: TestimonialSource;
  /** Exact published text. Paragraphs separated by a blank line ("\n\n"). */
  quote: string;
  /** Optional exact substring of `quote` the live page renders in bold. */
  emphasis?: string;
  /** Optional exact follow-on line the live page renders on its own (bold). */
  closing?: string;
  /** Optional exact date/context line the live page shows under the quote. */
  meta?: string;
};

export const PERMISSION_LINE = "Selected examples shared with permission; individual results vary.";

export const TESTIMONIALS: Testimonial[] = [
  // src/pages/NewIndex.tsx — "Testimonial anchor" card
  {
    id: "dee-bell",
    name: "Dee Bell",
    source: "app_member",
    quote:
      "I had heel pain for over five years. I tried everything — orthotics, steroid injections, stretching, different doctors. Nothing worked long-term. Dr. Jonathan Schutza was the first to explain the real cause of my pain and create a plan that finally worked. He's not just fixing the pain — he's teaching me how to stay better.",
  },
  // src/pages/NewIndex.tsx — featured testimonial
  {
    id: "lorenzo-luongo",
    name: "Lorenzo Luongo",
    source: "app_member",
    quote:
      "I've been struggling with plantar fasciitis for 3 years, tried cortisone, shockwave, thousands of different shoes. Until December when I saw one of your fascia strengthening exercises. For the first time it's been 2 weeks without pain.",
    closing: "It's unreal.",
  },
  // src/pages/ColdStart.tsx — TESTIMONIALS (also src/pages/DrJonathanSchutza.tsx + src/pages/Results.tsx REVIEWS)
  {
    id: "brittany",
    name: "Brittany",
    source: "app_member",
    quote:
      "I am so happy that I found Dr Jonathan's program and app! I have been at it 3 weeks and have had so much progress already. I have gone from hobbling around all day everyday for the last 4 months to walking normally with very little pain. I was constantly looking online for exercises and tricks to help my foot feel better - there is so much out there and so much conflicting advice. It wasn't until I started using The Foot Capacity System that I really started getting better. The app is clear and straightforward and adjusts to how my foot feels each day. I do my exercises each day and then move on with my day knowing I've done what I need to so that I keep progressing. I have gained so much confidence and strength already. I know I am going to be able to meet my goal. Thank you Dr. Jonathan!",
    meta: "Written July 15, 2026 · 15 days after purchase",
  },
  // src/pages/ColdStart.tsx — TESTIMONIALS
  {
    id: "jocelyn-lavoie",
    name: "Jocelyn Lavoie",
    source: "app_member",
    quote:
      "I feel like I should have a party. Today was my first full day with next to no pain. At most 0.5/10 when I first got up this morning. First time in over a year!! It's so weird that my brain isn't really processing it.\n\nAll that to say a HUGE THANK YOU for everything!! What you've built here is amazing, it works and I couldn't be happier with the results up to now. Thank you!!",
    meta: "Report written August 23, 2026 · 10 weeks after purchase",
  },
  // src/pages/ColdStart.tsx — TESTIMONIALS
  {
    id: "karen-stone",
    name: "Karen Stone",
    source: "app_member",
    quote:
      "I just finished a spin class and during the class I realized I had no pain.\n\nI have been taking a HIIT class, doing my regular workouts, climbing stairs, biking, walking...all pain free.\n\nFor some reason it hit me this morning.\n\nThank you so much for this program!",
    meta: "Feedback shared September 26, 2026 · Nearly 3 months after joining",
  },
  // src/pages/ColdStart.tsx — hero proof card (published abbreviated)
  {
    id: "michelle-shabason",
    name: "Michelle Shabason",
    source: "app_member",
    quote:
      "Huge improvements: almost no morning pain, walking/standing much longer, including at work, and much more functional around the house.",
    meta: "September 8, 2026 · 10 weeks after purchase",
  },
  // src/pages/DrJonathanSchutza.tsx + src/pages/Results.tsx — REVIEWS
  {
    id: "carol-anne",
    name: "Carol-Anne",
    source: "app_member",
    quote:
      "The best strength building course I have ever done for my plantar fasciitis issues. Issues that I have had for 5+ years. I have tried so many things. Some helped a bit but Dr Schutza's strength building programme is outstanding and in a league of its own. I am in weeks 4 and have experienced a massive difference in my feet. Dr Schutza has designed an amazing app with superb exercises. He provides oversight on one's progress allowing one to proceed with confidence. Simply outstanding. If I could give a score of 10 stars I would!",
  },
  // src/pages/DrJonathanSchutza.tsx + src/pages/Results.tsx — REVIEWS
  {
    id: "karen",
    name: "Karen",
    source: "app_member",
    quote:
      "Dealing with plantar fasciitis pain since October, seeing a doctor, going to PT, I was fed up. I searched online for exercises and came across Dr. Jonathan's site. I started following his exercise suggestions before the Foot Capacity System because I liked his demeanor. When he presented the system, I admit, I was skeptical; I gave the Trial a chance and was impressed. Along with the progression of exercises, it's the accountability and consistency that are making a big difference. My pain is minimal compared to where I started. Currently in Phase 2 - week 4, and seeing my strength and mobility improve is encouraging. I am impressed with the option to continue with this program, or never really leave, should the pain and limitations return. I feel confident that this is the right approach for me. Thank you so much for this program!",
  },
  // src/pages/NewIndex.tsx — secondary cards
  {
    id: "lory-tubbs",
    name: "Lory Tubbs",
    source: "app_member",
    quote:
      "Over the years I've had numerous injuries requiring physical therapy. PT would often improve the immediate problem, but never addressed the deeper issues. Jonathan assessed my gait and began a regimen that got to the root of the problem — basically teaching me how to walk again.",
    emphasis: "teaching me how to walk again.",
  },
  {
    id: "wendy-peterman",
    name: "Wendy Peterman",
    source: "app_member",
    quote:
      "I tore a tendon in my plantar fascia in January and developed a DVT in the same leg in March. In May, I started with Dr. Jonathan Schutza and had remarkable progress. Through his guided strengthening program, I was able to walk with better mobility and less pain.",
    emphasis: "remarkable progress.",
  },
  {
    id: "debbie-wisenor",
    name: "Debbie Wisenor",
    source: "app_member",
    quote:
      "Dr. Jonathan Schutza is a truly exceptional Physical Therapist whose innovative approach has made a significant impact on my recovery. What sets him apart is recording himself demonstrating the correct form for every exercise — ensuring clarity when I continue rehabilitation at home.",
    emphasis: "recording himself demonstrating the correct form for every exercise",
  },
  {
    id: "vicbre415",
    name: "@vicbre415",
    source: "app_member",
    quote:
      "You have helped me and my chronically painful foot by giving me the language and background knowledge to talk to my doctor and my PT. It has had an impact on my recovery for sure. Also — good reminders for me to keep practicing!",
    emphasis: "the language and background knowledge to talk to my doctor and my PT.",
  },
  // src/pages/NewIndex.tsx — additional cards
  {
    id: "zaiden-peterson",
    name: "Zaiden Peterson",
    source: "app_member",
    quote:
      "I have had this pain since the beginning of cross country season and it has been bad enough that I couldn't run for a few meets. I talked to my athletic trainer but never got away from it — and this just gave me relief.",
    emphasis: "and this just gave me relief.",
  },
  {
    id: "youngcarol",
    name: "@youngcarol",
    source: "app_member",
    quote:
      "I've suffered a lisfranc injury requiring surgery and I'm in rehab regaining all the strength I've lost. Very clear and exercises are achievable. I'm from Australia — thanks for your work.",
    emphasis: "Very clear and exercises are achievable.",
  },
  {
    id: "bogiegrl",
    name: "@bogiegrl",
    source: "app_member",
    quote:
      "You are the most positive, supportive physical therapist I have come across on social media. The fact that you focus on foot and ankle rehab is a bonus. You have added greatly to my Post Tibial Tendonitis recovery.",
    emphasis: "The fact that you focus on foot and ankle rehab is a bonus.",
  },
];
