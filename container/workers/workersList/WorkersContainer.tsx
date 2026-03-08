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
      className="px-4 py-12 max-w-8xl mx-auto relative overflow-hidden transition-colors duration-500"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Decorative Background Elements */}
      <div className={`absolute top-0 ${isRtl ? 'right-1/4' : 'left-1/4'} w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse`} />
      <div className={`absolute top-20 ${isRtl ? 'left-1/4' : 'right-1/4'} w-72 h-72 bg-teal-400/5 rounded-full blur-[80px] -z-10 animate-pulse delay-700`} />

      {/* Page Header */}
      <div className="mb-12 text-center space-y-4 animate-in fade-in slide-in-from-top-6 duration-1000">
        <h1 className="text-2xl md:text-3xl font-black font-cairo text-heading tracking-tight mb-4">
          {isRtl ? "تصفح المشتغلين" : "Browse Freelancers"}
        </h1>
        <p className="text-lg font-bold font-cairo text-gray-medium max-w-2xl mx-auto leading-relaxed">
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
        <div className={`mb-8 flex items-center justify-between px-2 animate-in fade-in duration-700 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className="flex items-center gap-2 text-gray-medium font-bold font-cairo">
            <span className="text-primary font-black">{totalCount}</span>
            <span className="text-sm opacity-70">
              {isRtl ? "مشتغل متاح حالياً" : "Freelancers available now"}
            </span>
          </div>
          <div className="h-px flex-1 bg-border mx-6 hidden sm:block opacity-40" />
          <button
            onClick={() => refetch()}
            className="text-xs font-black font-cairo text-primary hover:bg-primary/5 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2 group"
          >
            <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freelancers.map((f, idx) => {
            return (
              <Link
                key={f.id}
                href={`/workers/${f.id}`}
                className="group relative flex flex-col bg-card-bg rounded-[32px] border border-border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 p-6 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors`} />

                {/* Top Section: Avatar & Identity */}
                <div className={`flex items-start gap-4 mb-4 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Avatar */}
                  <div className="relative shrink-0 w-20 h-20 rounded-full overflow-hidden ring-4 ring-light-white shadow-md transition-all duration-700 group-hover:scale-105 group-hover:ring-primary/10 flex items-center justify-center bg-light-white">
                    {f.profilePictureUrl ? (
                      <Image
                        src={f.profilePictureUrl}
                        alt={f.fullName || "profile"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-black text-primary/80 font-cairo">
                        {f.fullName ? f.fullName.charAt(0).toUpperCase() : "U"}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className={`flex flex-col flex-1 pt-2 items-start ${isRtl ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-2 group/title">
                      <h3 className="font-black text-2xl text-heading font-cairo mb-1 leading-tight group-hover:text-primary transition-colors">
                        {f.fullName || (isRtl ? "مستخدم شغول" : "Shogol User")}
                      </h3>
                      {f.rating >= 4.9 && (
                        <div className="bg-primary text-white p-0.5 rounded-full ring-2 ring-primary/10 shadow-lg shadow-primary/20 mb-1">
                          <CheckCircle2 size={12} strokeWidth={4} />
                        </div>
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-gray-medium mb-3">
                      <LocationIcon className="w-3.5 h-3.5 opacity-60" />
                      <span className="text-sm font-bold font-cairo">
                        {f.nationality || (isRtl ? "غير محدد" : "Not specified")}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2 bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className="w-3 h-3 text-accent"
                            filled={i < Math.floor(f.rating || 0)}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-black text-accent font-cairo">
                        {(f.rating || 0).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="h-px w-full bg-border mb-4 opacity-50" />

                {/* Bio Section */}
                {f.bio && (
                  <p className={`text-[15px] text-gray-medium font-cairo leading-relaxed line-clamp-2 mb-4 min-h-10 opacity-80 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {f.bio}
                  </p>
                )}

                {/* Skills Section */}
                {f.skills && f.skills.length > 0 && (
                  <div className={`flex flex-wrap gap-2 mb-4 ${isRtl ? 'justify-start' : 'justify-end'}`}>
                    {f.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-[12px] font-black font-cairo transition-all hover:bg-primary hover:text-white cursor-default"
                      >
                        {isRtl ? skill.nameAr : skill.nameEn || skill.nameAr}
                      </span>
                    ))}
                    {f.skills.length > 3 && (
                      <span className="bg-light-white text-gray-medium rounded-full px-3 py-1.5 text-[11px] font-bold font-cairo">
                        +{f.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer Section */}
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-border">
                  <div className={`flex items-center gap-3 text-gray-medium group-hover:text-primary transition-colors ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-10 h-10 rounded-xl bg-light-white group-hover:bg-primary/10 flex items-center justify-center transition-all shadow-sm">
                      <WorkIcon className="w-4.5 h-4.5 opacity-70" />
                    </div>
                    <span className="text-sm font-black font-cairo whitespace-nowrap">
                      {f.completedJobsCount || "0"} {isRtl ? "مشروع مكتمل" : "Completed Projects"}
                    </span>
                  </div>

                  <div className={`transition-all duration-500 ${isRtl ? 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0' : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                    <span className={`text-primary font-black font-cairo text-sm flex items-center gap-2 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                      {isRtl ? "عرض الملف الشخصي" : "View Profile"}
                      {isRtl ? <ArrowIcon className="w-4.5 h-4.5" /> : <ArrowIcon className="w-4.5 h-4.5 rotate-180" />}
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
