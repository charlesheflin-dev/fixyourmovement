import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import ProblemSection from "@/components/ProblemSection";
import ProgramSection from "@/components/ProgramSection";
import BonusSection from "@/components/BonusSection";
import MissionSection from "@/components/MissionSection";
import PricingSection from "@/components/PricingSection";
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
        <ProgramSection />
        <BonusSection />
        <MissionSection />
        <PricingSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
