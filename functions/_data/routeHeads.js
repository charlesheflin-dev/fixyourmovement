// Per-route <head> for public SPA routes (SPEC-ai-discoverability-fixes item 8). Homepage head lives
// in index.html. /dr-jonathan-schutza keeps its own function. dropSchema removes the site-wide
// Product JSON-LD on pages it does not describe. Copy approved by Charles 2026-11-13 (W2), plus the
// two new public pages (/foot-capacity-system, /when-to-get-seen-in-person) built 2026-11-13.
// Each key needs a matching one-line route file in functions/ that calls rewriteRouteHead().
export const ROUTE_HEADS = {
  "/checkout": { title: "Plans and Pricing | The Foot Capacity System",
    description: "Four plans for the Foot Capacity System home program: $47 per month, $97 per month for 6 payments then lifetime access, $297 one-time lifetime, or $497 one-time premium lifetime. Checkout is processed by Whop.", dropSchema: false },
  "/hsa-fsa": { title: "Paying With an HSA or FSA | The Foot Capacity System",
    description: "How to use an HSA or FSA card for the Foot Capacity System and the documentation you receive after purchase. Your plan administrator decides eligibility.", dropSchema: false },
  "/contact": { title: "Contact | The Foot Capacity System",
    description: "Questions about the Foot Capacity System program or your purchase? Email contact@fixyourmovement.com.", dropSchema: true },
  "/refund-policy": { title: "Refund Policy | The Foot Capacity System",
    description: "30-day money-back guarantee on every Foot Capacity System plan: try it for 30 days, and if it's not the right fit, email us within 30 days for a refund.", dropSchema: true },
  "/privacy-policy": { title: "Privacy Policy | The Foot Capacity System", description: "How the Foot Capacity System collects, uses and protects your information.", dropSchema: true },
  "/terms-of-service": { title: "Terms of Service | The Foot Capacity System", description: "Terms of service for the Foot Capacity System website and app.", dropSchema: true },
  "/eula": { title: "End User License Agreement | The Foot Capacity System", description: "End user license agreement for the Foot Capacity System app.", dropSchema: true },
  "/foot-capacity-system": { title: "Foot Capacity System Plans & Pricing | Plantar Fasciitis Home Program",
    description: "How the Foot Capacity System works and what it costs. Free for your first 7 check-ins, then choose a plan: $47/month, $97/month for 6 months, or $297 or $497 one time.", dropSchema: false },
  "/when-to-get-seen-in-person": { title: "When to Get Seen in Person for Foot or Heel Pain | The Foot Capacity System",
    description: "The symptoms Dr. Jonathan Schutza, PT, DPT, tells Foot Capacity System members to stop for and get checked in person, word for word from the app.", dropSchema: true },
  "/testimonials": { title: "Member Testimonials | The Foot Capacity System",
    description: "What Foot Capacity System members shared about their foot and heel pain recovery, in their own words. Selected examples shared with permission; individual results vary.", dropSchema: true },
  // Fair comparison page (SPEC-ai-discoverability-fixes item 24, 2026-11-18).
  "/best-at-home-plantar-fasciitis-programs": { title: "Best At-Home Plantar Fasciitis Programs: How to Choose",
    description: "A fair comparison of at-home plantar fasciitis options: the Foot Capacity System, E3 Rehab, Vivobarefoot, free videos, physical therapy and supportive devices. Written by the FCS team.", dropSchema: true },
};
