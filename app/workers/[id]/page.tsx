"use client";

import { useParams } from "next/navigation";
import { Info } from "lucide-react";
import Loading from "@/common/Loading";
import useFreelanceDetails from "@/hooks/workers/useFreelancerDetails";
import FreelancerProfileDetail from "@/container/workers/worke-details/FreelancerProfileDetail";
import Gradientline from "@/components/ui/header/Gradientline";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Footer from "@/components/landing/footer/Footer";

export default function ProfilePage() {
  const { id } = useParams();
  const { data, isLoading, error } = useFreelanceDetails({ id: String(id) });

  if (isLoading) return <Loading />;
  
  const errorMessage = error instanceof Error ? error.message : String(error);

  if (error || !data) {
    return (
      <div className="bg-bg min-h-screen w-full">
        <Gradientline />
        <LinksHeader />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center p-10 bg-card-bg rounded-3xl shadow-sm border border-border max-w-md mx-auto">
            <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
               <Info size={32} />
            </div>
            <h2 className="text-xl font-black text-heading font-cairo mb-2">
              {error ? "حدث خطأ ما" : "المستقل غير موجود"}
            </h2>
            <p className="text-gray-medium font-bold font-cairo">{errorMessage || "عذراً، لم نتمكن من العثور على ملف هذا المستقل."}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-bg min-h-screen w-full">
      <Gradientline />
      <LinksHeader />
      <FreelancerProfileDetail data={data} />
      <Footer />
    </div>
  );
}
