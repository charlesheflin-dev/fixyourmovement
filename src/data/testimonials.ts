// Approved named testimonials for the /testimonials wall (Charles 2026-11-16; SPEC-ai-discoverability-fixes
// item 3: label each by source + carry "Selected examples shared with permission; individual results vary.").
//
// EVERY non-submitted quote below is copied word for word from text the site already publishes — never rewrite,
// shorten or embellish one here. The comment on each entry names where the live copy lives.
//   - Homepage block (src/pages/NewIndex.tsx, "What Patients Shared After Following The System" + the
//     Dee Bell anchor quote): Dr. Schutza confirmed 2026-11-13 every homepage quote is from an app member.
//     SUPERSEDED 2026-11-16 for nine of them by the original screenshots/emails (see SUBMITTED note below).
//   - Other entries: the source page itself frames them as members (purchase/joining dates, "What Members
//     Are Saying", "Member testimonials").
// NOT included on purpose: the UserJourneyCarousel ALIASED progress stories (aliases, not named
// testimonials), and anything whose source is unconfirmed — see the build report.
//
// The homepage still renders its own inline copy; this module duplicates the text only.
//
// SUBMITTED entries (origin: "submitted", Charles 2026-11-16): member stories transcribed word for word
// from the testimonial screenshots/cards Charles supplied (folders a/ and b/). They have no live source
// page, so the verbatim-vs-site test skips them; the comment on each names the source file.
// Source labels re-checked against that evidence 2026-11-16: in-person clinic patients -> clinic_patient;
// Instagram DMs/comments about his free content (not the program) -> content_follower.

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
  /** "submitted" = transcribed from a supplied screenshot/card; no live source page to verify against.
   *  "archived" = copied verbatim from a page that no longer hard-codes it (the /lp/cold-start carousel
   *  before 2026-11-19, website commit b79a019); this entry is now the record. */
  origin?: "submitted" | "archived";
};

export type VideoTestimonial = {
  id: string;
  name: string;
  /** Cloudflare Stream video id (vertical 9:16). */
  streamId: string;
  /** Omitted when the source is not confirmed - then only the name is shown. */
  source?: TestimonialSource;
};

export const STREAM_CUSTOMER = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com";

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  // a/Jana Vid Testimonial.mov
  { id: "jana-video", name: "Jana D.", streamId: "4ba44ab63e66bdea4ec749790f5b69e0", source: "app_member" },
  // b/David Lopez 1.MOV / 2.MOV - source unknown, name only
  { id: "david-lopez-video", name: "David Lopez", streamId: "64b78309847b82f33fee69d2fa7abe73" },
];

export const PERMISSION_LINE = "Selected examples shared with permission; individual results vary.";

export const TESTIMONIALS: Testimonial[] = [
  // ── App members (newest / strongest long stories first) ──
  // SUBMITTED — a/Jana.png (same review in a/Jana Dunkley Testimonials.docx, which carries "Original trial member")
  {
    id: "jana-d",
    name: "Jana D.",
    source: "app_member",
    origin: "submitted",
    quote:
      "As a busy mom of three, I honestly didn't know if I'd ever get rid of my plantar fasciitis. It started after I had my third baby, and after dealing with it for almost two years, I was getting pretty discouraged. I even went through other physical therapy programs, but it just didn't get me where I wanted to be.\n\nThen I found Dr. Schutza's Foot Capacity Program, and it's been such a different experience. I'm about seven weeks in, and my pain has gone from around a 5/10 to about a 1/10. I finally feel like I'm making real progress instead of just managing the pain. As long as I keep up with the exercises, I'm confident this is something I'm actually going to beat.\n\nOne of the biggest reasons this program works for me is that it fits into real life. I can do the exercises at home while my kids are playing, and I don't have to find childcare or drive to appointments. That alone has made it so much easier to stay consistent.\n\nI also love that if I have a question or something doesn't feel right, I can message Dr. Schutza through the app, and he always gets back to me quickly. Having that kind of support has made a huge difference.\n\nI've tried other programs that focused on stretching or temporary relief, but this is the first one that's really helped me build the strength and capacity my feet were missing. I'm so grateful I found this program, and I'd recommend it to anyone who's been struggling with plantar fasciitis and feels like they've tried everything.",
    meta: "Original trial member",
  },
  // ARCHIVED — was src/pages/ColdStart.tsx TESTIMONIALS (carousel) until 2026-11-19 (b79a019)
  {
    id: "jocelyn-lavoie",
    name: "Jocelyn Lavoie",
    source: "app_member",
    origin: "archived",
    quote:
      "I feel like I should have a party. Today was my first full day with next to no pain. At most 0.5/10 when I first got up this morning. First time in over a year!! It's so weird that my brain isn't really processing it.\n\nAll that to say a HUGE THANK YOU for everything!! What you've built here is amazing, it works and I couldn't be happier with the results up to now. Thank you!!",
    meta: "Report written August 23, 2026 · 10 weeks after purchase",
  },
  // ARCHIVED meta — quote is also in src/pages/DrJonathanSchutza.tsx + src/pages/Results.tsx REVIEWS; the meta line
  // lived only in the /lp/cold-start carousel until 2026-11-19 (b79a019)
  {
    id: "brittany",
    name: "Brittany",
    source: "app_member",
    origin: "archived",
    quote:
      "I am so happy that I found Dr Jonathan's program and app! I have been at it 3 weeks and have had so much progress already. I have gone from hobbling around all day everyday for the last 4 months to walking normally with very little pain. I was constantly looking online for exercises and tricks to help my foot feel better - there is so much out there and so much conflicting advice. It wasn't until I started using The Foot Capacity System that I really started getting better. The app is clear and straightforward and adjusts to how my foot feels each day. I do my exercises each day and then move on with my day knowing I've done what I need to so that I keep progressing. I have gained so much confidence and strength already. I know I am going to be able to meet my goal. Thank you Dr. Jonathan!",
    meta: "Written July 15, 2026 · 15 days after purchase",
  },
  // SUBMITTED — a/Sara Testimonial.png
  {
    id: "sara-lozano-arcas",
    name: "Sara Lozano Arcas",
    source: "app_member",
    origin: "submitted",
    quote:
      "To those who are thinking about joining the programme: I have been on it for 7 weeks and after 2 years of plantar fasciitis the pain is gone. I just wish I had found this man earlier. ❤️ I had my doubts! Then I saw that it worked, so I really felt that I had to stay on. I wish I had gone for the lifetime membership from the beginning.\n\nI have nothing but words of praise and appreciation for him.\n\nKind of a hero of mine.",
    meta: "Report written August 30, 2026 · 7 weeks after purchase",
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
  // SUBMITTED — b/lisa-padgett.png
  {
    id: "lisa-padgett",
    name: "Lisa Padgett",
    source: "app_member",
    origin: "submitted",
    quote:
      "When I went to an orthopedic surgeon for imaging and to confirm I had PF, but no tears, he said it takes 2 years for PF to \"burn itself out\" for most women in their 50s, and if it didn't. heal on it's own I had a couple of surgical options. At that time, I was about 1.5 years in (after a cortisone shot, many orthotics, some PT, etc.) and thought I would try PT *one more time.* Your Instagram account popping up in my feed was a timely answer to this. PT via a responsive app really helped me stick to the program and can't believe how far I've come in 11 weeks! I feel like I may have been pushed too far too soon in past PT rounds which was discouraging. The cost of in-person PT would have probably kept me from sticking with it this long. The app was very affordable in comparison. It's also a great solution for people like me who live over 1 hour from a medical center. I'm in it for the long haul to maintain healthy feet.",
  },
  // ARCHIVED — was src/pages/ColdStart.tsx TESTIMONIALS (carousel) until 2026-11-19 (b79a019); now shown in that carousel from this entry
  {
    id: "karen-stone",
    name: "Karen Stone",
    source: "app_member",
    origin: "archived",
    quote:
      "I just finished a spin class and during the class I realized I had no pain.\n\nI have been taking a HIIT class, doing my regular workouts, climbing stairs, biking, walking...all pain free.\n\nFor some reason it hit me this morning.\n\nThank you so much for this program!",
    meta: "Feedback shared September 26, 2026 · Nearly 3 months after joining",
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
  // SUBMITTED — a/Tucker family testimonial.png (card; original Instagram comment: a/2026-08-27_7-54-21.png)
  {
    id: "tucker-family-farms",
    name: "@tucker_family_farms",
    source: "app_member",
    origin: "submitted",
    quote:
      "As someone who has been doing this for 7 weeks, I can tell you it's made a HUGE difference for me. It's starts slow but after 3–4 weeks you really notice the difference. My pain and mobility are much better (factor of 10). Frankly I was a little despondent before I started and still into week 2/3. I think the unlock is you have to do the exercises every day to build strength. Yes btw this is a real post. I am a legit paying subscriber. It's been well worth the $. And this is, I think, the only online endorsement I've ever done. All the best to all of you out there. Hope this or something else works for you.",
  },
  // SUBMITTED — b/rae-testimonial.png (her in-app message only; she wrote "that's fine to share my story")
  {
    id: "rae",
    name: "Rae",
    source: "app_member",
    origin: "submitted",
    quote:
      "Thank you for your feedback and positive support! Your program works! But it is up to me to stick with it daily and I choose the work over the pain.. that's fine to share my story... my walking is divided up over the day as you suggested for getting back to it! I'll be leaving a great review too! You're brilliant to design this... assessment and adjustments, as needed daily.. instead of a group of boxed exercises given to everyone... thank you!!",
  },
  // SUBMITTED — a/Michelle Triepels Testimonial Card.png
  {
    id: "michelle-triepels",
    name: "Michelle Triepels",
    source: "app_member",
    origin: "submitted",
    quote:
      "The pain has really improved a lot, even during the 4,5 work days. Almost non existent. I went to the store with no pain and have been feeling so much better.\n\nI have been doing the 2 feet calfraises on a slanted board, sometimes up to 6x10. I use a 1kg ball for those calfraises. Really going well.\n\nI am going to move forward to Phase 3 on Saturday!",
    meta: "Report written October 8, 2026 · 6 weeks after purchase",
  },
  // SUBMITTED — a/Meghan Goughan Testimonial.png
  {
    id: "meghan-goughan",
    name: "Meghan Goughan",
    source: "app_member",
    origin: "submitted",
    quote:
      "Dr. Schutza's program is great.\n\nImportant piece in helping me to keep training for a Fall race that I have!",
    meta: "Feedback shared September 26, 2026 · 3 months after joining",
  },
  // ── Clinic patients (in-person care with Dr. Schutza) ──
  // src/pages/NewIndex.tsx — secondary cards
  {
    id: "lory-tubbs",
    name: "Lory Tubbs",
    source: "clinic_patient",
    quote:
      "Over the years I've had numerous injuries requiring physical therapy. PT would often improve the immediate problem, but never addressed the deeper issues. Jonathan assessed my gait and began a regimen that got to the root of the problem — basically teaching me how to walk again.",
    emphasis: "teaching me how to walk again.",
  },
  // src/pages/NewIndex.tsx — secondary cards
  {
    id: "wendy-peterman",
    name: "Wendy Peterman",
    source: "clinic_patient",
    quote:
      "I tore a tendon in my plantar fascia in January and developed a DVT in the same leg in March. In May, I started with Dr. Jonathan Schutza and had remarkable progress. Through his guided strengthening program, I was able to walk with better mobility and less pain.",
    emphasis: "remarkable progress.",
  },
  // src/pages/NewIndex.tsx — secondary cards
  {
    id: "debbie-wisenor",
    name: "Debbie Wisenor",
    source: "clinic_patient",
    quote:
      "Dr. Jonathan Schutza is a truly exceptional Physical Therapist whose innovative approach has made a significant impact on my recovery. What sets him apart is recording himself demonstrating the correct form for every exercise — ensuring clarity when I continue rehabilitation at home.",
    emphasis: "recording himself demonstrating the correct form for every exercise",
  },
  // ── Content followers (helped by his free posts/videos, not the program) ──
  // src/pages/NewIndex.tsx — "Testimonial anchor" card
  {
    id: "dee-bell",
    name: "Dee Bell",
    source: "content_follower",
    quote:
      "I had heel pain for over five years. I tried everything — orthotics, steroid injections, stretching, different doctors. Nothing worked long-term. Dr. Jonathan Schutza was the first to explain the real cause of my pain and create a plan that finally worked. He's not just fixing the pain — he's teaching me how to stay better.",
  },
  // src/pages/NewIndex.tsx — featured testimonial
  {
    id: "lorenzo-luongo",
    name: "Lorenzo Luongo",
    source: "content_follower",
    quote:
      "I've been struggling with plantar fasciitis for 3 years, tried cortisone, shockwave, thousands of different shoes. Until December when I saw one of your fascia strengthening exercises. For the first time it's been 2 weeks without pain.",
    closing: "It's unreal.",
  },
  // src/pages/NewIndex.tsx — additional cards
  {
    id: "bogiegrl",
    name: "@bogiegrl",
    source: "content_follower",
    quote:
      "You are the most positive, supportive physical therapist I have come across on social media. The fact that you focus on foot and ankle rehab is a bonus. You have added greatly to my Post Tibial Tendonitis recovery.",
    emphasis: "The fact that you focus on foot and ankle rehab is a bonus.",
  },
  // src/pages/NewIndex.tsx — additional cards
  {
    id: "youngcarol",
    name: "@youngcarol",
    source: "content_follower",
    quote:
      "I've suffered a lisfranc injury requiring surgery and I'm in rehab regaining all the strength I've lost. Very clear and exercises are achievable. I'm from Australia — thanks for your work.",
    emphasis: "Very clear and exercises are achievable.",
  },
  // src/pages/NewIndex.tsx — secondary cards
  {
    id: "vicbre415",
    name: "@vicbre415",
    source: "content_follower",
    quote:
      "You have helped me and my chronically painful foot by giving me the language and background knowledge to talk to my doctor and my PT. It has had an impact on my recovery for sure. Also — good reminders for me to keep practicing!",
    emphasis: "the language and background knowledge to talk to my doctor and my PT.",
  },
  // src/pages/NewIndex.tsx — additional cards
  {
    id: "zaiden-peterson",
    name: "Zaiden Peterson",
    source: "content_follower",
    quote:
      "I have had this pain since the beginning of cross country season and it has been bad enough that I couldn't run for a few meets. I talked to my athletic trainer but never got away from it — and this just gave me relief.",
    emphasis: "and this just gave me relief.",
  },
];
