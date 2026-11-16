import { useState } from "react";
import {
  PERMISSION_LINE,
  SOURCE_LABEL,
  TESTIMONIALS,
  VIDEO_TESTIMONIALS,
  type Testimonial,
} from "@/data/testimonials";
import VideoTestimonial from "@/components/VideoTestimonial";

// Shared "Member Stories" section (Charles 2026-11-16): /testimonials (all cards), /lp/download and
// /lp/cold-start (bottom of the pre-signup view, CTA scrolls to the page's own form) and /results (after
// the final CTA, CTA -> /checkout). Quotes come only from src/data/testimonials.ts. "Show more" expands
// in place — local state, no navigation. SSR-safe: nothing reads window during render.

export type MemberStoriesCta = { label: string; href?: string; onClick?: () => void };

type Props = {
  heading?: string;
  /** "h1" only on /testimonials, where this section is the page. */
  headingAs?: "h1" | "h2";
  initialCount?: number;
  /** Omit to render no CTA (e.g. /hsa-fsa, whose section already carries its own checkout link). */
  cta?: MemberStoriesCta;
  showPermissionLine?: boolean;
  /** Outer element id — MemberStoriesPreview's "Read more member stories" scrolls here. */
  id?: string;
  /** Hide the eyebrow + heading when the host section already has its own heading (e.g. /hsa-fsa). */
  hideHeading?: boolean;
  /** Testimonial ids to leave out (already shown by a MemberStoriesPreview on the same page). Videos unaffected. */
  excludeIds?: string[];
};

const DEFAULT_HEADING = "What Members Shared After Following The System";

const CTA_CLASS =
  "inline-flex min-h-[54px] items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-center text-white text-base sm:text-lg font-bold leading-snug transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

function Paragraph({ text, emphasis }: { text: string; emphasis?: string }) {
  const at = emphasis ? text.indexOf(emphasis) : -1;
  if (!emphasis || at < 0) return <p className="text-slate-700 text-[15px] leading-relaxed">{text}</p>;
  return (
    <p className="text-slate-700 text-[15px] leading-relaxed">
      {text.slice(0, at)}
      <span className="font-semibold text-slate-900">{emphasis}</span>
      {text.slice(at + emphasis.length)}
    </p>
  );
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="mb-4 break-inside-avoid rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-left">
      <div className="text-blue-600 text-3xl font-bold leading-none mb-3" aria-hidden="true">"</div>
      <blockquote className="space-y-3">
        {t.quote.split("\n\n").map((para, i) => (
          <Paragraph key={i} text={para} emphasis={t.emphasis} />
        ))}
        {t.closing && <p className="text-blue-600 font-bold text-[15px]">{t.closing}</p>}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <div className="w-6 h-0.5 bg-blue-600 shrink-0" />
        <div>
          <p className="text-blue-600 font-semibold text-sm leading-tight">{t.name}</p>
          <p className="text-slate-500 text-xs mt-0.5">{SOURCE_LABEL[t.source]}</p>
        </div>
      </figcaption>
      {t.meta && <p className="text-slate-400 text-xs mt-3">{t.meta}</p>}
    </figure>
  );
}

export default function MemberStories({
  heading = DEFAULT_HEADING,
  headingAs = "h2",
  initialCount = 6,
  cta,
  showPermissionLine = true,
  id = "member-stories",
  hideHeading = false,
  excludeIds,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const list = excludeIds?.length ? TESTIMONIALS.filter((t) => !excludeIds.includes(t.id)) : TESTIMONIALS;
  const total = list.length;
  const shown = expanded ? list : list.slice(0, Math.max(0, initialCount));
  const remaining = total - shown.length;
  const Heading = headingAs;
  const headingClass =
    headingAs === "h1"
      ? "font-display text-3xl md:text-[2.75rem] font-bold text-slate-900 leading-snug mb-4"
      : "font-display text-3xl md:text-4xl font-bold text-slate-900 leading-snug mb-4";

  return (
    <section
      id={id}
      aria-labelledby={hideHeading ? undefined : "member-stories-heading"}
      aria-label={hideHeading ? "Member stories" : undefined}
      className="w-full bg-slate-50 py-12 md:py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {(!hideHeading || showPermissionLine) && (
          <div className="max-w-3xl mx-auto text-center mb-10">
            {!hideHeading && (
              <>
                <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Member Stories</p>
                <Heading id="member-stories-heading" className={headingClass}>
                  {heading}
                </Heading>
              </>
            )}
            {showPermissionLine && <p className="text-slate-600 text-base leading-relaxed">{PERMISSION_LINE}</p>}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:justify-center gap-8 mb-10">
          {VIDEO_TESTIMONIALS.map((v) => (
            <div key={v.id} className="w-full sm:w-auto sm:flex-1 sm:max-w-[340px]">
              <VideoTestimonial video={v} />
            </div>
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {shown.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>

        {remaining > 0 && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-blue-200 bg-white px-5 py-2.5 text-blue-600 text-sm font-semibold transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Show more stories ({remaining})
            </button>
          </div>
        )}

        {cta && (
          <div className="mt-10 text-center">
            {cta.href ? (
              <a href={cta.href} onClick={cta.onClick} className={CTA_CLASS}>
                {cta.label}
              </a>
            ) : (
              <button type="button" onClick={cta.onClick} className={CTA_CLASS}>
                {cta.label}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
