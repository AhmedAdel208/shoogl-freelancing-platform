import NewHero from "@/components/landing/heroImg/NewHero";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import dynamic from 'next/dynamic';

const ProcessSection = dynamic(() => import('@/components/landing/modern-services/ProcessSection'), {
  ssr: true,
});

const ModernServices = dynamic(() => import('@/components/landing/modern-services/ModernServices'), {
  ssr: true,
});

const ContactCTA = dynamic(() => import('@/components/landing/contact/ContactCTA'), {
  ssr: true,
});

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
