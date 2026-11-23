import { TESTIMONIALS } from "@/data/testimonials";
import { TestimonialCard } from "@/components/MemberStories";

// Compact named-story preview (2026-11-16): replaces the retired aliased UserJourneyCarousel on
// /lp/cold-start, /lp/download and /results (operator decision 2026-11-11 — aliased examples are replaced
// by consented, named member stories). Shows the first 3 app_member entries from src/data/testimonials.ts
// in data order; no videos, no CTA. "Read more" scrolls to the page's full <MemberStories> section.
// SSR-safe: window/document are only touched inside the click handler.

export const PREVIEW_COUNT = 3;

/** The stories a preview shows: the first 3 app_member entries, after leaving out `excludeIds`. */
export function previewTestimonials(excludeIds: readonly string[] = []) {
  return TESTIMONIALS.filter((t) => t.source === "app_member" && !excludeIds.includes(t.id)).slice(0, PREVIEW_COUNT);
}

export const PREVIEW_TESTIMONIALS = previewTestimonials();

/** Pass to the same page's full <MemberStories excludeIds> so no story appears twice. */
export const PREVIEW_TESTIMONIAL_IDS = PREVIEW_TESTIMONIALS.map((t) => t.id);

function scrollToTarget(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  let reduce = false;
  try {
    reduce = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    reduce = false;
  }
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

type Props = {
  /** Element id of the full Member Stories section; omit to hide the "Read more" button. */
  moreTargetId?: string;
  /** Story ids already shown elsewhere on the page; left out BEFORE the first 3 are taken. Default: none. */
  excludeIds?: readonly string[];
};

export default function MemberStoriesPreview({ moreTargetId, excludeIds }: Props) {
  const stories = excludeIds && excludeIds.length > 0 ? previewTestimonials(excludeIds) : PREVIEW_TESTIMONIALS;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {stories.map((t) => (
          <TestimonialCard key={t.id} t={t} />
        ))}
      </div>
      {moreTargetId && (
        <div className="mt-2 text-center">
          <button
            type="button"
            onClick={() => scrollToTarget(moreTargetId)}
            className="inline-flex min-h-[44px] items-center justify-center px-3 py-2 text-blue-600 text-sm font-semibold hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 rounded-lg"
          >
            Read more member stories ↓
          </button>
        </div>
      )}
    </div>
  );
}
