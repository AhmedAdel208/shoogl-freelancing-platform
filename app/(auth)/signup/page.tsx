import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import SignupFlow from "@/features/auth/signup/SignupFlow";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white">
        <Gradientline />
        <LinksHeader />
      </header>

      <SignupFlow />

      <Footer />
    </div>
  );
}
