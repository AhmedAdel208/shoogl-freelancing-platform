"use client";

import { Send, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface FreelancerActionsProps {

  jobRequestId: string;
  hasSubmittedProposal?: boolean;
  onShowForm?: () => void;
  onProposalSuccess?: (proposalId: number) => void;
}

export default function FreelancerActions({
  hasSubmittedProposal,
  onShowForm,
}: FreelancerActionsProps) {
  const { t, isRtl } = useTranslation();

  const handleClick = () => {
    if (onShowForm) {
      onShowForm();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {hasSubmittedProposal ? (
        <div
          className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-500 font-black font-cairo shadow-sm"
        >
          <CheckCircle2 size={20} strokeWidth={2.5} />
          <span>{t.projectDetails.sentSuccess}</span>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="w-full relative flex items-center justify-center gap-3 py-4.5 px-6 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black font-cairo text-lg shadow-xl shadow-primary/20 transition-all duration-300 active:scale-[0.98] group/submit cursor-pointer overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/submit:opacity-100 transition-opacity" />
          
          <Send
            size={20}
            strokeWidth={2.5}
            className={`transition-transform duration-300 ${isRtl ? 'group-hover/submit:translate-x-1' : 'group-hover/submit:-translate-x-1'} group-hover/submit:-translate-y-1`}
          />
          <span className="mb-px tracking-wide">
            {isRtl ? "أرسل عرضك الآن" : "Submit Quote Now"}
          </span>
        </button>
      )}
    </div>
  );
}
