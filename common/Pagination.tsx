"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isRtl: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isRtl,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl font-black transition-all duration-300 shadow-sm cursor-pointer ${
            currentPage === i
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
    <div className="mt-12 sm:mt-20 mb-8 flex flex-col items-center gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex items-center gap-2 sm:gap-4 p-3 bg-card-bg border border-border/60 rounded-[30px] shadow-[0_10px_40px_rgb(0,0,0,0.04)] ring-8 ring-primary/5 backdrop-blur-xl">
        {/* First Page */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-bg border border-border text-gray-medium hover:bg-primary hover:text-white disabled:opacity-20 disabled:hover:bg-bg disabled:hover:text-gray-medium transition-all duration-500 shadow-sm group/btn flex items-center justify-center cursor-pointer active:scale-95"
          aria-label="First Page"
        >
          <ChevronsLeft className={`w-5 h-5 ${isRtl ? "rotate-180" : ""} group-hover/btn:scale-110 transition-transform`} />
        </button>
        
        <div className="w-px h-8 bg-border/40 mx-1 hidden sm:block" />

        {/* Previous Page */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-bg border border-border text-gray-medium hover:bg-primary hover:text-white disabled:opacity-20 disabled:hover:bg-bg disabled:hover:text-gray-medium transition-all duration-500 shadow-sm group/btn flex items-center justify-center cursor-pointer active:scale-95"
          aria-label="Previous Page"
        >
          <ChevronLeft className={`w-5 h-5 ${isRtl ? "rotate-180" : ""} group-hover/btn:scale-110 transition-transform`} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2 sm:gap-3 mx-1">
          {renderPageNumbers()}
        </div>

        {/* Next Page */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-bg border border-border text-gray-medium hover:bg-primary hover:text-white disabled:opacity-20 disabled:hover:bg-bg disabled:hover:text-gray-medium transition-all duration-500 shadow-sm group/btn flex items-center justify-center cursor-pointer active:scale-95"
          aria-label="Next Page"
        >
          <ChevronRight className={`w-5 h-5 ${isRtl ? "rotate-180" : ""} group-hover/btn:scale-110 transition-transform`} />
        </button>

        <div className="w-px h-8 bg-border/40 mx-1 hidden sm:block" />

        {/* Last Page */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-bg border border-border text-gray-medium hover:bg-primary hover:text-white disabled:opacity-20 disabled:hover:bg-bg disabled:hover:text-gray-medium transition-all duration-500 shadow-sm group/btn flex items-center justify-center cursor-pointer active:scale-95"
          aria-label="Last Page"
        >
          <ChevronsRight className={`w-5 h-5 ${isRtl ? "rotate-180" : ""} group-hover/btn:scale-110 transition-transform`} />
        </button>
      </div>
    </div>
  );
}
