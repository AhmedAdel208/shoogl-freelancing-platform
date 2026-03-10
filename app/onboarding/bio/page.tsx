import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import BioPage from "@/features/onboarding/bio/BioPage";

export default function Page() {
 
  return <>
    <header className="bg-bg">
      <Gradientline/>
      <LinksHeader/>
    </header>
    <BioPage />
    <Footer/>
  </>;
}


