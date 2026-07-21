import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import Walkthrough from "./pages/Walkthrough";
import HsaFsa from "./pages/HsaFsa";
import NewIndex from "./pages/NewIndex.tsx";
import NewWalkthrough from "./pages/NewWalkthrough.tsx";
import Index_archive from "./pages/Index_archive_2026_05_25";
import Walkthrough_archive from "./pages/Walkthrough_archive_2026_05_25";
import CookieConsent from "./components/CookieConsent.tsx";
import ExitPopup from "./components/ExitPopup.tsx";
import EmailConfirmation from "./pages/EmailConfirmation";
import FCSNewsletterJoin from "./pages/FCSNewsletterJoin";
import TakeAssessment from "./pages/TakeAssessment";
import DownloadApp from "./pages/DownloadApp";
import Assessment from "./pages/Assessment";
import AssessmentPage from "./pages/AssessmentPage";
import Unsubscribed from "./pages/Unsubscribed";
import Checkout from "./pages/Checkout";
import Results from "./pages/Results";
import AssessmentResults from "./pages/AssessmentResults";
import AskDrJonathanPage from "./pages/AskDrJonathan";
import AskDrJonathan from "./components/AskDrJonathan.tsx";

function AskDrJonathanGlobal() {
  const { pathname } = useLocation();
  const excluded = [
    "/assessment",
    "/assessment-results",
    "/email-confirmation",
    "/thank-you",
    "/unsubscribed",
    "/ask",
  ];
  if (excluded.some((path) => pathname.startsWith(path))) return null;
  return <AskDrJonathan />;
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <CookieConsent />
        <ExitPopup />
        <AskDrJonathanGlobal />
         <Routes>
           <Route path="/" element={<Index />} />
           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
           <Route path="/terms-of-service" element={<TermsOfService />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/choose-your-plan" element={<ChooseYourPlan />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/eula" element={<EULA />} />
             <Route path="/walkthrough" element={<Walkthrough />} />
             <Route path="/hsa-fsa" element={<HsaFsa />} />
               {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                 <Route path="/newindex" element={<NewIndex />} />
                 <Route path="/newwalkthrough" element={<NewWalkthrough />} />
                  <Route path="/oldindex" element={<Index_archive />} />
                  <Route path="/oldwalkthrough" element={<Walkthrough_archive />} />
                <Route path="/email-confirmation" element={<EmailConfirmation />} />
                  <Route path="/lp/newsletter" element={<Navigate to="/lp/take-assessment" replace />} />
                   <Route path="/lp/take-assessment" element={<TakeAssessment />} />
                    <Route path="/lp/download" element={<DownloadApp />} />
                  <Route path="/assessment-preview" element={<AssessmentPage />} />
                   <Route path="/assessment" element={<Assessment />} />
                   <Route path="/start/*" element={<Navigate to="/lp/take-assessment" replace />} />
                   <Route path="/unsubscribed" element={<Unsubscribed />} />
                   <Route path="/checkout" element={<Checkout />} />
                   <Route path="/results/:userId" element={<Results />} />
                   <Route path="/results" element={<Results />} />                   <Route path="/assessment-results" element={<AssessmentResults />} />
                   <Route path="/ask" element={<AskDrJonathanPage />} />
                    <Route path="*" element={<NotFound />} />
         </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;