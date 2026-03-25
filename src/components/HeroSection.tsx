import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
      </div>

      <div className="relative container mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-4">
            <span className="trust-badge">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-sage">
                <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" fill="currentColor" />
              </svg>
              Created by Dr. Jonathan Schutza, PT, DPT
            </span>
            <p className="text-sm text-muted-foreground mt-2 font-body">
              Doctor of Physical Therapy specializing in biomechanics-driven foot rehabilitation.
            </p>
          </div>

          <h1 className="font-display text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-primary leading-tight mb-4">
            Foot Pain Doesn't Keep Coming Back by Accident
          </h1>

          <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-coral-deep italic mb-4 leading-snug">
            Most treatments calm symptoms. Few rebuild the strength and load capacity your feet actually need.
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 font-body leading-relaxed">
            A structured 12-week system designed to rebuild foot strength, restore load tolerance, and help your feet handle real life again, from home.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="video-container aspect-video max-w-3xl mx-auto"
          >
            <div className="w-full h-full flex items-center justify-center bg-navy-deep relative rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-navy/90 to-navy-deep flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-coral/90 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-coral transition-colors hover:scale-105 transform duration-200">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="ml-1">
                      <path d="M8 5V19L19 12L8 5Z" fill="hsl(40, 33%, 96%)" />
                    </svg>
                  </div>
                  <p className="text-primary-foreground/80 font-body text-base md:text-lg">
                    Watch the Video
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Checkout Button Below Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8"
          >
            {/* 
            <a
              href="https://whop.com/checkout/plan_Kb2UZ3Iqj7Vn9"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button animate-pulse-glow text-xl"
            >
              Get Instant Access to The Foot Capacity System Today
            </a>
            */}
            <button
              className="cta-button opacity-70 cursor-not-allowed text-xl"
              disabled
            >
              Registration Opening Soon
            </button>
            <p className="mt-4 text-muted-foreground text-base">
              Secure checkout · Instant access · No subscription
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
