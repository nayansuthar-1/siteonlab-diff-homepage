import HeroSection from "@/components/home/HeroSection";
import ValuesSection from "@/components/home/ValuesSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import TechStackSection from "@/components/home/TechStackSection";
import PortfolioGrid from "@/components/home/PortfolioGrid";
import Testimonials from "@/components/home/Testimonials";
import BlogSection from "@/components/home/BlogSection";
import ContactFormSection from "@/components/home/ContactFormSection";
import Footer from "@/components/home/HomeFooter";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#07090e] text-white selection:bg-orange-500/30 selection:text-orange-200 flex flex-col">
      {/* Main content layers (global SiteNavbar is rendered by the root layout) */}
      <main className="grow">
        {/* 1. Hero Section (with integrated LogoMarquee inside its flow) */}
        <HeroSection />

        {/* 2. Core Strategic Value Badges */}
        <ValuesSection />

        {/* 3. Branding Services Badging Matrix (Anchor: Services) */}
        <div id="services">
          <ServicesSection />
        </div>

        {/* 4. Strategic Methodological Timeline */}
        <ProcessSection />

        {/* 5. Interactive technology stack integrations */}
        <TechStackSection />

        {/* 6. High Fidelity grid portfolio showcasing */}
        <div id="portfolio">
          <PortfolioGrid />
        </div>

        {/* 7. Testimonial Client Asymmetric Quotes Grid */}
        <Testimonials />

        {/* 8. Latest insights blog slider carousel */}
        <BlogSection />

        {/* 9. Interactive Intake lead brief collection form */}
        <ContactFormSection />
      </main>

      {/* Footer (new design, site nav options) */}
      <Footer />
    </div>
  );
}
