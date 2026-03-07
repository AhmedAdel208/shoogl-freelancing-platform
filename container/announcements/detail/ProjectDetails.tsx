"use client";

import { Banknote, Clock, CalendarDays } from "lucide-react";
import { ProjectDetailsProps } from "@/types/detailComponents";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const { t, isRtl, locale } = useTranslation();

  const getDeadlineDate = (): string => {
    const dateToUse = project.deadline ? new Date(project.deadline) : (() => {
      const createdDate = new Date(project.createdAt);
      const deadlineDate = new Date(createdDate);
      deadlineDate.setDate(deadlineDate.getDate() + project.durationInDays);
      return deadlineDate;
    })();

    return dateToUse.toLocaleDateString(locale === 'ar' ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      {/* Budget Card */}
      <div className="bg-card-bg rounded-2xl border border-border p-5 flex items-center gap-4 hover:shadow-lg transition-all duration-300 group shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
          <Banknote className="w-6 h-6 text-primary group-hover:text-white" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-gray-medium text-[12px] font-black uppercase tracking-wider font-cairo mb-0.5">
            {t.projectDetails.budget}
          </span>
          <p className="text-xl font-black text-heading font-cairo leading-none">
            {project.budget} <span className="text-sm font-bold text-gray-medium ml-1">{t.common.riyal}</span>
          </p>
        </div>
      </div>

      {/* Deadline Card */}
      <div className="bg-card-bg rounded-2xl border border-border p-5 flex items-center gap-4 hover:shadow-lg transition-all duration-300 group shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all transform group-hover:rotate-6">
          <CalendarDays className="w-6 h-6 text-orange-500 group-hover:text-white" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-gray-medium text-[12px] font-black uppercase tracking-wider font-cairo mb-0.5">
            {t.projectDetails.deadline}
          </span>
          <p className="text-lg font-black text-heading font-cairo leading-none">{getDeadlineDate()}</p>
        </div>
      </div>

      {/* Duration Card */}
      <div className="bg-card-bg rounded-2xl border border-border p-5 flex items-center gap-4 hover:shadow-lg transition-all duration-300 group shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all transform group-hover:rotate-6">
          <Clock className="w-6 h-6 text-blue-500 group-hover:text-white" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-gray-medium text-[12px] font-black uppercase tracking-wider font-cairo mb-0.5">
            {t.projectDetails.duration}
          </span>
          <p className="text-xl font-black text-heading font-cairo leading-none">
            {project.durationInDays} <span className="text-sm font-bold text-gray-medium ml-1">{t.common.days}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
