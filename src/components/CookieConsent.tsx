import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const hasConsented = localStorage.getItem("fixyourmovement_cookie_consent");
    if (!hasConsented) {
      // Small delay so it doesn't pop up instantly on first load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("fixyourmovement_cookie_consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pb-6 md:pb-8 flex justify-center pointer-events-none"
        >
          <div className="bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-5 md:p-6 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto">
            <div className="text-sm md:text-base text-muted-foreground font-body text-center sm:text-left flex-1">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Got it," you consent to our use of cookies. Read our{" "}
              <Link to="/privacy-policy" className="text-blue hover:text-blue-dark transition-colors">
                Privacy Policy
              </Link>{" "}
              to learn more.
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto">
              <Button 
                onClick={handleAccept} 
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-slate-800 font-display rounded-xl py-6 px-10 text-lg transition-transform hover:scale-105 active:scale-95"
              >
                Got it
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
