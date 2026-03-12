import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
      </div>

      <div className="relative container mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-6">
            <span className="trust-badge">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-sage">
                <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" fill="currentColor"/>
              </svg>
              Created by Dr. Jonathan, DPT
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-primary leading-tight mb-8">
            If stretching, orthotics, and rest haven't fixed your plantar fasciitis...{" "}
            <span className="text-coral-deep italic">the real problem may not be your plantar fascia.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body leading-relaxed">
            Discover the structured, at-home system that rebuilds your foot's strength 
            and load capacity — so you can walk, move, and live without pain.
          </p>

          <a href="#video" className="cta-button animate-pulse-glow text-xl">
            Watch the Free Presentation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
