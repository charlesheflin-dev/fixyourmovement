import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import WhatItIsSection from "@/components/WhatItIsSection";
import TransformationSection from "@/components/TransformationSection";
import DoctorCredibility from "@/components/DoctorCredibility";
import TestimonialSection from "@/components/TestimonialSection";
import BonusSection from "@/components/BonusSection";
import FinalCTA from "@/components/FinalCTA";
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
        <TestimonialSection />
        <BonusSection />
        <FinalCTA />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
