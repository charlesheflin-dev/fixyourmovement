import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { initMetaPixel, trackPageView } from "./lib/metaPixel";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieConsent from "./components/CookieConsent.tsx";
import ExitPopup from "./components/ExitPopup.tsx";
import FCSNewsletterJoin from "./pages/FCSNewsletterJoin";
// /lp/cold-start is the paid-ad landing page: it stays in the main bundle so it draws
// without waiting on a second download. Every other page is code-split (2026-11-12
// mobile-speed fix: the single 1.28 MB bundle carried all ~30 pages to every visitor).
import ColdStart from "./pages/ColdStart";
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const ThankYou = lazy(() => import("./pages/ThankYou.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy.tsx"));
const EULA = lazy(() => import("./pages/EULA.tsx"));
const HsaFsa = lazy(() => import("./pages/HsaFsa"));
const DrJonathanSchutza = lazy(() => import("./pages/DrJonathanSchutza"));
const NewIndex = lazy(() => import("./pages/NewIndex.tsx"));
const EmailConfirmation = lazy(() => import("./pages/EmailConfirmation"));
const DownloadApp = lazy(() => import("./pages/DownloadApp"));
const Unsubscribed = lazy(() => import("./pages/Unsubscribed"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Upgrade = lazy(() => import("./pages/Upgrade"));
const Results = lazy(() => import("./pages/Results"));
const AskDrJonathanPage = lazy(() => import("./pages/AskDrJonathan"));
const GuideMorning = lazy(() => import("./pages/GuideMorning"));
const GuideToughDay = lazy(() => import("./pages/GuideToughDay"));
const GuideNext = lazy(() => import("./pages/GuideNext"));
const FootCapacitySystem = lazy(() => import("./pages/FootCapacitySystem"));
const WhenToGetSeenInPerson = lazy(() => import("./pages/WhenToGetSeenInPerson"));
const AskDrJonathan = lazy(() => import("./components/AskDrJonathan.tsx"));

function AskDrJonathanGlobal() {
  const { pathname } = useLocation();
  const excluded = [
    "/assessment",
    "/assessment-results",
    "/email-confirmation",
    "/thank-you",
    "/unsubscribed",
    "/ask",
    "/dr-jonathan-schutza",
    "/lp/cold-start",
  ];
  if (excluded.some((path) => pathname.startsWith(path))) return null;
  return (
    <Suspense fallback={null}>
      <AskDrJonathan />
    </Suspense>
  );
}

const queryClient = new QueryClient();

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Capture ?source= (ad/channel attribution, e.g. Kindle) into first-party cookies,
// mirroring the blog's fcs_first_article/fcs_last_article semantics: first-touch is
// write-once (frozen), last-touch overwrites each time. Host-only, path=/, ~400d,
// SameSite=Lax — the article-cookie attributes. Same [A-Za-z0-9/_-] charset; a
// malformed value is ignored. Read at signup by the create-trial-profile callers.
function SourceCapture() {
  const { search } = useLocation();

  useEffect(() => {
    const raw = new URLSearchParams(search).get("source");
    if (!raw) return;
    const s = raw.trim().slice(0, 200);
    if (!/^[A-Za-z0-9/_-]+$/.test(s)) return;
    if (s === "hsa") return;   // reserved internal nav marker (HsaFsa -> /checkout?source=hsa), not an ad channel
    const enc = encodeURIComponent(s);
    const attrs = "path=/; max-age=34560000; SameSite=Lax";
    if (!document.cookie.split("; ").some(row => row.startsWith("fcs_first_source="))) {
      document.cookie = `fcs_first_source=${enc}; ${attrs}`;
    }
    document.cookie = `fcs_last_source=${enc}; ${attrs}`;
  }, [search]);

  // Ad click ids (Google gclid + Meta fbclid). URL-safe, so the existing source gate fits.
  // Mirrors the fcs_first/last_source seam: write-once first-touch, always-overwrite last-touch.
  useEffect(() => {
    const attrs = "path=/; max-age=34560000; SameSite=Lax";
    const params = new URLSearchParams(search);
    (["gclid", "fbclid"] as const).forEach((key) => {
      const raw = params.get(key);
      if (!raw) return;
      const v = raw.trim().slice(0, 200);
      if (!/^[A-Za-z0-9/_-]+$/.test(v)) return;
      const enc = encodeURIComponent(v);
      if (!document.cookie.split("; ").some(row => row.startsWith(`fcs_first_${key}=`))) {
        document.cookie = `fcs_first_${key}=${enc}; ${attrs}`;
      }
      document.cookie = `fcs_last_${key}=${enc}; ${attrs}`;
    });
  }, [search]);

  // GA4 client_id (the _ga identity). NOT a URL param and it CONTAINS A DOT, so the source
  // gate rejects it — use a dot-tolerant gate. Ask gtag first; fall back to parsing _ga.
  // gtag.js loads async, so tolerate window.gtag not being ready yet (no throw, no block).
  useEffect(() => {
    if (document.cookie.split("; ").some(row => row.startsWith("fcs_ga_client_id="))) return;
    const attrs = "path=/; max-age=34560000; SameSite=Lax";
    const writeClientId = (id: string) => {
      const v = (id || "").trim();
      if (!/^[A-Za-z0-9._-]{1,64}$/.test(v)) return;
      if (document.cookie.split("; ").some(row => row.startsWith("fcs_ga_client_id="))) return;
      document.cookie = `fcs_ga_client_id=${encodeURIComponent(v)}; ${attrs}`;
    };
    try {
      const g = (window as any).gtag;
      if (typeof g === "function") {
        g("get", "G-YGDHT1TE6Y", "client_id", (id: string) => { if (id) writeClientId(id); });
      }
    } catch { /* gtag not ready — fall through to _ga parse */ }
    const ga = document.cookie.split("; ").find(row => row.startsWith("_ga="));
    if (ga) {
      const parts = ga.split(".");
      if (parts.length >= 4) writeClientId(`${parts[2]}.${parts[3]}`);
    }
  }, []);

  // Mint a stable first-party anon id once (funnel-events spine, Change 3 Tier 1).
  // Host-only, write-once — mirrors the fcs_first_source seam above, and SourceCapture
  // sits ahead of the routed pages so this is set before any funnel page mounts.
  // Unconditional (no consent branch): CookieConsent is notice-only, gates nothing.
  useEffect(() => {
    if (!document.cookie.split("; ").some(row => row.startsWith("fcs_anon="))) {
      document.cookie = `fcs_anon=${crypto.randomUUID()}; path=/; max-age=34560000; SameSite=Lax`;
    }
  }, []);

  return null;
}

// Post-trial survey retired 2026-10-08: /survey now forwards straight to the
// results page, preserving the original query string (e.g. ?email=...). The
// PostTrialSurvey page was deleted 2026-11-12 (no route had rendered it since the
// retirement); the save-survey-response fn source + survey tables are kept in place.
function SurveyRedirect() {
  const { userId } = useParams<{ userId: string }>();
  const { search } = useLocation();
  const target = userId ? `/results/${userId}${search}` : `/results${search}`;
  return <Navigate to={target} replace />;
}

// Meta Pixel: init once on mount (bails if VITE_META_PIXEL_ID is empty OR the first
// page of the session is a sensitive route), then fire a manual, route-gated PageView
// on each route change. Inside BrowserRouter so useLocation works. Mirrors SourceCapture.
function MetaPixelTracker() {
  const { pathname } = useLocation();
  useEffect(() => {
    initMetaPixel();
  }, []);
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <SourceCapture />
        <MetaPixelTracker />
        <CookieConsent />
        {/* <ExitPopup /> */}
        <AskDrJonathanGlobal />
        <Suspense fallback={null}>
         <Routes>
           <Route path="/" element={<NewIndex />} />
           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
           <Route path="/terms-of-service" element={<TermsOfService />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/eula" element={<EULA />} />
             <Route path="/hsa-fsa" element={<HsaFsa />} />
             <Route path="/dr-jonathan-schutza" element={<DrJonathanSchutza />} />
               {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="/email-confirmation" element={<EmailConfirmation />} />
                  <Route path="/lp/newsletter" element={<Navigate to="/lp/download" replace />} />
                   <Route path="/lp/take-assessment" element={<Navigate to="/lp/download" replace />} />
                    <Route path="/lp/download" element={<DownloadApp />} />
                   <Route path="/lp/cold-start" element={<ColdStart />} />
                   {/* Assessment funnel retired - old /assessment links land on /lp/download */}
                   <Route path="/assessment" element={<Navigate to="/lp/download" replace />} />
                   <Route path="/start/*" element={<Navigate to="/lp/download" replace />} />
                   <Route path="/unsubscribed" element={<Unsubscribed />} />
                   <Route path="/checkout" element={<Checkout />} />
                   <Route path="/upgrade" element={<Upgrade />} />
                   <Route path="/survey/:userId" element={<SurveyRedirect />} />
                   <Route path="/survey" element={<SurveyRedirect />} />
                   <Route path="/results/:userId" element={<Results />} />
                   <Route path="/results" element={<Results />} />                   <Route path="/assessment-results" element={<Navigate to="/lp/download" replace />} />
                   <Route path="/ask" element={<AskDrJonathanPage />} />
                    <Route path="/guide/morning" element={<GuideMorning />} />
                    <Route path="/guide/tough-day" element={<GuideToughDay />} />
                    <Route path="/guide/next" element={<GuideNext />} />
                    <Route path="/foot-capacity-system" element={<FootCapacitySystem />} />
                    <Route path="/when-to-get-seen-in-person" element={<WhenToGetSeenInPerson />} />
                    <Route path="*" element={<NotFound />} />
         </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;