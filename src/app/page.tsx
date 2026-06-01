import Hero from "@/components/sections/Hero";
import ServiceCards from "@/components/sections/ServiceCards";
import WhatWeDo from "@/components/sections/WhatWeDo";
import TechExpertise from "@/components/sections/TechExpertise";
import DomainExpertise from "@/components/sections/DomainExpertise";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <WhatWeDo />
      <TechExpertise />
      <DomainExpertise />
      <Footer />
    </>
  );
}
