"use client";

import ContactForm from "./ContactForm";
import { Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ContactSection() {
  const { isRtl } = useTranslation();

  return (
    <div className="relative pb-24 select-none bg-bg transition-colors duration-500">
      {/* Premium Header Section */}
      <div className="relative bg-slate-950 overflow-hidden py-32 mb-16">
        {/* Decorative Glows */}
        <div className={`absolute top-0 ${isRtl ? 'right-0 -mr-48' : 'left-0 -ml-48'} w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] -mt-58`} />
        <div className={`absolute bottom-0 ${isRtl ? 'left-0 -ml-32' : 'right-0 -mr-32'} w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] -mb-42`} />
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-primary text-[11px] font-black font-cairo tracking-[0.2em] mb-8 uppercase">
            <Sparkles size={16} className="animate-pulse" />
            {isRtl ? "نحن مهتمون بسماع صوتك" : "We are Interested in your feedback"}
          </div>
          
          <h1 className="text-[44px] md:text-[64px] font-black text-white font-cairo leading-[1.1] mb-8 drop-shadow-2xl">
            {isRtl ? (
              <>تواصل <span className="text-primary italic">معنا</span></>
            ) : (
              <>Contact <span className="text-primary italic">Us</span></>
            )}
          </h1>
          
          <p className="text-white/50 font-bold font-cairo text-xl max-w-2xl mx-auto leading-relaxed">
            {isRtl 
              ? "نحن هنا لمساعدتك والإجابة على استفساراتك. تواصل معنا وسنرد عليك في أقرب وقت."
              : "We are here to help and answer your questions. Contact us and we will get back to you as soon as possible."}
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-4xl mx-auto px-6 -mt-24 relative z-20">
        <div className="bg-card-bg rounded-[40px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-border p-2 sm:p-4 overflow-hidden group">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
