"use client";

import Link from "next/link";
import { LogIn, UserRoundPlus } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function NotLoggedInActions() {
  const { t, isRtl } = useTranslation();

  return (
    <div className="bg-card-bg rounded-[24px] shadow-sm border border-border p-8 sticky top-28 overflow-hidden group">
      {/* Decorative gradient blur */}
      <div className={`absolute top-0 ${isRtl ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-[200px] h-[200px] bg-primary/10 rounded-full blur-[60px] -z-10 -translate-y-1/2 transition-all duration-700 group-hover:bg-primary/20`} />

      <div className="flex flex-col items-center mb-7">
        <div className="w-16 h-16 rounded-2xl bg-bg border border-border shadow-xl flex items-center justify-center text-primary/70 mb-4 group-hover:scale-110 transition-transform duration-500 relative">
          <UserRoundPlus size={28} strokeWidth={2.5} className="group-hover:text-primary transition-colors duration-500" />
          <div className={`absolute top-1 ${isRtl ? 'right-1' : 'left-1'} w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-card-bg animate-pulse shadow-sm`} />
        </div>
        <h3 className="text-[1.15rem] font-black text-heading font-cairo mb-2 text-center leading-tight">
          {isRtl ? "هذا المشروع مطلوب جداً!" : "This project is highly requested!"}
        </h3>
        <p className="text-[14px] text-gray-medium text-center font-cairo leading-relaxed max-w-[90%] font-bold">
          {isRtl ? "سجل دخولك الآن لتتمكن من تقديم عرض لمناقشة العميل." : "Log in now to submit a proposal and discuss details with the client."}
        </p>
      </div>

      <Link
        href="/login"
        className="relative w-full overflow-hidden rounded-[16px] font-bold font-cairo text-base group/btn shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/30 active:scale-[0.98] block"
      >
        <div className="absolute inset-0 bg-linear-to-r from-primary via-teal-400 to-primary bg-size-[200%_auto] animate-[gradient_3s_linear_infinite]" />
        
        <div className="relative flex items-center justify-center gap-2.5 py-4 px-6 text-white bg-black/5 hover:bg-black/10 transition-colors">
          {!isRtl && <LogIn size={20} strokeWidth={2.5} />}
          <span className="mb-px tracking-wide font-black uppercase">
            {isRtl ? "بدء تسجيل الدخول" : "Login to proceed"}
          </span>
          {isRtl && <LogIn size={20} strokeWidth={2.5} className="group-hover/btn:-translate-x-1 transition-transform" />}
        </div>
      </Link>
    </div>
  );
}
