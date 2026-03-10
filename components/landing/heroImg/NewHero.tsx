"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import newHero from "@/public/images/newHero.webp";
import Image from "next/image";
import { HERO_STATS_AR, HERO_STATS_EN } from "@/data/heroStats";
import { useTranslation } from "@/hooks/useTranslation";

export default function NewHero() {
  const router = useRouter();
  const { t, isRtl } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const HERO_STATS = isRtl ? HERO_STATS_AR : HERO_STATS_EN;

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
      className={`relative min-h-[95dvh] md:min-h-[90dvh] flex flex-col overflow-hidden font-cairo bg-slate-900 ${isRtl ? "text-right" : "text-left"}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={newHero}
          alt="منصة شغل - خلفية"
          fill
          className="absolute inset-0 w-full h-full object-cover"
          priority
          quality={70}
          sizes="100vw"
          fetchPriority="high"
          placeholder="blur"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/30 via-transparent to-slate-950/90" />
      <div className="absolute inset-0 bg-linear-to-l from-primary/10 via-transparent to-teal-900/60" />

      {/* Content */}
      <div className="relative flex-1 flex items-center justify-center">
        <div className="w-full max-w-[1440px] mx-auto text-center px-4 sm:px-6 md:px-12 lg:px-16 py-20 sm:py-28 lg:py-36 xl:py-48 2xl:py-56">
          <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12 2xl:space-y-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-xs sm:text-sm font-bold">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary shrink-0" />
              {isRtl
                ? "الجيل القادم من منصات العمل الحر"
                : "Next Generation Freelance Platform"}
            </div>

            {/* Headline */}
            <div>
              <h1 className="leading-[1.15] sm:leading-[1.1] font-extrabold tracking-tight text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] ">
                <span className="text-white block">{t.hero.title}</span>
              </h1>
              <p className="text-white/90 mx-auto text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[24px]  font-medium sm:font-bold leading-relaxed mt-4 sm:mt-6 lg:mt-8 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Search */}
            <div>
              <div className="relative group">
                <div
                  className={`absolute -inset-px bg-linear-to-l from-primary to-teal-400 rounded-[18px] blur-sm transition-opacity duration-300 ${isFocused ? "opacity-50" : "opacity-0"}`}
                />
                <div
                  className={`relative flex items-center backdrop-blur-xl rounded-2xl p-2 pr-5 gap-2 transition-all duration-300 ${
                    isFocused
                      ? "bg-white/15 border border-primary/30 shadow-xl"
                      : "bg-white/10 border border-white/10"
                  } ${isRtl ? "pr-5" : "pl-5"}`}
                >
                  <div className="flex-1 relative min-h-[56px] flex items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onKeyDown={handleKeyDown}
                      placeholder={isRtl ? "اكتب ما تبحث عنه..." : "Type what you're looking for..."}
                      dir={isRtl ? "rtl" : "ltr"}
                      className={`w-full bg-transparent! border-none! outline-none text-white text-sm sm:text-base min-w-0 font-medium relative z-10 placeholder:text-white/50 ${isRtl ? "text-right" : "text-left"}`}
                    />
                  </div>

                  <button
                    onClick={handleSearch}
                    className="bg-primary cursor-pointer text-white w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 shrink-0"
                  >
                    <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-0 ${isRtl ? "" : "sm:flex-row-reverse"}`}>
              <Link href="/announcements" className="w-full sm:w-auto">
                <button className="relative w-full sm:w-auto overflow-hidden px-6 py-3.5 sm:px-9 sm:py-4 rounded-[14px] font-black text-[15px] sm:text-base xl:text-lg text-white cursor-pointer shadow-primary/25 hover:shadow-primary/45 transition-all duration-300">
                  <div className="absolute backdrop-blur-sm inset-0 bg-linear-to-l from-primary via-teal-500 to-primary bg-size-[200%_auto]" />
                  <div className="relative flex items-center justify-center gap-2">
                    {isRtl ? "استكشف المشاريع" : "Explore Projects"}
                  </div>
                </button>
              </Link>

              <Link href="/workers" className="w-full sm:w-auto">
                <button className="w-full cursor-pointer sm:w-auto px-6 py-3.5 sm:px-9 sm:py-4 rounded-[14px] font-black text-[15px] sm:text-base xl:text-lg text-white bg-white/8 backdrop-blur-xl border border-white/15 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group">
                  <div className="flex items-center justify-center gap-2">
                    {!isRtl && (
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    )}
                    {isRtl && (
                      <ArrowLeft
                        size={18}
                        className="group-hover:-translate-x-1 transition-transform"
                      />
                    )}
                    {isRtl ? "استكشف المستقلين" : "Explore Freelancers"}
                  </div>
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 sm:pt-10 lg:pt-12 border-t border-white/10">
              {HERO_STATS.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center gap-1.5 relative p-4 rounded-2xl bg-white/5 md:bg-transparent md:p-0 backdrop-blur-md md:backdrop-blur-none"
                >
                  {i !== 0 && (
                    <div
                      className={`hidden md:block absolute ${isRtl ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 w-px h-10 bg-white/10`}
                    />
                  )}
                  <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl  font-black text-white">
                    {stat.value}
                  </span>
                  <span className="text-[11px] sm:text-xs xl:text-sm font-semibold text-white/50 text-center uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
