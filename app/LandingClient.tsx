"use client";

import NewHero from "@/components/landing/heroImg/NewHero";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import { useTranslation } from "@/hooks/useTranslation";
import dynamic from "next/dynamic";

const ProcessSection = dynamic(
  () => import("@/components/landing/modern-services/ProcessSection"),
);
const ModernServices = dynamic(
  () => import("@/components/landing/modern-services/ModernServices"),
);
const ContactCTA = dynamic(
  () => import("@/components/landing/contact/ContactCTA"),
);

export default function LandingClient() {
  const { t, isRtl } = useTranslation();

  return (
    <div className="bg-bg min-h-screen flex flex-col">
      <Gradientline />
      <LinksHeader />

      <main className="flex-1">
        <NewHero t={t} isRtl={isRtl} />
        <ProcessSection isRtl={isRtl} />
        <ModernServices t={t} isRtl={isRtl} />
        <ContactCTA isRtl={isRtl} />
      </main>

      <Footer />
    </div>
  );
}
