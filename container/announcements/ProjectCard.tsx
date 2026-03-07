"use client";

import Image from "next/image";
import { CalendarDays, Wallet, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatTimeAgo, mapStatus } from "@/utils";
import { ProjectCardProps } from "@/types/announcements";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const { isRtl, t } = useTranslation();

  const handleClick = () => {
    router.push(`/announcements/${project.id}`);
  };

  const isPending = project.status === "Pending";
  const isAccepted = project.status === "Accepted";

  const statusColor = isPending
    ? "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20"
    : isAccepted
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20"
      : "bg-gray-500/10 text-gray-600 dark:text-gray-500 border-gray-500/20";

  return (
    <div
      onClick={handleClick}
      className="group relative bg-card-bg w-full rounded-[40px] transition-all duration-500 ease-out hover:shadow-[0_40px_80px_-15px_rgba(30,170,173,0.12)] shadow-sm border border-border overflow-hidden cursor-pointer flex flex-col h-full"
    >
      {/* Visual Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary/10 group-hover:bg-primary transition-all duration-500" />

      <div className="p-7 flex flex-col h-full">
        {/* Card Header & Status */}
        <div className={`flex justify-between items-start mb-6 gap-4 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className={`flex-1 min-w-0 ${isRtl ? 'text-right' : 'text-left'}`}>
            <h2 className="text-xl md:text-2xl font-black font-cairo text-heading leading-[1.3] line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h2>
            <div className={`flex items-center gap-2 mt-3 font-bold text-[12px] text-gray-medium font-cairo ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
              <CalendarDays size={13} className="opacity-60" />
              <span>{isRtl ? "منذ" : ""} {formatTimeAgo(project.createdAt)} {isRtl ? "" : "ago"}</span>
            </div>
          </div>

          <div className="shrink-0 pt-1">
            <span
              className={`px-3.5 py-1.5 rounded-xl text-[12px] font-black font-cairo border shadow-xs ${statusColor}`}
            >
              {isRtl ? mapStatus(project.status) : project.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className={`text-gray-medium leading-relaxed mb-8 line-clamp-3 font-cairo text-base font-bold opacity-80 ${isRtl ? 'text-right' : 'text-left'}`}>
          {project.description}
        </p>

        {/* Skills Tags */}
        <div className={`flex flex-wrap items-center gap-2 mb-8 ${isRtl ? 'justify-end' : 'justify-start'}`}>
          {project.skills?.slice(0, 3).map((skill) => (
            <span
              key={skill.id}
              className="bg-bg/50 border border-border text-gray-medium px-3.5 py-1.5 rounded-xl text-[12px] font-black font-cairo transition-all hover:border-primary/40 hover:text-primary hover:bg-primary/5"
            >
              {isRtl ? skill.nameAr : skill.nameEn || skill.nameAr}
            </span>
          ))}
          {project.skills && project.skills.length > 3 && (
            <span className="text-gray-medium/40 text-[12px] font-black px-1">
              +{project.skills.length - 3}
            </span>
          )}
        </div>

        {/* Bottom Bar: Owner & Budget */}
        <div className={`flex items-center justify-between mt-auto pt-6 border-t border-border/50 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
          {/* Budget Info */}
          <div className="flex items-center gap-2 text-primary font-black font-cairo">
            <Wallet size={16} className="opacity-70" />
            <span className="text-lg">{project.budget} <span className="text-[10px] opacity-60 ml-0.5">{t.common.riyal}</span></span>
          </div>

          {/* User Info */}
          <div className={`flex items-center gap-3 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
            <span className="text-[13px] font-black text-heading font-cairo group-hover:text-primary transition-colors">
              {project.clientName}
            </span>
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-card-bg border border-border shadow-xs flex items-center justify-center transition-transform group-hover:scale-105">
              {project.clientAvatar ? (
                <Image
                  src={project.clientAvatar}
                  alt={project.clientName}
                  fill
                  className="object-cover"
                />
              ) : (
                <User size={18} className="text-gray-medium/30" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
