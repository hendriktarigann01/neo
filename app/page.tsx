import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection"; // ← setelah Hero
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { USPSection } from "@/components/sections/USPSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <AboutSection /> 
      <ProductShowcase />
      <USPSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
