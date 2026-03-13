import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import newHero from "@/public/images/newHero.webp";
import Image from "next/image";
import { HERO_STATS_AR, HERO_STATS_EN } from "@/data/heroStats";
import HeroSearchBar from "./HeroSearchBar";

interface NewHeroProps {
  t: {
    hero: {
      title: string;
      subtitle: string;
    };
  };
  isRtl: boolean;
}

export default function NewHero({ t, isRtl }: NewHeroProps) {
  const HERO_STATS = isRtl ? HERO_STATS_AR : HERO_STATS_EN;

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
          quality={75}
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
        <div className="w-full max-w-8xl mx-auto text-center px-4 sm:px-6 md:px-12 lg:px-16 py-20 sm:py-28 lg:py-36 xl:py-48 2xl:py-56">
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
              <h1 className="leading-[1.15] sm:leading-[1.1] font-extrabold tracking-tight text-[32px] sm:text-[40px] md:text-[45px] lg:text-[58px] ">
                <span className="text-white block">{t.hero.title}</span>
              </h1>
              <p className="text-white/90 mx-auto text-base sm:text-lg md:text-xl lg:text-[20px] xl:text-[22px]  font-medium sm:font-bold leading-relaxed mt-4 sm:mt-6 lg:mt-8 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Search */}
            <div>
              <HeroSearchBar />
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-0 ${isRtl ? "" : "sm:flex-row-reverse"}`}
            >
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
                  <span className="text-1xl sm:text-2xl lg:text-3xl  font-black text-white">
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
