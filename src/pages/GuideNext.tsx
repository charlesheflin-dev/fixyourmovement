import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import VideoModal from "@/components/guide/VideoModal";
import "@/components/guide/guide.css";

// Progression + Returning-to-Barefoot Companion page (Page 3). DOM structure and
// copy ported verbatim from temp/progression/page3_stripped_reference.html; base64
// images replaced with the copied /images/guide/* assets, internal links routed via
// react-router, and the reference's vanilla-JS click-to-play modal reproduced with
// VideoModal.

const WELCOME_SRC = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/e5d8d2dfecafee0295de74c8502c6d71/iframe";
const WELCOME_FALLBACK = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/e5d8d2dfecafee0295de74c8502c6d71/watch";
const P1_SRC = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/08dc77d92bb67b3b8d2e85308b2d13a1/iframe";
const P1_FALLBACK = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/08dc77d92bb67b3b8d2e85308b2d13a1/watch";
const P2_SRC = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/562c88517b4a4d480b3e1c8c4f13b1e8/iframe";
const P2_FALLBACK = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/562c88517b4a4d480b3e1c8c4f13b1e8/watch";
const P3_SRC = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/dc7c5fb9e1263b2bc9a7d76146e1565a/iframe";
const P3_FALLBACK = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/dc7c5fb9e1263b2bc9a7d76146e1565a/watch";
const B1_SRC = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/d264e92d67887a7c5d63add4e95eae27/iframe";
const B1_FALLBACK = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/d264e92d67887a7c5d63add4e95eae27/watch";
const B2_SRC = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/a09e32e62d22ead26d5dbc3593814f8d/iframe";
const B2_FALLBACK = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/a09e32e62d22ead26d5dbc3593814f8d/watch";
const B3_SRC = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/9014e9f3e62c4807ebdb49a068e9204b/iframe";
const B3_FALLBACK = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/9014e9f3e62c4807ebdb49a068e9204b/watch";

export default function GuideNext() {
  const [video, setVideo] = useState<{ src: string; fallback: string } | null>(null);
  const openVideo = useCallback((src: string, fallback: string) => setVideo({ src, fallback }), []);
  const closeVideo = useCallback(() => setVideo(null), []);

  return (
    <div className="fcs-guide">
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" to="/" aria-label="Foot Capacity System home">
            <img src="/images/guide/fsclogo-upscale.png" alt="Foot Capacity System" />
          </Link>
          <div className="header-label">Companion Collection</div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <p className="eyebrow">Progression</p>
            <h1>Your Foot Won't Stay Here Forever</h1>
            <p className="companion-line">A visual companion to the progression section from <em>You Haven't Failed</em>.</p>
            <p className="hero-copy">Recovery isn't about repeating the same exercises forever. As your foot becomes more capable, the challenge should change too.
              {" "}<span className="hero-return">These videos show how three key strengthening categories can gradually progress as your tolerance and capacity improve.</span>
            </p>
            <div className="progression-intro"><strong>These are examples of where recovery can go, not a checklist of exercises you need to start today.</strong></div>
          </div>
        </section>

        <section>
          <div className="container">
            <p className="section-kicker">Watch</p>
            <h2 className="section-title">Welcome from Dr. Jonathan</h2>
            <div className="welcome-grid">
              <button className="video-thumb js-video" onClick={() => openVideo(WELCOME_SRC, WELCOME_FALLBACK)} aria-label="Play welcome from Dr. Jonathan">
                <img src="/images/guide/00-welcome-dr-jonathan.png" alt="Dr. Jonathan Schutza welcoming readers to the Progression Companion Collection" />
              </button>
              <div className="welcome-note">
                <h3>This is what progression looks like.</h3>
                <p>Dr. Jonathan walks you through how the same basic movement patterns can gradually become more challenging as your foot becomes ready for more.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="before-begin">
          <div className="container">
            <div className="reading">
              <div className="begin-card">
                <h2>Before We Begin</h2>
                <p>Progression doesn't mean replacing one exercise with something harder just because time has passed. It means increasing the challenge when your foot is ready to manage it.</p>
                <p>The three videos below show how great toe strength, arch and ankle strength, and calf strength can gradually develop from simpler variations into greater resistance and more body-weight loading.</p>
                <ul className="begin-list">
                  <li><strong>Don't rush the levels.</strong> More difficult is only useful when your foot is ready for it.</li>
                  <li><strong>You may progress differently across categories.</strong> Your calf may be ready for more while your great toe or arch still needs an easier variation.</li>
                  <li><strong>Your response matters more than the number.</strong> Progression is about matching the challenge to your current capacity.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <p className="section-kicker">The Progressions</p>
            <h2 className="section-title">Three stages of building capacity</h2>
            <p className="bonus-lead">Each video follows the same three areas: great toe strength, ankle inversion and arch strength, and heel-lift and calf strength. What changes from one video to the next is the amount of resistance and body-weight demand.</p>
            <div className="movement-list">

              <article className="movement-card">
                <button className="movement-visual js-video" onClick={() => openVideo(P1_SRC, P1_FALLBACK)} aria-label="Play Progression 1 video">
                  <img src="/images/guide/01-progression-building-your-foundation.jpg" alt="Progression 1, Building Your Foundation" />
                </button>
                <div className="movement-content">
                  <div className="movement-number">Progression 01</div>
                  <h3>Building Your Foundation</h3>
                  <p>Start with introductory variations that let you build strength while keeping the overall demand relatively manageable.</p>
                  <span className="dosage-label">In This Video</span>
                  <div className="video-contents">
                    <div className="exercise-row"><strong>Great Toe Flexion Isometric</strong><span>3 sets of 10 · Hold up to 5 seconds</span></div>
                    <div className="exercise-row"><strong>Seated Ankle Inversion</strong><span>3 sets of 10</span></div>
                    <div className="exercise-row"><strong>Seated Heel Lift</strong><span>3 sets of 10 · Or continue for up to 1 minute if it feels good</span></div>
                  </div>
                  <button className="watch-link js-video" onClick={() => openVideo(P1_SRC, P1_FALLBACK)}>Watch <span>→</span></button>
                </div>
              </article>

              <article className="movement-card">
                <button className="movement-visual js-video" onClick={() => openVideo(P2_SRC, P2_FALLBACK)} aria-label="Play Progression 2 video">
                  <img src="/images/guide/02-progression-adding-resistance.jpg" alt="Progression 2, Adding Resistance" />
                </button>
                <div className="movement-content">
                  <div className="movement-number">Progression 02</div>
                  <h3>Adding Resistance</h3>
                  <p>The movement patterns stay familiar, but resistance and loading begin to increase.</p>
                  <span className="dosage-label">In This Video</span>
                  <div className="video-contents">
                    <div className="exercise-row"><strong>Resisted Great Toe Flexion</strong><span>3 sets of 10</span></div>
                    <div className="exercise-row"><strong>Seated Banded Ankle Inversion</strong><span>3 sets of 10</span></div>
                    <div className="exercise-row"><strong>Chair-Assisted Heel Lift</strong><span>3 sets of 10</span><p className="exercise-note">Use the chair to intentionally take some body weight off your feet, not simply for balance.</p></div>
                  </div>
                  <button className="watch-link js-video" onClick={() => openVideo(P2_SRC, P2_FALLBACK)}>Watch <span>→</span></button>
                </div>
              </article>

              <article className="movement-card">
                <button className="movement-visual js-video" onClick={() => openVideo(P3_SRC, P3_FALLBACK)} aria-label="Play Progression 3 video">
                  <img src="/images/guide/03-progression-building-more-load.jpg" alt="Progression 3, Building More Load" />
                </button>
                <div className="movement-content">
                  <div className="movement-number">Progression 03</div>
                  <h3>Building More Load</h3>
                  <p>This stage brings more of the work into weight-bearing and asks your foot to manage a greater share of your body weight.</p>
                  <span className="dosage-label">In This Video</span>
                  <div className="video-contents">
                    <div className="exercise-row"><strong>Seated Toe Smash</strong><span>3 sets of 10</span></div>
                    <div className="exercise-row"><strong>Standing Resisted Ankle Inversion</strong><span>3 sets of 10</span></div>
                    <div className="exercise-row"><strong>Standard Standing Heel Lift</strong><span>3 sets of 10</span><p className="exercise-note">A chair may be used for balance only. Do not use it to reduce body weight.</p></div>
                  </div>
                  <div className="bonus-progression">
                    <span className="dosage-label">Bonus Progression</span>
                    <strong>Single-Leg Heel Lift</strong>
                    <span>3 sets of 10</span>
                    <p className="exercise-note">Use the chair for balance only. It should not be used to reduce body weight.</p>
                  </div>
                  <button className="watch-link js-video" onClick={() => openVideo(P3_SRC, P3_FALLBACK)}>Watch <span>→</span></button>
                </div>
              </article>

            </div>
          </div>
        </section>

        <section className="takeaway">
          <div className="container">
            <div className="takeaway-card">
              <h2>If You Remember Only One Thing</h2>
              <p>Recovery isn't about staying where you are. It's about becoming ready for what's next.</p>
            </div>
          </div>
        </section>

        <section className="bonus-section">
          <div className="container">
            <p className="section-kicker">Bonus Collection</p>
            <h2 className="section-title">Returning to Barefoot</h2>
            <p className="bonus-lead">Barefoot activity doesn't need to be an all-or-nothing decision. These three videos show a gradual way to reintroduce barefoot movement and different surface demands, starting with supported toe movement and progressing toward short periods of standing and walking on a softer surface.</p>
            <div className="progression-intro"><strong>The goal is gradual exposure, not immediately returning to long periods of barefoot standing or walking.</strong></div>

            <div className="movement-list">
              <article className="movement-card">
                <button className="movement-visual js-video" onClick={() => openVideo(B1_SRC, B1_FALLBACK)} aria-label="Play Seated Toe Extension video">
                  <img src="/images/guide/04-bonus-seated-toe-extension.jpg" alt="Seated Toe Extension" />
                </button>
                <div className="movement-content">
                  <div className="movement-number">Bonus 01</div>
                  <h3>Seated Toe Extension</h3>
                  <p>Begin reintroducing movement through the toes while your foot is still supported.</p>
                  <div className="dosage"><span className="dosage-label">Do This</span><strong>3 sets of 10 repetitions<br />2–3 times per day<br />Every day</strong></div>
                  <button className="watch-link js-video" onClick={() => openVideo(B1_SRC, B1_FALLBACK)}>Watch <span>→</span></button>
                </div>
              </article>

              <article className="movement-card">
                <button className="movement-visual js-video" onClick={() => openVideo(B2_SRC, B2_FALLBACK)} aria-label="Play Soft-Surface Marching video">
                  <img src="/images/guide/05-bonus-soft-surface-marching.jpg" alt="Soft-Surface Marching" />
                </button>
                <div className="movement-content">
                  <div className="movement-number">Bonus 02</div>
                  <h3>Soft-Surface Marching</h3>
                  <p>Introduce short periods of barefoot single-leg loading on a softer surface without requiring prolonged standing.</p>
                  <div className="dosage"><span className="dosage-label">Do This</span><strong>3 sets of 10 alternating marches<br />Up to 2–3 times per day, depending on tolerance</strong></div>
                  <div className="micro-callout">Hold onto something for balance if needed. Move at a pace that feels manageable.</div>
                  <button className="watch-link js-video" onClick={() => openVideo(B2_SRC, B2_FALLBACK)}>Watch <span>→</span></button>
                </div>
              </article>

              <article className="movement-card">
                <button className="movement-visual js-video" onClick={() => openVideo(B3_SRC, B3_FALLBACK)} aria-label="Play Reverse Walking on a Soft Surface video">
                  <img src="/images/guide/06-bonus-reverse-walking-soft-surface.jpg" alt="Reverse Walking on a Soft Surface" />
                </button>
                <div className="movement-content">
                  <div className="movement-number">Bonus 03</div>
                  <h3>Reverse Walking on a Soft Surface</h3>
                  <p>Reintroduce barefoot walking while changing how load moves through your foot.</p>
                  <div className="dosage"><span className="dosage-label">Do This</span><strong>Walk backward for 20–30 seconds<br />Repeat 5–10 rounds</strong></div>
                  <div className="barefoot-adjust">
                    <div><strong>Make It Easier</strong>Take shorter steps and move slowly.</div>
                    <div><strong>Make It Harder</strong>Reach farther backward with each step or increase your pace.</div>
                  </div>
                  <button className="watch-link js-video" onClick={() => openVideo(B3_SRC, B3_FALLBACK)}>Watch <span>→</span></button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="takeaway">
          <div className="container">
            <div className="takeaway-card">
              <h2>One Thing to Remember About Barefoot</h2>
              <p>You don't have to prove that your foot can tolerate barefoot activity. Give it repeated opportunities to adapt to it.</p>
            </div>
          </div>
        </section>

        <section className="questions">
          <div className="container">
            <p className="section-kicker">A Few Final Thoughts</p>
            <h2 className="section-title">Questions about what comes next</h2>
            <div className="question-list">
              <div className="question"><h3>Do I need to complete every progression in order?</h3><p>Not necessarily at the same pace. The categories may progress differently depending on your strength, tolerance, and goals.</p></div>
              <div className="question"><h3>How do I know when I'm ready for a harder version?</h3><p>When the current variation feels manageable and your foot is consistently recovering from the work you're asking it to do, it may be appropriate to introduce a little more challenge.</p></div>
              <div className="question"><h3>Should I move backward if my foot becomes irritated?</h3><p>Yes, when appropriate. Moving temporarily to an easier variation isn't failure. It's simply another way of matching today's plan to today's tolerance.</p></div>
              <div className="question"><h3>Do I need to return to barefoot activity?</h3><p>No. Barefoot activity is not a requirement for successful recovery. These bonus videos are here for people who want to gradually rebuild tolerance for it.</p></div>
              <div className="question"><h3>What if I'm not sure which progression fits me?</h3><p>That's where individualized guidance becomes useful. Your next step should reflect your current capacity, symptoms, and what you're actually trying to get back to.</p></div>
            </div>
          </div>
        </section>

        <section className="ask-section">
          <div className="container">
            <div className="ask-card">
              <div className="ask-photo"><img src="/images/guide/headshot2.png" alt="Dr. Jonathan Schutza" /></div>
              <div className="ask-copy">
                <h2>Not sure what “ready for more” means for your foot?</h2>
                <p>If you're unsure whether to progress, hold steady, or temporarily make something easier, Ask Dr. Jonathan can help you think through what you're experiencing.</p>
              </div>
              <Link className="button" to="/ask">Ask Dr. Jonathan</Link>
            </div>
          </div>
        </section>

        <section className="library">
          <div className="container">
            <p className="section-kicker">Companion Collections</p>
            <h2 className="section-title">Revisit a collection</h2>
            <div className="library-grid">
              <Link className="library-card" to="/guide/morning">
                <span>First Steps Out of Bed</span><strong>Tomorrow Morning Starts Here</strong><p>Return to the three movements designed for those first steps after rest.</p>
              </Link>
              <Link className="library-card" to="/guide/tough-day">
                <span>Flare-Up Support</span><strong>A Tough Day Doesn't Mean You're Back at the Beginning</strong><p>Return to the lower-demand options for a tougher day.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="signature">
          <div className="container">
            <div className="signature-inner">
              <div className="signature-label">From Dr. Jonathan</div>
              <blockquote>The goal isn't to stay on the same exercise forever. It's to keep becoming ready for more of the life you want back.</blockquote>
              <div className="signature-name">Dr. Jonathan Schutza, PT, DPT, Cert. DN<br />Founder, Foot Capacity System</div>
              <p className="signature-purpose">Created to help you better understand your foot, make more confident decisions, and keep moving forward.</p>
              <p className="signature-medical">This collection is educational and does not replace individualized medical evaluation, diagnosis, or treatment.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <div className="footer-brand">
            <strong>Foot Capacity System</strong>
            <p><span>© 2026 Back At It Physical Therapy, LLC.</span> <span className="rights-reserved">All rights reserved.</span></p>
          </div>
          <nav className="footer-links" aria-label="Footer links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </footer>

      <VideoModal src={video?.src ?? null} fallback={video?.fallback ?? ""} onClose={closeVideo} />
    </div>
  );
}
