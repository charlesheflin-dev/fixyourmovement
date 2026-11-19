import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import PricingSection from "@/components/pricing/PricingSection";

// Pricing modal for the /lp/download + /lp/cold-start FAQ "How much does it cost after the free check-ins?"
// (Charles 2026-11-19). Shows the same PricingSection as /foot-capacity-system: prices, NO buy buttons.
// Lazy-loaded by the landing pages (React.lazy) so the Radix dialog + price cards never weigh on the
// landing page's first load; the chunk downloads on the first tap of the FAQ link.
export default function PricingModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-24px)] max-w-[600px] max-h-[90dvh] overflow-y-auto rounded-2xl bg-slate-50 p-4 sm:p-6 font-inter">
        <div className="pr-6">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.12em] leading-snug">PLANS &amp; PRICING</p>
          <DialogTitle className="mt-1 text-slate-900 text-2xl font-extrabold tracking-tight leading-tight">
            What it costs after your free check-ins
          </DialogTitle>
          <DialogDescription className="sr-only">
            The Foot Capacity System plans and prices. Your first 7 check-ins are free; you choose a plan inside the app afterward.
          </DialogDescription>
        </div>
        <div className="flex flex-col gap-5">
          <PricingSection />
        </div>
      </DialogContent>
    </Dialog>
  );
}
