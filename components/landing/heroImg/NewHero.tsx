"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import newHero from "@/public/images/newHero.webp";
import Image from "next/image";
import { HERO_STATS_AR, HERO_STATS_EN } from "@/data/heroStats";
import { useTranslation } from "@/hooks/useTranslation";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 1.2 + i * 0.1,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
};


import { useUiStore } from "@/stores/useUiStore";

export default function NewHero() {
  const router = useRouter();
  const { t, isRtl } = useTranslation();
  const { heroAnimationPlayed, setHeroAnimationPlayed } = useUiStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const SEARCH_SUGGESTIONS = isRtl ? [
    "تصميم شعار احترافي",
    "تطوير موقع إلكتروني",
    "ترجمة محتوى عربي",
    "تصميم هوية بصرية",
    "برمجة تطبيق جوال",
    "كتابة محتوى تسويقي",
    "تصميم UI/UX",
    "تحسين محركات البحث SEO",
  ] : [
    "Professional Logo Design",
    "Website Development",
    "Arabic Translation",
    "Visual Identity Design",
    "Mobile App Programming",
    "Marketing Content Writing",
    "UI/UX Design",
    "Search Engine Optimization SEO",
  ];

  const HERO_STATS = isRtl ? HERO_STATS_AR : HERO_STATS_EN;

  useEffect(() => {
    // Only play animation once per session/visit
    if (!heroAnimationPlayed) {
      const timer = setTimeout(() => {
        setHeroAnimationPlayed(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [heroAnimationPlayed, setHeroAnimationPlayed]);

  // Cycle through placeholder suggestions
  useEffect(() => {
    if (isFocused || searchQuery) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_SUGGESTIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isFocused, searchQuery]);

  const handleSearch = useCallback(() => {
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/announcements?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/announcements");
    }
  }, [searchQuery, router]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch],
  );

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className={`relative min-h-[90vh] flex flex-col overflow-hidden font-cairo bg-slate-900 ${isRtl ? 'text-right' : 'text-left'}`}
    >
      {/* Background Image with slow zoom animation */}
      <motion.div
        initial={heroAnimationPlayed ? { scale: 1 } : { scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" as const }}
        className="absolute inset-0"
      >
        <Image
          src={newHero}
          alt="منصة شغل - خلفية"
          fill
          className="absolute inset-0 w-full h-full object-cover"
          priority
          quality={60}
          sizes="100vw"
          placeholder="blur"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/30 via-transparent to-slate-950/90" />
      <div className="absolute inset-0 bg-linear-to-l from-primary/10 via-transparent to-teal-900/60" />

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 15}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto text-center px-6 md:px-16 py-28 md:py-36">
          <motion.div
            className="max-w-4xl mx-auto space-y-12"
            variants={containerVariants}
            initial={heroAnimationPlayed ? "visible" : "hidden"}
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping shrink-0" />
              {isRtl ? "الجيل القادم من منصات العمل الحر" : "Next Generation Freelance Platform"}
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp}>
              <h1 className="leading-[1.05] font-extrabold tracking-tight text-[32px] md:text-[48px] lg:text-[62px]">
                <span className="text-white block">{t.hero.title}</span>
              </h1>
              <motion.p
                variants={fadeIn}
                className="text-white mx-auto text-[22px] font-bold leading-relaxed mt-8 max-w-xl"
              >
                {t.hero.subtitle}
              </motion.p>
            </motion.div>

            {/* Search - Alive & Functional */}
            <motion.div variants={scaleIn}>
              <div className="relative group">
                <motion.div
                  className="absolute -inset-px bg-linear-to-l from-primary to-teal-400 rounded-[18px] blur-sm"
                  animate={{
                    opacity: isFocused ? 0.5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <div
                  className={`relative flex items-center backdrop-blur-xl rounded-2xl p-2 pr-5 gap-2 transition-all duration-300 ${
                    isFocused
                      ? "bg-white/15 border border-primary/30 shadow-xl"
                      : "bg-white/10 border border-white/10"
                  } ${isRtl ? 'pr-5' : 'pl-5'}`}
                >
                  {/* Input with animated placeholder */}
                  <div className="flex-1 relative min-h-[56px] flex items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onKeyDown={handleKeyDown}
                      dir={isRtl ? "rtl" : "ltr"}
                      className={`w-full bg-transparent! border-none! outline-none text-white text-base min-w-0 font-medium relative z-10 ${isRtl ? 'text-right' : 'text-left'}`}
                    />
                    {/* Animated cycling placeholder */}
                    {!searchQuery && !isFocused && (
                      <div className="absolute inset-0 flex items-center pointer-events-none pr-1">
                    <AnimatePresence mode="wait">
                          <motion.span
                            key={placeholderIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeInOut" as const }}
                            className="text-white/40! text-base font-medium"
                          >
                            {SEARCH_SUGGESTIONS[placeholderIndex]}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      )}
                      {!searchQuery && isFocused && (
                      <div className={`absolute inset-0 flex items-center pointer-events-none ${isRtl ? 'pr-1' : 'pl-1'}`}>
                        <span className="text-white/50! text-base font-medium">
                            {isRtl ? "اكتب ما تبحث عنه..." : "Type what you're looking for..."}
                          </span>
                      </div>
                      )}
                  </div>

                  {/* Search button */}
                  <motion.button
                    onClick={handleSearch}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary cursor-pointer text-white w-14 h-14 rounded-xl flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 shrink-0"
                  >
                    <Search size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className={`flex flex-col sm:flex-row gap-3 ${isRtl ? '' : 'sm:flex-row-reverse'}`}>
              <Link href="/announcements" className="flex-1 sm:flex-none">
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full sm:w-auto group overflow-hidden px-9 py-4 rounded-[14px] font-black text-base text-white cursor-pointer shadow-primary/25 hover:shadow-primary/45 transition-all duration-300"
                >
                  <div className="absolute backdrop-blur-sm inset-0 bg-linear-to-l from-primary via-teal-500 to-primary bg-size-[200%_auto] animate-[gradientShift_3s_linear_infinite]" />
                  <div className="relative flex items-center justify-center gap-2">
                    {isRtl ? "استكشف المشاريع" : "Explore Projects"}
                  </div>
                </motion.button>
              </Link>

              <Link href="/workers" className="flex-1 sm:flex-none">
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full cursor-pointer sm:w-auto px-9 py-4 rounded-[14px] font-black text-base text-white bg-white/8 backdrop-blur-xl border border-white/15 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center gap-2">
                    {!isRtl && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                    {isRtl && (
                      <ArrowLeft
                        size={18}
                        className="group-hover:-translate-x-1 transition-transform"
                      />
                    )}
                    {isRtl ? "استكشف المستقلين" : "Explore Freelancers"}
                  </div>
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeIn}
              className="flex items-center pt-6 border-t border-white/10"
            >
              {HERO_STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={statVariants}
                  className="flex-1 flex flex-col items-center gap-1.5 relative"
                >
                  {i !== 0 && (
                    <div className={`absolute ${isRtl ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 w-px h-8 bg-white/10`} />
                  )}
                  <span className="text-xl md:text-3xl font-black text-white">
                    {stat.value}
                  </span>
                  <span className="text-[12px] font-semibold text-white/40 text-center leading-tight uppercase tracking-wider">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
