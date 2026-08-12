import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import VideoModal from "@/components/guide/VideoModal";
import "@/components/guide/guide.css";

// Morning Companion page (Page 1). DOM structure and copy ported verbatim from
// temp/firststeps/page1_stripped_reference.html; base64 images replaced with the
// copied /images/guide/* assets, internal links routed via react-router, and the
// reference's vanilla-JS click-to-play modal reproduced with VideoModal.

const WELCOME_SRC = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/8cf48502ce340cf217db3899968b4e27/iframe";
const WELCOME_FALLBACK = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/8cf48502ce340cf217db3899968b4e27/watch";
const M1_SRC = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/eb06e05baab20f1da9741ed09e09f7b3/iframe";
const M1_FALLBACK = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/eb06e05baab20f1da9741ed09e09f7b3/watch";
const M2_SRC = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/8dfbb75935b048365be71eca379fdb17/iframe";
const M2_FALLBACK = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/8dfbb75935b048365be71eca379fdb17/watch";
const M3_SRC = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/d06210e4b1cf219341a652c07c2dbf4d/iframe";
const M3_FALLBACK = "https://customer-hene8ngxxo3eajlj.cloudflarestream.com/d06210e4b1cf219341a652c07c2dbf4d/watch";

export default function GuideMorning() {
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
            <p className="eyebrow">First Steps Out of Bed</p>
            <h1>Tomorrow Morning Starts Here</h1>
            <p className="companion-line">A visual companion to Appointment 1 from <em>You Haven't Failed</em>.</p>
            <p className="hero-copy">Three simple movements to help your foot transition into the day more comfortably before you take your first steps.
              {" "}<span className="hero-return">Watch the three demonstrations below, then continue with the next page of your book.</span>
            </p>
          </div>
        </section>

        <section>
          <div className="container">
            <p className="section-kicker">Watch</p>
            <h2 className="section-title">Welcome from Dr. Jonathan</h2>
            <div className="welcome-grid">
              <button className="video-thumb js-video" onClick={() => openVideo(WELCOME_SRC, WELCOME_FALLBACK)} aria-label="Play welcome from Dr. Jonathan">
                <img src="/images/guide/00-welcome-dr-jonathan.png" alt="Dr. Jonathan Schutza welcoming readers to the Morning Companion Collection" />
              </button>
              <div className="welcome-note">
                <h3>A gentler start to the day.</h3>
                <p>Watch Dr. Jonathan's quick introduction before trying the three movements below.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="before-begin">
          <div className="container">
            <div className="reading">
              <div className="begin-card">
                <h2>Before We Begin</h2>
                <p>These three movements give your foot a chance to experience some gentle tension, muscle activity, and load before you stand. Think of them as a short transition between being at rest all night and asking your foot to carry you through those first few steps.</p>
                <ul className="begin-list">
                  <li>Move slowly and stay within a comfortable range.</li>
                  <li>Nothing needs to be forced or pushed aggressively.</li>
                  <li>This isn't a test of what your foot can tolerate. You're simply giving it a little preparation before the day begins.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <p className="section-kicker">The Demonstrations</p>
            <h2 className="section-title">Three movements before you stand</h2>
            <div className="movement-list">

              <article className="movement-card">
                <button className="movement-visual js-video" onClick={() => openVideo(M1_SRC, M1_FALLBACK)} aria-label="Play Plantar Fascia Stretch video">
                  <img src="/images/guide/01-plantar-fascia-stretch.jpg" alt="Dr. Jonathan demonstrating the Plantar Fascia Stretch" />
                </button>
                <div className="movement-content">
                  <div className="movement-number">Movement 01</div>
                  <h3>Plantar Fascia Stretch</h3>
                  <p>Gently introduce tension to the bottom of your foot before standing, so your plantar fascia isn't going from complete rest to full body weight all at once.</p>
                  <div className="dosage">
                    <span className="dosage-label">Do This</span>
                    <strong>Hold 30–60 seconds<br />Repeat 2–3 times</strong>
                  </div>
                  <button className="watch-link js-video" onClick={() => openVideo(M1_SRC, M1_FALLBACK)} aria-label="Watch Plantar Fascia Stretch">Watch <span>→</span></button>
                </div>
              </article>

              <article className="movement-card">
                <button className="movement-visual js-video" onClick={() => openVideo(M2_SRC, M2_FALLBACK)} aria-label="Play Great Toe Flexion Isometric video">
                  <img src="/images/guide/02-great-toe-flexion-isometric.jpg" alt="Dr. Jonathan demonstrating the Great Toe Flexion Isometric" />
                </button>
                <div className="movement-content">
                  <div className="movement-number">Movement 02</div>
                  <h3>Great Toe Flexion Isometric</h3>
                  <p>Wake up the muscles of your big toe and arch before standing, introducing a small amount of muscular activity before you take that first step.</p>
                  <div className="dosage">
                    <span className="dosage-label">Do This</span>
                    <strong>Press down and hold for 3 seconds<br />Repeat 10–20 times</strong>
                  </div>
                  <button className="watch-link js-video" onClick={() => openVideo(M2_SRC, M2_FALLBACK)} aria-label="Watch Great Toe Flexion Isometric">Watch <span>→</span></button>
                </div>
              </article>

              <article className="movement-card">
                <button className="movement-visual js-video" onClick={() => openVideo(M3_SRC, M3_FALLBACK)} aria-label="Play Seated Heel Raise video">
                  <img src="/images/guide/03-seated-heel-raise.jpg" alt="Dr. Jonathan demonstrating the Seated Heel Raise" />
                </button>
                <div className="movement-content">
                  <div className="movement-number">Movement 03</div>
                  <h3>Seated Heel Raise</h3>
                  <p>Gently load your calf and the bottom of your foot while you're still seated, helping prepare those tissues for the transition to standing.</p>
                  <div className="dosage">
                    <span className="dosage-label">Do This</span>
                    <strong>10–20 repetitions<br />Or continue for about 1 minute if you prefer not to count</strong>
                  </div>
                  <button className="watch-link js-video" onClick={() => openVideo(M3_SRC, M3_FALLBACK)} aria-label="Watch Seated Heel Raise">Watch <span>→</span></button>
                </div>
              </article>

            </div>
          </div>
        </section>

        <section className="takeaway">
          <div className="container">
            <div className="takeaway-card">
              <h2>If You Remember Only One Thing</h2>
              <p>Don't ask your foot to go from sleeping to supporting your full body in one second. Give it a chance to wake up first.</p>
            </div>
          </div>
        </section>

        <section className="questions">
          <div className="container">
            <p className="section-kicker">A Few Final Thoughts</p>
            <h2 className="section-title">Before you head back to the book</h2>
            <div className="question-list">
              <div className="question">
                <h3>Do I need to do all three movements?</h3>
                <p>Ideally, yes. Each movement prepares your foot a little differently, first with gentle tension, then muscular activity, then load. Together, they help make the transition from rest to standing less abrupt. You don't need to turn this into a workout. Keep the sequence simple and manageable.</p>
              </div>
              <div className="question">
                <h3>What if one of the movements is uncomfortable?</h3>
                <p>Some awareness or mild sensitivity doesn't automatically mean something is wrong, but you shouldn't feel like you're fighting through the movement. Back off the intensity, shorten the range, or skip that movement for the morning if needed.</p>
              </div>
              <div className="question">
                <h3>How hard should I push or stretch?</h3>
                <p>Gently. More force isn't the goal. Use enough tension or effort to feel the movement without turning it into a test.</p>
              </div>
              <div className="question">
                <h3>Should I do these every morning?</h3>
                <p>You can use this sequence on mornings when those first few steps tend to be difficult. As your foot becomes more capable and those first steps become less sensitive, you may find you don't need it as often. <strong>This isn't something you're supposed to depend on forever.</strong></p>
              </div>
              <div className="question">
                <h3>What if my first steps still hurt afterward?</h3>
                <p>That's okay. These movements aren't meant to guarantee a pain-free first step. Pay attention to how your foot responds over time rather than judging the routine by a single morning.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="ask-section">
          <div className="container">
            <div className="ask-card">
              <div className="ask-photo"><img src="/images/guide/headshot2.png" alt="Dr. Jonathan Schutza" /></div>
              <div className="ask-copy">
                <h2>Still have a question about your foot?</h2>
                <p>If something here doesn't quite fit what you're experiencing, Ask Dr. Jonathan can help you think through your next question.</p>
              </div>
              <Link className="button" to="/ask">Ask Dr. Jonathan</Link>
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
