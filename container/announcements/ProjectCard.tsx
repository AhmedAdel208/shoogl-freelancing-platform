"use client";
import { useRouter } from "next/navigation";
import { ProjectCardProps } from "@/types/announcements";
import { useTranslation } from "@/hooks/useTranslation";
import CardContent from "./CardContent";

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const { isRtl, t } = useTranslation();
  const handleClick = () => {
    router.push(`/announcements/${project.id}`);
  };

 
  return (
    <div
      onClick={handleClick}
      className="group relative bg-card-bg w-full rounded-[20px] transition-all duration-500 ease-out hover:shadow-[0_40px_80px_-15px_rgba(30,170,173,0.12)] shadow-sm border border-border overflow-hidden cursor-pointer flex flex-col h-full"
    >
      <CardContent isRtl={isRtl} project={project} t={t} />
     
    </div>
  );
}
