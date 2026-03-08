import AdsSection from "@/container/announcements/ads";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";

export default function AnnouncementsPage() {
  return (
    <div className="bg-bg min-h-screen w-full flex flex-col" dir="rtl">
      <div className="sticky top-0 z-50">
        <Gradientline />
        <LinksHeader />
      </div>
      <main className="flex-1">
        <AdsSection />
      </main>
      <Footer />
    </div>
  );
}
