import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import DemoSection from "@/components/DemoSection";
import PerformanceSection from "@/components/PerformanceSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import Footer from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <ProblemSection />
      <DemoSection />
      <PerformanceSection />
      <ArchitectureSection />
      <Footer />
    </div>
  );
};

export default Index;
