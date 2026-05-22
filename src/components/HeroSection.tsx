import { motion } from "framer-motion";


const HeroSection = () => {
  return (
    <section className="relative pt-16 pb-8 md:pt-24 md:pb-12 overflow-hidden">
      <div className="absolute inset-0">
        {/* Desktop Image */}
        <img src="/photo_2026-03-25_13-59-21.jpg" alt="" className="hero-img-desktop hidden md:block w-full h-full object-cover" loading="eager" />
        {/* Mobile Image */}
        <img src="/new-top2.png" alt="" className="block md:hidden w-full h-full object-cover" loading="eager" />
        <style>{`
          .hero-img-desktop {
            filter: grayscale(20%) saturate(70%) brightness(1.02);
            opacity: 0.32;
          }
        `}</style>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(245,248,252,0.96) 0%, rgba(240,244,250,0.88) 55%, rgba(232,238,247,0.78) 100%)" }} />
      </div>

      <div className="relative container mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-2">
            <span className="trust-badge">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue">
                <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" fill="currentColor" />
              </svg>
              Created by Dr. Jonathan Schutza, PT, DPT
            </span>
            <p className="text-sm text-muted-foreground mt-2 font-body">
              Doctor of Physical Therapy specializing in biomechanics-driven foot rehabilitation.
            </p>
          </div>

          <h1 className="font-display text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-primary leading-tight mb-3">
            Stop Chasing Temporary Relief. Rebuild The Capacity Your Feet Actually Need.
          </h1>

          <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-blue italic mb-3 leading-snug">
            A clearer, more structured way to rebuild foot and ankle strength from home, without constantly wondering if you're doing too much, too little, or the wrong thing entirely.
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 font-body leading-relaxed">
            A structured 12-week system designed to rebuild foot strength, restore load tolerance, and help your feet handle real life again, from home.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="video-container max-w-3xl mx-auto shadow-2xl rounded-xl overflow-hidden"
          >
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                                   src="https://customer-hene8ngxxo3eajlj.cloudflarestream.com/8e2a6e0621ae45bb67e928d218736905/iframe?preload=true&poster=https%3A%2F%2Fimagedelivery.net%2FZUbdF1A6bMNaR2l0OC84jw%2F465ad095-c137-48c8-47e0-fb9792922200%2Fpublic"
                loading="lazy"
                style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen={true}
              ></iframe>
            </div>
          </motion.div>

          {/* Checkout Button Below Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8"
          >
            <a
              href="https://fixyourmovement.com/walkthrough"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button animate-pulse-glow text-base md:text-xl"
            >
              <>
                <span className="md:hidden">Start The Guided Recovery Process →</span>
                <span className="hidden md:inline">Start The Guided Recovery Process →</span>
              </>
            </a>
            <p className="mt-4 text-muted-foreground text-base">
              No clinic visits required. Follow from home at your own pace.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
