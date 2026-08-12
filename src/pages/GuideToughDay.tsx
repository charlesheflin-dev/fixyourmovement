import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import VideoModal from "@/components/guide/VideoModal";
import "@/components/guide/guide.css";

// Tough Day / Flare-Up Companion page (Page 2). DOM structure and copy ported
// verbatim from temp/flareup/page2_stripped_reference.html; base64 images replaced
// with the copied /images/guide/* assets, internal links routed via react-router,
// and the reference's vanilla-JS click-to-play modal reproduced with VideoModal.

const WELCOME_SRC = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/586012ed39aef54f374f3b59d7a15614/iframe";
const WELCOME_FALLBACK = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/586012ed39aef54f374f3b59d7a15614/watch";
const M1_SRC = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/e7e33b3788e2d018178afa312f67101c/iframe";
const M1_FALLBACK = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/e7e33b3788e2d018178afa312f67101c/watch";
const M2_SRC = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/bf481891467550acffc01b7a289183f2/iframe";
const M2_FALLBACK = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/bf481891467550acffc01b7a289183f2/watch";
const M3_SRC = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/090fe53359d6c5349b3f2c568e94bbe5/iframe";
const M3_FALLBACK = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/090fe53359d6c5349b3f2c568e94bbe5/watch";

export default function GuideToughDay() {
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
            <p className="eyebrow">Flare-Up Support</p>
            <h1>A Tough Day Doesn't Mean You're Back at the Beginning</h1>
            <p className="companion-line">A visual companion to the flare-up guidance in <em>You Haven't Failed</em>.</p>
            <p className="hero-copy">A flare-up can make you question whether you should keep going at all. These three movements give you ways to temporarily reduce the demand while still giving your foot something it can handle.
              {" "}<span className="hero-return">Use this collection when your usual level of activity feels like too much, then return to your book.</span>
            </p>
          </div>
        </section>

        <section>
          <div className="container">
            <p className="section-kicker">Watch</p>
            <h2 className="section-title">Welcome from Dr. Jonathan</h2>
            <div className="welcome-grid">
              <button className="video-thumb js-video" onClick={() => openVideo(WELCOME_SRC, WELCOME_FALLBACK)} aria-label="Play welcome from Dr. Jonathan">
                <img src="/images/guide/00-welcome-dr-jonathan.png" alt="Dr. Jonathan Schutza welcoming readers to the Flare-Up Companion Collection" />
              </button>
              <div className="welcome-note">
                <h3>Keep moving, just change the demand.</h3>
                <p>Dr. Jonathan explains how to use these movements when your foot is having a tougher day.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="before-begin">
          <div className="container">
            <div className="reading">
              <div className="begin-card">
                <h2>Before We Begin</h2>
                <p>A flare-up doesn't automatically mean you've damaged something or lost your progress. Sometimes your foot is simply telling you that today's demand exceeded what it was ready to handle. The answer doesn't always have to be complete rest. These movements give you ways to reduce the difficulty while continuing to give your foot some manageable work.</p>
                <ul className="begin-list">
                  <li><strong>Reduce the demand.</strong> These are easier options, not exercises to push through aggressively.</li>
                  <li><strong>Let your symptoms guide the adjustment.</strong> If something feels like too much today, make it easier.</li>
                  <li><strong>Think temporary.</strong> The goal is to settle things down, then gradually return to your normal progression.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <p className="section-kicker">The Demonstrations</p>
            <h2 className="section-title">Three ways to keep moving on a tougher day</h2>
            <div className="movement-list">

              <article className="movement-card">
                <button className="movement-visual js-video" onClick={() => openVideo(M1_SRC, M1_FALLBACK)} aria-label="Play Chair-Assisted Heel Lift video">
                  <img src="/images/guide/01-chair-assisted-heel-lift.jpg" alt="Dr. Jonathan demonstrating the Chair-Assisted Heel Lift" />
                </button>
                <div className="movement-content">
                  <div className="movement-number">Movement 01</div>
                  <h3>Chair-Assisted Heel Lift</h3>
                  <p>Use the chair to take some body weight off your foot while still letting your calf and foot keep working through the heel-lift pattern.</p>
                  <div className="dosage">
                    <span className="dosage-label">Do This</span>
                    <strong>3 sets of 10 repetitions</strong>
                  </div>
                  <button className="watch-link js-video" onClick={() => openVideo(M1_SRC, M1_FALLBACK)} aria-label="Watch Chair-Assisted Heel Lift">Watch <span>→</span></button>
                </div>
              </article>

              <article className="movement-card">
                <button className="movement-visual js-video" onClick={() => openVideo(M2_SRC, M2_FALLBACK)} aria-label="Play Manually Resisted Ankle Inversion video">
                  <img src="/images/guide/02-manually-resisted-ankle-inversion.jpg" alt="Dr. Jonathan demonstrating the Manually Resisted Ankle Inversion" />
                </button>
                <div className="movement-content">
                  <div className="movement-number">Movement 02</div>
                  <h3>Manually Resisted Ankle Inversion</h3>
                  <p>Keep strengthening the muscles that help support your arch without asking your foot to manage as much weight-bearing.</p>
                  <div className="dosage">
                    <span className="dosage-label">Do This</span>
                    <strong>3 rounds of 10 repetitions</strong>
                  </div>
                  <button className="watch-link js-video" onClick={() => openVideo(M2_SRC, M2_FALLBACK)} aria-label="Watch Manually Resisted Ankle Inversion">Watch <span>→</span></button>
                </div>
              </article>

              <article className="movement-card">
                <button className="movement-visual js-video" onClick={() => openVideo(M3_SRC, M3_FALLBACK)} aria-label="Play Seated Toe Smash video">
                  <img src="/images/guide/03-seated-toe-smash.jpg" alt="Dr. Jonathan demonstrating the Seated Toe Smash" />
                </button>
                <div className="movement-content">
                  <div className="movement-number">Movement 03</div>
                  <h3>Seated Toe Smash</h3>
                  <p>Load your big toe and the muscles supporting your arch while keeping the overall effort relatively low.</p>
                  <div className="dosage">
                    <span className="dosage-label">Do This</span>
                    <strong>3 sets of 10 repetitions</strong>
                  </div>
                  <div className="easier-option">
                    <span className="dosage-label">Need an Easier Option?</span>
                    <p>Keep the balls of your feet down and simply press your toes firmly into the floor.</p>
                  </div>
                  <button className="watch-link js-video" onClick={() => openVideo(M3_SRC, M3_FALLBACK)} aria-label="Watch Seated Toe Smash">Watch <span>→</span></button>
                </div>
              </article>

            </div>
          </div>
        </section>

        <section className="takeaway">
          <div className="container">
            <div className="takeaway-card">
              <h2>If You Remember Only One Thing</h2>
              <p>A flare-up doesn't erase your progress. Adjust what you're asking from your foot today, then keep building from there.</p>
            </div>
          </div>
        </section>

        <section className="questions">
          <div className="container">
            <p className="section-kicker">A Few Final Thoughts</p>
            <h2 className="section-title">Questions for a tougher day</h2>
            <div className="question-list">
              <div className="question">
                <h3>Does a flare-up mean I've made things worse?</h3>
                <p>Not necessarily. Symptoms can increase when the demand on your foot exceeds what it was ready to handle that day. One difficult day doesn't automatically mean you've damaged something or returned to where you started.</p>
              </div>
              <div className="question">
                <h3>Should I stop exercising until the flare-up is gone?</h3>
                <p>Not automatically. Often, the better first step is to reduce the difficulty and see how your foot responds. That's exactly what these movements are here to help you do.</p>
              </div>
              <div className="question">
                <h3>How do I know if I should make an exercise easier?</h3>
                <p>If your usual movement feels noticeably more difficult or uncomfortable than it normally does, reduce the load, range, or effort. The goal on a tough day isn't to prove what your foot can tolerate.</p>
              </div>
              <div className="question">
                <h3>How long should I use these easier movements?</h3>
                <p>Think of them as temporary options. As your symptoms settle and your foot feels ready for more, begin working back toward your usual level rather than staying here indefinitely.</p>
              </div>
              <div className="question">
                <h3>What if my flare-up isn't settling down?</h3>
                <p>If symptoms continue to worsen, feel substantially different from what you've experienced before, or you're concerned about what's happening, don't assume you simply need to push through it. That's an appropriate time to seek individualized guidance.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="ask-section">
          <div className="container">
            <div className="ask-card">
              <div className="ask-photo"><img src="/images/guide/headshot2.png" alt="Dr. Jonathan Schutza" /></div>
              <div className="ask-copy">
                <h2>Not sure how to adjust on a tough day?</h2>
                <p>If your foot isn't responding the way you expected, Ask Dr. Jonathan can help you think through what you're experiencing.</p>
              </div>
              <Link className="button" to="/ask">Ask Dr. Jonathan</Link>
            </div>
          </div>
        </section>

        <section className="collection-back">
          <div className="container">
            <div className="collection-back-inner">
              <p>Want to revisit your morning routine?</p>
              <Link to="/guide/morning">← Return to First Steps Out of Bed</Link>
            </div>
          </div>
        </section>

        <section className="signature">
          <div className="container">
            <div className="signature-inner">
              <div className="signature-label">From Dr. Jonathan</div>
              <blockquote>Recovery isn't about finding one perfect exercise. It's about consistently making good decisions.</blockquote>
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
