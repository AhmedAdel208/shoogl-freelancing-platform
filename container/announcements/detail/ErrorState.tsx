"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import { ErrorStateProps } from "@/types/detailComponents";
import { useTranslation } from "@/hooks/useTranslation";

export default function ErrorState({
  title,
  message,
  backButtonText,
  backButtonHref = "/announcements",
}: ErrorStateProps) {
  const { t, isRtl } = useTranslation();

  const _title = title || (isRtl ? "المشروع غير موجود" : "Project Not Found");
  const _message = message || (isRtl ? t.projectDetails.errorLoading : "Sorry, we couldn't find the requested project.");
  const _backText = backButtonText || (isRtl ? "العودة للإعلانات" : "Back to Jobs");

  return (
    <div className="bg-bg min-h-screen w-full flex flex-col">
      <header className="sticky top-0 z-50">
        <Gradientline />
        <LinksHeader />
      </header>
      
      <div className="flex-1 px-4 md:px-6 lg:px-8 max-w-8xl mx-auto flex items-center justify-center">
        <div className="text-center max-w-md animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-8 shadow-sm">
            <AlertCircle size={40} strokeWidth={2.5} />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-heading font-cairo mb-4 leading-tight">
            {_title}
          </h1>
          <p className="text-gray-medium font-bold font-cairo mb-10 text-lg opacity-80">{_message}</p>
          
          <Link
            href={backButtonHref}
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black font-cairo hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 hover:shadow-primary/35 hover:-translate-y-1 active:scale-95"
          >
            {!isRtl && <ArrowLeft className="w-5 h-5" strokeWidth={3} />}
            <span>{_backText}</span>
            {isRtl && <ArrowRight className="w-5 h-5" strokeWidth={3} />}
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
