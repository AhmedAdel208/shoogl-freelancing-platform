"use client";

import { ResultsCounterProps } from "@/types/announcements";
import { useTranslation } from "@/hooks/useTranslation";

export default function ResultsCounter({
  currentCount,
  totalCount,
}: ResultsCounterProps & { totalCount?: number }) {
  const { isRtl } = useTranslation();

  const getArabicLabel = (count: number) => {
    if (count === 0) return "مشاريع";
    if (count === 1) return "مشروع متاح";
    if (count === 2) return "مشروعين متاحين";
    if (count >= 3 && count <= 10) return "مشاريع متاحة";
    return "مشروعاً متاحاً";
  };

  const getEnglishLabel = (count: number) => {
    return count === 1 ? "Project Available" : "Projects Available";
  };

  const total = totalCount || currentCount;

  if (total === 0) {
    return null;
  }

  return (
    <div className={`flex items-center justify-center my-8 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className="bg-card-bg/60 backdrop-blur-xl border border-border px-6 py-3 rounded-[22px] shadow-xs flex items-center gap-3 group transition-all duration-300 hover:bg-card-bg hover:shadow-lg hover:-translate-y-1 cursor-default">
        <div className={`flex items-center gap-3 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
          <span className="text-gray-medium text-[15px] font-bold font-cairo whitespace-nowrap opacity-70">
            {isRtl ? "نعرض لك" : "Showing"}
          </span>
          <div className="flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-xl border border-primary/20 group-hover:bg-primary/20 transition-colors">
            <span className="text-primary font-black text-base font-cairo leading-none">{currentCount}</span>
            {total > currentCount && (
              <>
                <span className="text-primary/60 text-[13px] font-black font-cairo mx-1 uppercase">
                  {isRtl ? "من أصل" : "of"}
                </span>
                <span className="text-primary font-black text-base font-cairo leading-none">{total}</span>
              </>
            )}
          </div>
          <span className="text-heading text-[15px] font-black font-cairo group-hover:text-primary transition-colors">
            {isRtl ? getArabicLabel(total) : getEnglishLabel(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
