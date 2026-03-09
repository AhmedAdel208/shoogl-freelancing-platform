"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { LocationIcon, StarIcon, WorkIcon, ArrowIcon } from "@/public/icons";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Freelancer } from "@/types/freelancers";

interface FreelancerCardProps {
  freelancer: Freelancer;
  index: number;
}

const FreelancerCard = memo(function FreelancerCard({ freelancer: f, index }: FreelancerCardProps) {
  const { isRtl } = useTranslation();

  return (
    <Link
      href={`/workers/${f.id}`}
      prefetch={true}
      className="group relative flex flex-col bg-card-bg rounded-3xl sm:rounded-4xl border border-border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 p-5 sm:p-6 hover:-translate-y-1.5 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Visual Accent */}
      <div
        className={`absolute top-0 ${isRtl ? "right-0" : "left-0"} w-20 sm:w-24 h-20 sm:h-24 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors`}
      />

      {/* Top Section: Avatar & Identity */}
      <div
        className={`flex items-start gap-4 mb-3 sm:mb-4 ${isRtl ? "flex-row" : "flex-row-reverse"}`}
      >
        {/* Avatar */}
        <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-4 ring-light-white shadow-md transition-all duration-700 group-hover:scale-105 group-hover:ring-primary/10 flex items-center justify-center bg-light-white">
          {f.profilePictureUrl ? (
            <Image
              src={f.profilePictureUrl}
              alt={f.fullName || "profile"}
              fill
              sizes="(max-width: 640px) 64px, 80px"
              className="object-cover"
              loading={index < 4 ? "eager" : "lazy"}
            />
          ) : (
            <span className="text-xl sm:text-2xl font-black text-primary/80 font-cairo">
              {f.fullName ? f.fullName.charAt(0).toUpperCase() : "U"}
            </span>
          )}
        </div>

        {/* Info */}
        <div
          className={`flex flex-col flex-1 pt-1.5 sm:pt-2 items-start overflow-hidden ${isRtl ? "text-right" : "text-left"}`}
        >
          <div className="flex items-center gap-2 group/title w-full">
            <h3 className="font-black text-xl sm:text-2xl text-heading font-cairo mb-1 leading-tight group-hover:text-primary transition-colors truncate">
              {f.fullName || (isRtl ? "مستخدم شغول" : "Shogol User")}
            </h3>
            {f.rating >= 4.9 && (
              <div className="bg-primary text-white p-0.5 sm:p-1 rounded-full ring-2 ring-primary/10 shadow-lg shadow-primary/20 mb-1 shrink-0">
                <CheckCircle2
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                  strokeWidth={4}
                />
              </div>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-medium mb-2 sm:mb-3 truncate w-full">
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
      <div className="h-px w-full bg-border mb-2 sm:mb-4 opacity-50 block" />

      {/* Bio Section */}
      {f.bio && (
        <p
          className={`text-[14px] sm:text-[15px] text-gray-medium font-bold font-cairo leading-relaxed line-clamp-2 mb-2 sm:mb-4 h-10.5 sm:h-11.25 opacity-80 ${isRtl ? "text-right" : "text-left"}`}
        >
          {f.bio}
        </p>
      )}

      {/* Skills Section */}
      {f.skills && f.skills.length > 0 && (
        <div
          className={`flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-5 ${isRtl ? "justify-start" : "justify-end"}`}
        >
          {f.skills.slice(0, 3).map((skill) => (
            <span
              key={skill.id}
              className="bg-primary/10 text-primary rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-[12px] font-black font-cairo transition-all hover:bg-primary hover:text-white cursor-default truncate max-w-30 sm:max-w-35"
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
      <div className="mt-auto pt-2 sm:pt-4 flex items-center justify-between border-t border-border">
        <div
          className={`flex items-center gap-2 sm:gap-3 text-gray-medium group-hover:text-primary transition-colors ${isRtl ? "flex-row" : "flex-row-reverse"}`}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-light-white group-hover:bg-primary/10 flex items-center justify-center transition-all shadow-sm">
            <WorkIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 opacity-70" />
          </div>
          <span className="text-[13px] sm:text-sm font-black font-cairo whitespace-nowrap">
            {f.completedJobsCount || "0"}{" "}
            <span className="hidden xs:inline">
              {isRtl ? "مشروع مكتمل" : "Completed Projects"}
            </span>
            <span className="xs:hidden">
              {isRtl ? "مكتمل" : "Completed"}
            </span>
          </span>
        </div>

        <div
          className={`transition-all duration-500 ${isRtl ? "opacity-100 sm:opacity-0 sm:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0" : "opacity-100 sm:opacity-0 sm:translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"}`}
        >
          <span
            className={`text-primary font-black font-cairo text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 ${isRtl ? "flex-row" : "flex-row-reverse"}`}
          >
            <span className="hidden mt-1 sm:inline">
              {isRtl ? "الملف الشخصي" : "Profile"}
            </span>
            {isRtl ? (
              <ArrowIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            ) : (
              <ArrowIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 rotate-180" />
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}, (prevProps, nextProps) => {
  // Only re-render if freelancer data changed
  return prevProps.freelancer.id === nextProps.freelancer.id &&
         prevProps.freelancer.rating === nextProps.freelancer.rating &&
         prevProps.index === nextProps.index;
});

export default FreelancerCard;
