import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import SkillsPage from "@/features/onboarding/skills/SkillsPage";

export default function Page() {

  return <>
    <header className="bg-bg">
      <Gradientline/>
      <LinksHeader/>
    </header>
    <SkillsPage />
    <Footer/>
  </>;
}
