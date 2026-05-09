import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/ui/Footer";

export default function Contact() {
  return (
    <main style={{ backgroundColor: "#000" }}>
      <ContactSection />
      <Footer showSchedule={false} />
    </main>
  );
}
