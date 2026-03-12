import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VisualSystemMap from "@/components/VisualSystemMap";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import WhatItIsSection from "@/components/WhatItIsSection";
import DoctorCredibility from "@/components/DoctorCredibility";
import ProgramSection from "@/components/ProgramSection";
import BonusSection from "@/components/BonusSection";
import DrJonathanSection from "@/components/DrJonathanSection";
import TransformationSection from "@/components/TransformationSection";
import MissionSection from "@/components/MissionSection";
import TestimonialSection from "@/components/TestimonialSection";
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
        <VisualSystemMap />
        <ProblemSection />
        <TestimonialSection />
        <SolutionSection />
        <WhatItIsSection />
        <DoctorCredibility />
        <ProgramSection />
        <BonusSection />
        <DrJonathanSection />
        <TransformationSection />
        <MissionSection />
        <TestimonialSection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
