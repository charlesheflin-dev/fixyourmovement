import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import WhatItIsSection from "@/components/WhatItIsSection";
import ProgramSection from "@/components/ProgramSection";
import BonusSection from "@/components/BonusSection";
import DrJonathanSection from "@/components/DrJonathanSection";
import TransformationSection from "@/components/TransformationSection";
import MissionSection from "@/components/MissionSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <VideoSection />
        <ProblemSection />
        <SolutionSection />
        <WhatItIsSection />
        <ProgramSection />
        <BonusSection />
        <DrJonathanSection />
        <TransformationSection />
        <MissionSection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
