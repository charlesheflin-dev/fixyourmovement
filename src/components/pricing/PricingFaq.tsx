import { lazy, Suspense, useState } from "react";

// Shared "How much does it cost after the free check-ins?" FAQ item for /lp/download + /lp/cold-start
// (Charles 2026-11-19). The link opens PricingModal (the /foot-capacity-system price cards, no buy
// buttons). The modal is React.lazy: its chunk (Radix dialog + cards) loads on first tap only, so the
// landing pages' first load is unchanged. Prices quoted here must match PricingSection / the pay gate.
const PricingModal = lazy(() => import("@/components/pricing/PricingModal"));

export const PRICING_FAQ_Q = "How much does it cost after the free check-ins?";
export const PRICING_FAQ_A =
  "$47 a month, or $297 one time for lifetime access. There's also a 6-month plan and a premium lifetime option. Every plan has a 30-day money-back guarantee.";

export function usePricingModal(label: string) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const show = () => {
    setMounted(true);
    setOpen(true);
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.("event", "pricing_modal_open", { event_category: "engagement", event_label: label });
  };
  const modal = mounted ? (
    <Suspense fallback={null}>
      <PricingModal open={open} onOpenChange={setOpen} />
    </Suspense>
  ) : null;
  return { show, modal };
}

export function PricingFaqLink({ onClick, className, tabIndex }: { onClick: () => void; className?: string; tabIndex?: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={tabIndex}
      className={`text-blue-600 font-semibold underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${className ?? ""}`}
    >
      Compare all plans →
    </button>
  );
}
