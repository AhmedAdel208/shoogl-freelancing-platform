"use client";

import { ProjectSkillsProps } from "@/types/detailComponents";
import { Code2, Tags } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProjectSkills({ project }: ProjectSkillsProps) {
  const { t, isRtl } = useTranslation();

  if (!project.skills || project.skills.length === 0) {
    return null;
  }

  return (
    <div className="relative mb-10">
      <div className={`flex items-center gap-3 mb-6 ${isRtl ? 'flex-row' : 'flex-row-reverse justify-end'}`}>
        <h3 className="text-xl font-black text-heading font-cairo">
          {t.projectDetails.skills}
        </h3>
        <div className="w-10 h-10 rounded-xl bg-card-bg border border-border flex items-center justify-center text-gray-medium shadow-xs">
           <Code2 size={20} strokeWidth={2.5} />
        </div>
      </div>

      <div className={`flex flex-wrap gap-2.5 ${isRtl ? 'justify-start' : 'justify-start'}`}>
        {project.skills.map((skill) => (
          <div
            key={skill.id}
            className="group flex items-center gap-2.5 bg-card-bg border border-border px-4 py-2.5 rounded-xl transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md cursor-default shadow-xs"
          >
            <span className="text-[15px] font-bold font-cairo text-gray-medium group-hover:text-primary transition-colors">
              {isRtl ? skill.nameAr : skill.nameEn || skill.nameAr}
            </span>
            <Tags size={14} className="text-gray-medium/40 group-hover:text-primary/40 transition-colors" strokeWidth={2.5} />
          </div>
        ))}
      </div>
    </div>
  );
}
