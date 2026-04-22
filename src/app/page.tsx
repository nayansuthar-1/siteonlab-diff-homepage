import Hero from "@/components/sections/Hero";
import ServiceCards from "@/components/sections/ServiceCards";
import Stats from "@/components/sections/Stats";
import WhatWeDo from "@/components/sections/WhatWeDo";
import TechExpertise from "@/components/sections/TechExpertise";

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <Stats />
      <WhatWeDo />
      <TechExpertise />
    </>
  );
}
