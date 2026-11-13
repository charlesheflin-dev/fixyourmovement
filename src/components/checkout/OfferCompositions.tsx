import {
  FunnelHero,
  HsaFsaStrip,
  GuaranteeCard,
  PlanDisclosure,
  TwoLines,
  OfferCardFrame,
  PlanHeader,
  CardDivider,
  SectionEyebrow,
  InsetPanel,
  FeatureIntro,
  FeatureRows,
  BenefitChecklist,
  PaymentSummary,
  PrimaryCta,
  ReassuranceLines,
  DeclineLink,
  IconPlanHeader,
  PriceComparison,
  FeaturePanel,
  InsetNote,
} from "@/components/checkout/OfferPieces";

// Shared $97 Ownership and $497 Premium Lifetime offer compositions, used by both
// /checkout (Checkout.tsx) and /upgrade (Upgrade.tsx) so the approved copy lives in ONE
// place. Presentational only: callers pass every handler, and the per-page wording that
// differs between the two funnels (CTA label, reassurance lines, decline label) is passed
// in by the page. NO logic, routing, analytics or billing lives here.

// $97 Ownership offer card + the trailing HSA/FSA strip, guarantee and disclosure.
// Renders inside the caller's FunnelShell, after the caller's own hero.
export function Ownership97Offer({
  ctaLabel,
  onCta,
  reassurance,
  declineLabel,
  onDecline,
}: {
  ctaLabel: string;
  onCta: () => void;
  reassurance: string[];
  declineLabel: string;
  onDecline: () => void;
}) {
  return (
    <>
      <OfferCardFrame ribbon="YOUR PATH TO LIFETIME ACCESS">
        <PlanHeader title="Your Ownership Plan" price="$97" period="per month" />
        <div className="mt-5">
          <InsetPanel
            heading={<TwoLines first="Your Feet Change." second="FCS Responds." />}
            body="Heel pain can return, even after you're feeling better. If it does, simply log back in and record your pain. FCS responds with exercises based on your current symptoms, building on your saved recovery history."
          />
        </div>
        <CardDivider />
        <FeatureIntro
          eyebrow="PLUS, FOR YOUR FIRST 6 MONTHS"
          heading={<TwoLines first="Questions?" second="Ask the Person Who Built FCS." />}
          body="Wondering about an exercise, a recovery phase, or why the program works the way it does? Dr. Jonathan can explain the thinking behind FCS, helping you move forward with greater confidence."
        />
        <FeatureRows
          rows={[
            { icon: "message", label: "Two-way communication inside FCS" },
            { icon: "mic", label: "Personal voice replies from Dr. Jonathan" },
          ]}
        />
        <CardDivider />
        <SectionEyebrow>YOUR OWNERSHIP BENEFITS</SectionEyebrow>
        <BenefitChecklist
          items={[
            "Lifetime FCS access after 6 payments",
            "Pain-responsive exercises whenever you need them",
            "Ask Dr. Jonathan AI stays with you",
            "Future FCS program updates included",
          ]}
        />
        <PaymentSummary
          headline="$97/month × 6"
          total="Total investment: $582"
          note="Then lifetime FCS access, with no more monthly fees."
        />
        <PrimaryCta label={ctaLabel} onClick={onCta} />
        <ReassuranceLines lines={reassurance} />
        <DeclineLink label={declineLabel} onClick={onDecline} />
      </OfferCardFrame>
      <HsaFsaStrip />
      <GuaranteeCard />
      <PlanDisclosure>
        Direct communication with Dr. Jonathan is available for the first 6 months and is limited to program-related guidance. Lifetime digital access begins after completing all 6 payments.
      </PlanDisclosure>
    </>
  );
}

// $497 Premium Lifetime offer: hero + card + the trailing HSA/FSA strip, guarantee and
// disclosure. Renders inside the caller's FunnelShell, after the caller's own Back button.
// onChoose = the $497 CTA; onDecline = the "keep my $97/month ownership plan" link.
export function Premium497Offer({ onChoose, onDecline }: { onChoose: () => void; onDecline: () => void }) {
  return (
    <>
      <FunnelHero
        eyebrow="BEFORE YOU FINALIZE YOUR PLAN"
        title={<TwoLines first="You've Chosen Lifetime." second="Now Make It Even Better." />}
        body="You've already committed to your long-term recovery. Now you can enjoy the same 6 months of personal communication with Dr. Jonathan, save $85, and become part of what's next for FCS."
      />
      <OfferCardFrame ribbon="SAVE $85 ON YOUR OWNERSHIP PLAN">
        <IconPlanHeader
          title="Premium Lifetime"
          support="One payment. Yours for life."
          price="$497"
          period="one time"
        />
        <div className="mt-5 mb-6">
          <PriceComparison
            heading="Same Benefits. Lower Total Cost."
            left={{ label: "$97 × 6", amount: "$582", note: "Ownership plan" }}
            right={{ label: "Pay once", amount: "$497", note: "Premium Lifetime" }}
            savings="You Save $85"
          />
        </div>
        <SectionEyebrow>EVERYTHING YOU CHOSE IS INCLUDED</SectionEyebrow>
        <BenefitChecklist
          items={[
            "Lifetime FCS program access and future updates",
            "6 months of direct communication with Dr. Jonathan",
            "Ask Dr. Jonathan AI and your saved recovery history",
          ]}
        />
        <CardDivider />
        <FeaturePanel
          eyebrow="AN EARLY-ADOPTER BENEFIT"
          heading="Help Shape What's Next."
          paragraphs={[
            "Your FCS program focuses on plantar fasciitis recovery. Our upcoming Foot Resilience Library will take you beyond Phase 3, with resources designed to maintain strength, build resilience, and help you stay active doing the things you love.",
            "You'll be among the first invited to explore it, share your experiences, and help shape what we build. Your lifetime access to the new library is included at no additional charge.",
          ]}
          checks={[
            "Early previews and opportunities to share your ideas",
            "Grandfathered Foot Resilience Library access at no additional charge",
          ]}
        />
        <InsetNote>
          Premium Lifetime pricing will start at $697 when the Foot Resilience Library launches. As an early member, your $497 purchase includes the library at no additional charge.
        </InsetNote>
        <PrimaryCta label="Choose My $497 Premium Lifetime Plan" onClick={onChoose} />
        <ReassuranceLines
          lock={false}
          lines={[
            "One secure payment. No monthly fees.",
            "Direct communication with Dr. Jonathan lasts 6 months.",
          ]}
        />
        <DeclineLink label="No thanks, I'll keep my $97/month ownership plan." onClick={onDecline} />
      </OfferCardFrame>
      <HsaFsaStrip />
      <GuaranteeCard />
      <PlanDisclosure>
        Includes the full FCS program, Ask Dr. Jonathan AI, and 6 months of direct personal communication with Dr. Jonathan.
      </PlanDisclosure>
    </>
  );
}
