"use client";

import { mapStatus, formatTimeAgo } from "@/utils";
import { ProjectHeaderProps } from "@/types/detailComponents";
import { User, CalendarDays, Clock, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const { t, isRtl } = useTranslation();
  const isPending = project.status === "Pending";
  const isAccepted = project.status === "Accepted";

  return (
    <div className="mb-2 relative">
      {/* Top Meta Area */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        {/* Status Pill */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border w-fit shadow-xs ${
          isPending 
            ? "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-500" 
            : isAccepted
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-500"
            : "bg-gray-500/10 border-gray-500/20 text-gray-600 dark:text-gray-500"
        }`}>
          {isPending ? <Clock size={14} strokeWidth={2.5} /> : isAccepted ? <CheckCircle2 size={14} strokeWidth={2.5} /> : <User size={14} strokeWidth={2.5} />}
          <span className="text-[13px] font-bold font-cairo">
            {isRtl ? mapStatus(project.status) : project.status}
          </span>
        </div>

        {/* Meta Stats Row */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 group cursor-default">
            <div className="w-9 h-9 rounded-xl bg-card-bg border border-border flex items-center justify-center transition-all group-hover:bg-primary/5 group-hover:border-primary/20 shadow-xs">
              <CalendarDays className="w-4.5 h-4.5 text-gray-medium group-hover:text-primary" strokeWidth={2} />
            </div>
            <span className="font-cairo text-sm font-bold text-gray-medium">
              {formatTimeAgo(project.createdAt)} {isRtl ? "" : "ago"}
            </span>
          </div>
          
          <div className="w-px h-5 bg-border hidden sm:block" />

          <div className="flex items-center gap-2.5 group cursor-default">
            <div className="w-9 h-9 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center transition-all group-hover:bg-primary/10 group-hover:border-primary/20 shadow-xs">
              <User className="w-4.5 h-4.5 text-primary" strokeWidth={2.2} />
            </div>
            <div className="flex flex-col">
              <span className="font-cairo text-[11px] font-black text-primary/60 uppercase tracking-wider">
                {t.projectDetails.proposals}
              </span>
              <p className="font-cairo text-base font-black text-heading leading-tight">
                {project.proposalsCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-cairo text-heading leading-tight tracking-tight">
        {project.title}
      </h1>
    </div>
  );
}
