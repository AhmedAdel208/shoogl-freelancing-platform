"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ClientInfoProps } from "@/types/detailComponents";
import { MessageSquareMore } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/hooks/auth/useAuth";

export default function ClientInfo({ project }: ClientInfoProps) {
  const router = useRouter();
  const { t, isRtl } = useTranslation();
  const { isAuthenticated } = useAuth();

  const handleContactClient = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    
    if (project.clientId) {
      router.push(`/messages?user=${project.clientId}`);
    }
  };

  return (
    <div className="bg-card-bg rounded-3xl border border-border shadow-sm overflow-hidden flex flex-col items-center p-8 text-center transition-all duration-300 hover:shadow-md h-fit">
      <h3 className="text-[11px] font-black text-gray-medium uppercase tracking-[0.2em] mb-10 font-cairo opacity-60">
        {t.projectDetails.owner}
      </h3>

      {/* Avatar Container */}
      <div className="relative mb-8">
        <div className="w-28 h-28 rounded-full p-1.5 bg-bg/50 border border-border ring-8 ring-primary/5 shadow-inner group/avatar relative flex items-center justify-center">
          <div className="w-full h-full rounded-full overflow-hidden relative bg-card-bg border border-border flex items-center justify-center">
            {project.clientAvatar ? (
              <Image
                src={project.clientAvatar}
                alt={project.clientName}
                width={112}
                height={112}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/avatar:scale-110"
              />
            ) : (
              <span className="text-gray-medium/30 font-black text-4xl font-cairo">
                {project.clientName?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          
          {/* Online status indicator */}
          <div className={`absolute bottom-2 ${isRtl ? 'right-2' : 'left-2'} w-5 h-5 bg-emerald-500 border-4 border-card-bg rounded-full shadow-lg z-20`} />
        </div>
      </div>

      <h4 className="text-2xl font-black text-heading font-cairo mb-10 leading-tight">
        {project.clientName}
      </h4>

      {/* Action Button */}
      <button
        onClick={handleContactClient}
        className="w-full group/btn relative overflow-hidden flex items-center justify-center gap-3 py-4.5 px-6 bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 hover:border-primary rounded-2xl font-black font-cairo transition-all duration-500 active:scale-[0.98] cursor-pointer"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
        
        <MessageSquareMore
          size={18}
          strokeWidth={2.5}
          className="transition-transform duration-500 group-hover/btn:-translate-y-1 group-hover/btn:rotate-12"
        />
        <span className="text-[15px]">
          {isRtl ? "التواصل مع العميل" : "Contact the Client"}
        </span>
      </button>
    </div>
  );
}
