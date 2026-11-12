import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { downloadHero, coldStartHero, DL_HERO_EXPERIMENT, CS_HERO_EXPERIMENT } from "./heroCopy";

// The literal hero JSX as it stood in the pages BEFORE B2 (staging @ 68c2a60):
// DownloadApp.tsx:320-325 and ColdStart.tsx:615-621. The control copy rendered inside the
// pages' unchanged wrappers must produce byte-identical markup.
const T_H1 = "text-[32px] min-[360px]:text-[34px] md:text-[52px] font-extrabold leading-[1.12] tracking-tight";
const T_BODY = "text-[17px] md:text-[18px] leading-[1.55] text-slate-700";

const ORIGINAL_DOWNLOAD = (
  <>
    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
      Recovery Shouldn't<br />Require A Waiting Room.
    </h1>
    <p className="text-slate-600 text-lg leading-relaxed">
      Just a daily recovery plan from Dr. Jonathan<br className="hidden sm:block" /> delivered directly to your phone.
    </p>
  </>
);

const ORIGINAL_COLD_START = (
  <>
    <h1 className={T_H1}>
      <span className="block text-slate-900">Stop Guessing Your Way Through Plantar Fasciitis.</span>
      <span className="block text-blue-600">Follow a Plan That Adjusts to Your Foot.</span>
    </h1>
    <p className={`${T_BODY} mt-5`}>
      Exercise videos show you what to do. Assigned sets and reps tell you how much. Your daily check-ins help guide what comes next.
    </p>
  </>
);

function renderDownload(variant: string | null | undefined) {
  const hero = downloadHero(variant);
  return renderToStaticMarkup(
    <>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
        {hero.headline}
      </h1>
      <p className="text-slate-600 text-lg leading-relaxed">
        {hero.subhead}
      </p>
    </>,
  );
}

function renderColdStart(variant: string | null | undefined) {
  const hero = coldStartHero(variant);
  return renderToStaticMarkup(
    <>
      <h1 className={T_H1}>
        {hero.headline}
      </h1>
      <p className={`${T_BODY} mt-5`}>
        {hero.subhead}
      </p>
    </>,
  );
}

describe("heroCopy — control is byte-identical to today's hero", () => {
  const dlOriginal = renderToStaticMarkup(ORIGINAL_DOWNLOAD);
  const csOriginal = renderToStaticMarkup(ORIGINAL_COLD_START);

  it("download control markup matches the pre-B2 page", () => {
    expect(renderDownload("control")).toBe(dlOriginal);
    expect(dlOriginal).toContain("Recovery Shouldn&#x27;t<br/>Require A Waiting Room.");
    expect(dlOriginal).toContain('Just a daily recovery plan from Dr. Jonathan<br class="hidden sm:block"/> delivered directly to your phone.');
  });

  it("cold-start control markup (both H1 spans + body <p>) matches the pre-B2 page", () => {
    expect(renderColdStart("control")).toBe(csOriginal);
    expect(csOriginal).toContain("Stop Guessing Your Way Through Plantar Fasciitis.");
    expect(csOriginal).toContain("Follow a Plan That Adjusts to Your Foot.");
    expect(csOriginal).toContain("Your daily check-ins help guide what comes next.");
  });

  it.each([null, undefined, "", "unknown", "constructor", "__proto__"])(
    "unknown/absent variant %p renders control",
    (v) => {
      expect(renderDownload(v)).toBe(dlOriginal);
      expect(renderColdStart(v)).toBe(csOriginal);
    },
  );

  it("experiment ids match the edge registry", () => {
    expect(DL_HERO_EXPERIMENT).toBe("dl-hero-01");
    expect(CS_HERO_EXPERIMENT).toBe("cs-hero-01");
  });
});

// Variant "b" = Dr. Schutza's approved challenger wording (2026-11-12), rendered inside the
// same page wrappers. Strings are asserted character-for-character (em dash = U+2014).
describe("heroCopy — variant b renders the approved challenger copy", () => {
  it("download b: exact headline + subhead, no <br>", () => {
    const html = renderDownload("b");
    expect(html).toBe(
      '<h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">' +
        "Get the Recovery Plan Dr. Jonathan Uses — Free, on Your Phone." +
        "</h1>" +
        '<p class="text-slate-600 text-lg leading-relaxed">' +
        "The same daily plan he uses with his patients, adjusted to how your foot feels each day." +
        "</p>",
    );
    expect(html).not.toContain("<br");
  });

  it("cold-start b: two H1 spans with control classes; body <p> identical to control", () => {
    const html = renderColdStart("b");
    expect(html).toBe(
      `<h1 class="${T_H1}">` +
        '<span class="block text-slate-900">Get Back to Walking Without Thinking About Your Heel.</span>' +
        '<span class="block text-blue-600">Follow a Daily Plan That Adjusts to Your Foot.</span>' +
        "</h1>" +
        `<p class="${T_BODY} mt-5">` +
        "Exercise videos show you what to do. Assigned sets and reps tell you how much. Your daily check-ins help guide what comes next." +
        "</p>",
    );
    expect(coldStartHero("b").subhead).toBe(coldStartHero("control").subhead);
  });

  it("b differs from control on both pages", () => {
    expect(renderDownload("b")).not.toBe(renderDownload("control"));
    expect(renderColdStart("b")).not.toBe(renderColdStart("control"));
  });
});
