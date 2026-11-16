import { useState } from "react";
import { SOURCE_LABEL, STREAM_CUSTOMER, type VideoTestimonial as Video } from "@/data/testimonials";

// Vertical (9:16) member video. Renders a poster + play button only; the Cloudflare Stream iframe is
// created after the visitor taps (then autoplays), same tap-to-load pattern as the Dr. Jonathan video on
// /lp/download and /lp/cold-start. SSR-safe: no window access at render, so the prerendered HTML is the
// poster state and hydration matches.
export default function VideoTestimonial({ video }: { video: Video }) {
  const [started, setStarted] = useState(false);
  const base = `${STREAM_CUSTOMER}/${video.streamId}`;
  const title = `Video story from ${video.name}`;

  return (
    <figure className="w-full max-w-[340px] mx-auto">
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-slate-900"
        style={{ paddingTop: "177.78%" }}
      >
        {started ? (
          <iframe
            src={`${base}/iframe?autoplay=true`}
            style={{ border: "none", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title={title}
          />
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            aria-label={`Play the video story from ${video.name}`}
            className="absolute inset-0 w-full h-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
          >
            <img
              src={`${base}/thumbnails/thumbnail.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span
              className="relative w-16 h-16 rounded-full bg-white/90 flex items-center justify-center"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
              aria-hidden="true"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#2563EB">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 flex items-center justify-center gap-3">
        <div className="w-6 h-0.5 bg-blue-600 shrink-0" />
        <div className="text-left">
          <p className="text-blue-600 font-semibold text-sm leading-tight">{video.name}</p>
          {video.source && <p className="text-slate-500 text-xs mt-0.5">{SOURCE_LABEL[video.source]}</p>}
        </div>
      </figcaption>
    </figure>
  );
}
