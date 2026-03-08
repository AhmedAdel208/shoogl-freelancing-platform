"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState } from "react";

export const LanguageToggle = () => {
  const { locale, toggleLocale } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="w-14 h-9 bg-card-bg/20 rounded-full animate-pulse border border-border/50" />
  );

  return (
    <button
      onClick={toggleLocale}
      className={`group relative flex items-center justify-between p-1 w-16 h-9 rounded-full bg-light-white border border-border/80 shadow-sm transition-all duration-500 hover:shadow-md active:scale-95`}
    >
      <div 
        className={`absolute top-1 bottom-1 w-7 rounded-full bg-primary/10 border border-primary/20 transition-all duration-500 ease-out shadow-xs ${
          locale === 'ar' ? 'translate-x-0' : '-translate-x-7'
        }`}
      />
      
      <span className={`flex-1 flex items-center justify-center text-[10px] font-black z-10 transition-colors duration-500 ${
        locale === 'ar' ? 'text-primary' : 'text-gray-medium'
      }`}>
        ع
      </span>
      
      <span className={`flex-1 flex items-center justify-center text-[10px] font-black z-10 transition-colors duration-500 ${
        locale === 'en' ? 'text-primary' : 'text-gray-medium'
      }`}>
        EN
      </span>

    
    </button>
  );
};
