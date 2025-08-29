import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import UploadSection from "@/components/upload-section";
import HowItWorks from "@/components/how-it-works";
import FeaturesSection from "@/components/features-section";
import AboutSection from "@/components/about-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <HeroSection />
        <UploadSection />
        <HowItWorks />
        <FeaturesSection />
        <AboutSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
