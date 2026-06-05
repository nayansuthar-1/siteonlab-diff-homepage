import Hero from "@/components/sections/Hero";
import ServiceCards from "@/components/sections/ServiceCards";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import WhatWeDo from "@/components/sections/WhatWeDo";
import TechExpertise from "@/components/sections/TechExpertise";
import DomainExpertise from "@/components/sections/DomainExpertise";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <ClientsMarquee />
      <WhatWeDo />
      <TechExpertise />
      <DomainExpertise />
      <Footer />
    </>
  );
}
