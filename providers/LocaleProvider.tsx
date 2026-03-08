"use client";

import { useLocaleStore } from "@/stores/useLocaleStore";
import { useEffect, useState } from "react";

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const { locale } = useLocaleStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Update HTML attributes when locale changes
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [locale]);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
};
