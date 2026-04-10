import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ValueSection } from "@/components/sections/ValueSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { FlowSection } from "@/components/sections/FlowSection";
import { ProductSection } from "@/components/sections/ProductSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative bg-neo-black">
      <Navbar />
      <HeroSection />
      <ValueSection />
      <SolutionSection />
      <FlowSection />
      <ProductSection />
      <CTASection />
      <Footer />
    </main>
  );
}
