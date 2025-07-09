import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import GallerySection from "@/components/gallery-section";
import ProcessSection from "@/components/process-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
