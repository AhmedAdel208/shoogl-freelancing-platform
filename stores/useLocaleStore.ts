import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Locale = 'ar' | 'en';

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: 'ar',
      setLocale: (locale) => set({ locale }),
      toggleLocale: () =>
        set((state) => ({
          locale: state.locale === 'ar' ? 'en' : 'ar',
        })),
    }),
    {
      name: 'shogol-locale',
    }
  )
);
