import { Header } from "@/components/Header";
import { CtaSection } from "@/components/Home/cta-section";
import { FeaturesSection } from "@/components/Home/features-section";
import { Footer } from "@/components/Home/footer";
import { HeroSection } from "@/components/Home/hero-section";
import { PricingSection } from "@/components/Home/pricing-section";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Header/>
     <HeroSection/>
     <FeaturesSection/>
     <PricingSection/>
     <CtaSection/>
    <Footer/>
    </div>
  );
}
