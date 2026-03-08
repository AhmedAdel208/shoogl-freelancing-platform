import { useLocaleStore } from "@/stores/useLocaleStore";
import { ar } from "@/locales/ar";
import { en } from "@/locales/en";

export const useTranslation = () => {
  const { locale, toggleLocale, setLocale } = useLocaleStore();
  
  const t = locale === 'ar' ? ar : en;
  
  const isRtl = locale === 'ar';
  
  return { t, locale, toggleLocale, setLocale, isRtl };
};
