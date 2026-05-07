import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import Contact from "./pages/Contact.tsx";
import ThankYou from "./pages/ThankYou.tsx";
import ChooseYourPlan from "./pages/ChooseYourPlan.tsx";
import NotFound from "./pages/NotFound.tsx";
import RefundPolicy from "./pages/RefundPolicy.tsx";
import EULA from "./pages/EULA.tsx";
import CookieConsent from "./components/CookieConsent.tsx";

const queryClient = new QueryClient();

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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
        <CookieConsent />
         <Routes>
           <Route path="/" element={<Index />} />
           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
           <Route path="/terms-of-service" element={<TermsOfService />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/choose-your-plan" element={<ChooseYourPlan />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/eula" element={<EULA />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
         </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
