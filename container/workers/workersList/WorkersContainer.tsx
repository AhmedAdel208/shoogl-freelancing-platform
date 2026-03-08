"use client";

import RequestsToolbar from "@/container/workers/workersList/RequestsToolbar";
import FreelancerCard from "./FreelancerCard";
import { WorkersContainerProps } from "@/types/workersContainer";
import PremiumSkeletonGrid from "@/common/PremiumSkeletonGrid";
import EmptyState from "@/common/EmptyState";
import ErrorState from "@/common/ErrorState";
import { RefreshCw } from "lucide-react";
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
  const { isRtl } = useTranslation();

  return (
    <div
      className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 max-w-8xl mx-auto relative overflow-hidden transition-colors duration-500"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Decorative Background Elements */}
      <div
        className={`absolute top-0 ${isRtl ? "right-0 lg:right-1/4" : "left-0 lg:left-1/4"} w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-[80px] md:blur-[100px] -z-10 animate-pulse`}
      />
      <div
        className={`absolute top-20 ${isRtl ? "left-0 lg:left-1/4" : "right-0 lg:right-1/4"} w-48 h-48 md:w-72 md:h-72 bg-teal-400/5 rounded-full blur-[60px] md:blur-[80px] -z-10 animate-pulse delay-700`}
      />

      {/* Page Header */}
      <div className="mb-8 md:mb-12 text-center space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-top-6 duration-1000 px-2 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-black font-cairo text-heading tracking-tight">
          {isRtl ? "تصفح المشتغلين" : "Browse Freelancers"}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl font-bold font-cairo text-gray-medium max-w-2xl mx-auto leading-relaxed opacity-90">
          {isRtl
            ? "استكشف نخبة من المبدعين والخبراء في مختلف المجالات."
            : "Explore a selection of creators and experts across various fields."}
        </p>
      </div>

      <RequestsToolbar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      {/* Results Counter Bar */}
      {!isLoading && !error && freelancers.length > 0 && (
        <div
          className={`mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2 animate-in fade-in duration-700 ${isRtl ? "sm:flex-row" : "sm:flex-row-reverse"}`}
        >
          <div className="flex items-center gap-2 text-gray-medium font-bold font-cairo">
            <span className="text-primary font-black text-xl sm:text-lg">
              {totalCount}
            </span>
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
          <ErrorState
            message={
              isRtl
                ? "حدث خطأ في تحميل البيانات"
                : "An error occurred while loading data"
            }
            onRetry={refetch}
          />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {freelancers.map((f, idx) => (
            <FreelancerCard key={f.id} freelancer={f} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
