import NewHero from "@/components/landing/heroImg/NewHero";
import ProcessSection from "@/components/landing/modern-services/ProcessSection";
import ModernServices from "@/components/landing/modern-services/ModernServices";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import ContactCTA from "@/components/landing/contact/ContactCTA";

export default function LandingPage() {
  return (
    <div className="bg-bg min-h-screen flex flex-col">
      <Gradientline />
      <LinksHeader />
      
      <main className="flex-1">     
        <NewHero />        
        <ProcessSection />
        <ModernServices />     
        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
