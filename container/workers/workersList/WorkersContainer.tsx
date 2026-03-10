"use client";

import RequestsToolbar from "@/container/workers/workersList/RequestsToolbar";
import FreelancerCard from "./FreelancerCard";
import { WorkersContainerProps } from "@/types/workersContainer";
import PremiumSkeletonGrid from "@/common/PremiumSkeletonGrid";
import EmptyState from "@/common/EmptyState";
import ErrorState from "@/common/ErrorState";
import { RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect } from "react";

export default function WorkersContainer({
  freelancers,
  totalCount,
  totalPages,
  isLoading,
  error,
  refetch,
  searchParams,
  setSearchParams,
}: WorkersContainerProps) {
  const { isRtl } = useTranslation();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams((prev) => ({ ...prev, pageNumber: newPage }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, searchParams.pageNumber - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl font-black transition-all duration-300 shadow-sm ${
            searchParams.pageNumber === i
              ? "bg-primary text-white shadow-lg shadow-primary/25 scale-110"
              : "bg-white text-gray-medium hover:bg-primary hover:text-white border border-border"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

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
      {isLoading && <PremiumSkeletonGrid count={9} />}

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
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {freelancers.map((f, idx) => (
              <FreelancerCard key={f.id} freelancer={f} index={idx} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 sm:mt-24 mb-10 flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {/* Pagination Container */}
              <div className="flex items-center gap-1.5 sm:gap-3 p-2 bg-card-bg border border-border rounded-[24px] shadow-sm ring-4 ring-primary/5">
                {/* First Page */}
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={searchParams.pageNumber === 1}
                  className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-border text-gray-medium hover:bg-primary hover:text-white disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-gray-medium transition-all duration-300 shadow-sm group/btn"
                  aria-label="First Page"
                >
                  <ChevronsLeft className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${isRtl ? "rotate-180" : ""} group-hover/btn:scale-110 transition-transform`} />
                </button>

                {/* Previous Page */}
                <button
                  onClick={() => handlePageChange(searchParams.pageNumber - 1)}
                  disabled={searchParams.pageNumber === 1}
                  className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-border text-gray-medium hover:bg-primary hover:text-white disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-gray-medium transition-all duration-300 shadow-sm group/btn"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${isRtl ? "rotate-180" : ""} group-hover/btn:scale-110 transition-transform`} />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1.5 sm:gap-2.5 mx-1">
                  {renderPageNumbers()}
                </div>

                {/* Next Page */}
                <button
                  onClick={() => handlePageChange(searchParams.pageNumber + 1)}
                  disabled={searchParams.pageNumber === totalPages}
                  className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-border text-gray-medium hover:bg-primary hover:text-white disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-gray-medium transition-all duration-300 shadow-sm group/btn"
                  aria-label="Next Page"
                >
                  <ChevronRight className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${isRtl ? "rotate-180" : ""} group-hover/btn:scale-110 transition-transform`} />
                </button>

                {/* Last Page */}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={searchParams.pageNumber === totalPages}
                  className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-border text-gray-medium hover:bg-primary hover:text-white disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-gray-medium transition-all duration-300 shadow-sm group/btn"
                  aria-label="Last Page"
                >
                  <ChevronsRight className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${isRtl ? "rotate-180" : ""} group-hover/btn:scale-110 transition-transform`} />
                </button>
              </div>

              {/* Page Indicator */}
              <div className="flex items-center gap-3 px-6 py-2 bg-primary/5 rounded-full border border-primary/10">
                <span className="text-[13px] sm:text-sm font-black font-cairo text-primary">
                  {isRtl ? "صفحة" : "Page"} {searchParams.pageNumber} {isRtl ? "من" : "of"} {totalPages}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                <span className="text-[13px] sm:text-sm font-bold font-cairo text-gray-medium opacity-70">
                   {totalCount} {isRtl ? "مشتغل" : "Freelancers"}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
