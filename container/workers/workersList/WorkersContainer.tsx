"use client";

import Image from "next/image";
import Link from "next/link";
import RequestsToolbar from "@/container/workers/workersList/RequestsToolbar";
import { LocationIcon, StarIcon, WorkIcon, ArrowIcon } from "@/public/icons";
import { WorkersContainerProps } from "@/types/workersContainer";
import PremiumSkeletonGrid from "@/common/PremiumSkeletonGrid";
import EmptyState from "@/common/EmptyState";
import ErrorState from "@/common/ErrorState";
import { CheckCircle2, RefreshCw } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function WorkersContainer({
  freelancers,
  totalCount,
  isLoading,
  error,
  refetch,
  searchParams,
  setSearchParams,
}: WorkersContainerProps) {
  const { isRtl, t } = useTranslation();

  return (
    <div
      className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 max-w-[1440px] mx-auto relative overflow-hidden transition-colors duration-500"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Decorative Background Elements */}
      <div className={`absolute top-0 ${isRtl ? 'right-0 lg:right-1/4' : 'left-0 lg:left-1/4'} w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-[80px] md:blur-[100px] -z-10 animate-pulse`} />
      <div className={`absolute top-20 ${isRtl ? 'left-0 lg:left-1/4' : 'right-0 lg:right-1/4'} w-48 h-48 md:w-72 md:h-72 bg-teal-400/5 rounded-full blur-[60px] md:blur-[80px] -z-10 animate-pulse delay-700`} />

      {/* Page Header */}
      <div className="mb-8 md:mb-12 text-center space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-top-6 duration-1000 px-2 sm:px-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black font-cairo text-heading tracking-tight">
          {isRtl ? "تصفح المشتغلين" : "Browse Freelancers"}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl font-bold font-cairo text-gray-medium max-w-2xl mx-auto leading-relaxed opacity-90">
          {isRtl
            ? "استكشف نخبة من المبدعين والخبراء في مختلف المجالات، جاهزون لمساعدتك في إنجاز أعمالك بجودة عالمية."
            : "Explore a selection of creators and experts across various fields, ready to help you finish your tasks with world-class quality."}
        </p>
      </div>

      <RequestsToolbar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      {/* Results Counter Bar */}
      {!isLoading && !error && freelancers.length > 0 && (
        <div className={`mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2 animate-in fade-in duration-700 ${isRtl ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
          <div className="flex items-center gap-2 text-gray-medium font-bold font-cairo">
            <span className="text-primary font-black text-xl sm:text-lg">{totalCount}</span>
            <span className="text-[13px] sm:text-sm opacity-80">
              {isRtl ? "مشتغل متاح حالياً" : "Freelancers available now"}
            </span>
          </div>
          <div className="h-px w-full sm:w-auto flex-1 bg-border sm:mx-6 block opacity-40 shrink-0" />
          <button
            onClick={() => refetch()}
            className="w-full sm:w-auto text-xs sm:text-sm font-black font-cairo text-primary bg-primary/5 sm:bg-transparent sm:hover:bg-primary/5 px-6 sm:px-4 py-3 sm:py-2 rounded-xl sm:rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <RefreshCw className="w-4 h-4 sm:w-3.5 sm:h-3.5 group-hover:rotate-180 transition-transform duration-700" />
            {isRtl ? "تحديث النتائج" : "Refresh Results"}
          </button>
        </div>
      )}

      {/* Loading State: Premium Skeleton Grid */}
      {isLoading && <PremiumSkeletonGrid count={6} />}

      {/* Error State */}
      {error && (
        <div className="py-12">
          <ErrorState message={isRtl ? "حدث خطأ في تحميل البيانات" : "An error occurred while loading data"} onRetry={refetch} />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && freelancers.length === 0 && (
        <div className="py-12">
          <EmptyState />
        </div>
      )}

      {/* Content State: Animated Grid */}
      {!isLoading && !error && freelancers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {freelancers.map((f, idx) => {
            return (
              <Link
                key={f.id}
                href={`/workers/${f.id}`}
                className="group relative flex flex-col bg-card-bg rounded-[24px] sm:rounded-[32px] border border-border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 p-5 sm:p-6 hover:-translate-y-1.5 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} w-20 sm:w-24 h-20 sm:h-24 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors`} />

                {/* Top Section: Avatar & Identity */}
                <div className={`flex items-start gap-4 mb-3 sm:mb-4 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Avatar */}
                  <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-4 ring-light-white shadow-md transition-all duration-700 group-hover:scale-105 group-hover:ring-primary/10 flex items-center justify-center bg-light-white">
                    {f.profilePictureUrl ? (
                      <Image
                        src={f.profilePictureUrl}
                        alt={f.fullName || "profile"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-xl sm:text-2xl font-black text-primary/80 font-cairo">
                        {f.fullName ? f.fullName.charAt(0).toUpperCase() : "U"}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className={`flex flex-col flex-1 pt-1.5 sm:pt-2 items-start overflow-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-2 group/title w-full">
                      <h3 className="font-black text-xl sm:text-2xl text-heading font-cairo mb-1 leading-tight group-hover:text-primary transition-colors truncate">
                        {f.fullName || (isRtl ? "مستخدم شغول" : "Shogol User")}
                      </h3>
                      {f.rating >= 4.9 && (
                        <div className="bg-primary text-white p-0.5 sm:p-1 rounded-full ring-2 ring-primary/10 shadow-lg shadow-primary/20 mb-1 shrink-0">
                          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={4} />
                        </div>
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-gray-medium mb-2.5 sm:mb-3 truncate w-full">
                      <LocationIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
                      <span className="text-[13px] sm:text-sm font-bold font-cairo truncate">
                        {f.nationality || (isRtl ? "غير محدد" : "Not specified")}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2 bg-accent/10 px-2 sm:px-3 py-1 rounded-full border border-accent/20">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent"
                            filled={i < Math.floor(f.rating || 0)}
                          />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm font-black text-accent font-cairo pt-0.5">
                        {(f.rating || 0).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="h-px w-full bg-border mb-3 sm:mb-4 opacity-50 block" />

                {/* Bio Section */}
                {f.bio && (
                  <p className={`text-[14px] sm:text-[15px] text-gray-medium font-bold font-cairo leading-relaxed line-clamp-2 mb-3 sm:mb-4 h-[42px] sm:h-[45px] opacity-80 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {f.bio}
                  </p>
                )}

                {/* Skills Section */}
                {f.skills && f.skills.length > 0 && (
                  <div className={`flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5 ${isRtl ? 'justify-start' : 'justify-end'}`}>
                    {f.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-primary/10 text-primary rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-[12px] font-black font-cairo transition-all hover:bg-primary hover:text-white cursor-default truncate max-w-[120px] sm:max-w-[140px]"
                      >
                        {isRtl ? skill.nameAr : skill.nameEn || skill.nameAr}
                      </span>
                    ))}
                    {f.skills.length > 3 && (
                      <span className="bg-light-white text-gray-medium rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold font-cairo shrink-0">
                        +{f.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer Section */}
                <div className="mt-auto pt-3 sm:pt-4 flex items-center justify-between border-t border-border">
                  <div className={`flex items-center gap-2 sm:gap-3 text-gray-medium group-hover:text-primary transition-colors ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-light-white group-hover:bg-primary/10 flex items-center justify-center transition-all shadow-sm">
                      <WorkIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 opacity-70" />
                    </div>
                    <span className="text-[13px] sm:text-sm font-black font-cairo whitespace-nowrap">
                      {f.completedJobsCount || "0"} <span className="hidden xs:inline">{isRtl ? "مشروع مكتمل" : "Completed Projects"}</span><span className="xs:hidden">{isRtl ? "مكتمل" : "Completed"}</span>
                    </span>
                  </div>

                  <div className={`transition-all duration-500 ${isRtl ? 'opacity-100 sm:opacity-0 sm:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0' : 'opacity-100 sm:opacity-0 sm:translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                    <span className={`text-primary font-black font-cairo text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                      <span className="hidden mt-1 sm:inline">{isRtl ? "الملف الشخصي" : "Profile"}</span>
                      {isRtl ? <ArrowIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> : <ArrowIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 rotate-180" />}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
