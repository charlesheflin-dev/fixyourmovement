import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import WhatItIsSection from "@/components/WhatItIsSection";
import TransformationSection from "@/components/TransformationSection";
import DoctorCredibility from "@/components/DoctorCredibility";
import DrJonathanSection from "@/components/DrJonathanSection";
import ProgramSection from "@/components/ProgramSection";
import TestimonialSection from "@/components/TestimonialSection";
import PricingSection from "@/components/PricingSection";
import BonusSection from "@/components/BonusSection";
import FinalCTA from "@/components/FinalCTA";
import ObjectionsSection from "@/components/ObjectionsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <WhatItIsSection />
        <TransformationSection />
        <DoctorCredibility />
        <DrJonathanSection />
        <ProgramSection />
        <TestimonialSection />
        <PricingSection />
        <BonusSection />
        <FinalCTA />
        <ObjectionsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
