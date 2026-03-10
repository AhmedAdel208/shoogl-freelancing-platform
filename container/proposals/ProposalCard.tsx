"use client";

import { useRouter } from "next/navigation";
import { ProposalDisplay } from "@/lib/validation/proposalSchema";
import Image from "next/image";
import { proposalApi } from "@/lib/api/proposal";
import { useState } from "react";
import { Star, Clock, Wallet, CheckCircle2, Briefcase, XCircle, Loader2 } from "lucide-react";
import { toast } from "@/common/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/useTranslation";

interface ProposalCardProps {
  proposal: ProposalDisplay;
  isProjectOwner?: boolean;
}

export default function ProposalCard({
  proposal,
  isProjectOwner = false,
}: ProposalCardProps) {
  const router = useRouter();
  const [accepting, setAccepting] = useState(false);
  const queryClient = useQueryClient();
  const { t, isRtl } = useTranslation();

  const statusConfig = {
    Pending: {
      bg: "bg-amber-500/10",
      text: "text-amber-600 dark:text-amber-500",
      border: "border-amber-500/20",
      icon: <Clock size={14} strokeWidth={2.5} />,
      label: isRtl ? "قيد الانتظار" : "Pending"
    },
    Accepted: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-500",
      border: "border-emerald-500/20 shadow-xs",
      icon: <CheckCircle2 size={14} strokeWidth={2.5} />,
      label: isRtl ? "مقبول" : "Accepted"
    },
    Rejected: {
      bg: "bg-rose-500/10",
      text: "text-rose-600 dark:text-rose-500",
      border: "border-rose-500/20",
      icon: <XCircle size={14} strokeWidth={2.5} />,
      label: isRtl ? "مرفوض" : "Rejected"
    },
  };

  const handleContactFreelancer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (proposal.freelancerId) {
      router.push(`/messages?user=${proposal.freelancerId}`);
    }
  };

  const handleAcceptProposal = async () => {
    if (!confirm(isRtl ? "هل أنت متأكد من قبول هذا العرض؟" : "Are you sure you want to accept this proposal?")) return;

    setAccepting(true);
    try {
      await proposalApi.acceptProposal(proposal.id);
      toast.success(isRtl ? "تم قبول العرض بنجاح وبدء العمل!" : "Proposal accepted successfully! Work started.");
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ["proposals", proposal.jobRequestId] }),
        queryClient.refetchQueries({ queryKey: ["project", proposal.jobRequestId] }),
        queryClient.invalidateQueries({ queryKey: ["requests"] }),
      ]);
      router.refresh();

      // Redirect to requests page as requested
      router.push("/requests?section=in-progress");
    } catch (error) {
      console.error("Failed to accept proposal:", error);
      toast.error(isRtl ? "فشل قبول العرض، يرجى المحاولة مرة أخرى" : "Failed to accept proposal, please try again");
    } finally {
      setAccepting(false);
    }
  };

  const status = statusConfig[proposal.status as keyof typeof statusConfig] || statusConfig.Pending;

  return (
    <div
      className={`group relative bg-card-bg w-full rounded-[32px] transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-primary/5 border border-border overflow-hidden mb-6 ${isRtl ? 'text-right' : 'text-left'}`}
    >
      {/* Visual Accent Line */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1.5 w-full bg-linear-to-r ${
          proposal.status === 'Accepted' ? 'from-emerald-400 to-teal-500' : 
          proposal.status === 'Rejected' ? 'from-rose-400 to-red-500' : 
          'from-amber-400 to-orange-500'
        }`} 
      />

      <div className="p-4 md:p-9">
        {/* Header Section */}
        <div className={`flex flex-row items-center justify-between gap-4 mb-8`}>
          <div className="flex items-center gap-4 min-w-0">
            <div 
              onClick={isProjectOwner ? handleContactFreelancer : undefined}
              className={`relative w-14 h-14 sm:w-20 sm:h-20 bg-bg rounded-full  flex items-center justify-center shrink-0 ring-4 ring-border/20 shadow-2xl transition-all duration-500 overflow-hidden ${isProjectOwner ? 'cursor-pointer hover:ring-primary/40 group-hover:scale-105' : ''}`}
            >
              {proposal.freelancerAvatar ? (
                <Image
                  src={proposal.freelancerAvatar}
                  alt={proposal.freelancerName}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-primary/5 w-full h-full flex items-center justify-center">
                  <span className="text-primary text-2xl sm:text-3xl font-black font-cairo">
                    {proposal.freelancerName?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              )}
              
            </div>

            <div className="flex flex-col min-w-0">
              <div 
                onClick={isProjectOwner ? handleContactFreelancer : undefined}
                className={`flex items-center gap-2 group/name mb-1 min-w-0 ${isProjectOwner ? 'cursor-pointer' : ''}`}
              >
                <h3 className="font-black text-heading text-lg sm:text-2xl md:text-3xl leading-tight font-cairo group-hover/name:text-primary transition-colors truncate">
                  {proposal.freelancerName}
                </h3>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-sm font-bold">
                <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/10 shadow-xs">
                  <Star className="text-amber-500 fill-amber-500" size={12} />
                  <span className="text-amber-600 font-black">
                    {proposal.freelancerRating?.toFixed(1) || "4.5"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-medium bg-bg/50 px-2 py-1 rounded-lg border border-border/50">
                  <Briefcase size={12} className="opacity-60" />
                  <span className="whitespace-nowrap font-black">{proposal.freelancerCompletedJobs || 0} {isRtl ? "مكتمل" : "Jobs"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-3 sm:p-4 rounded-2xl sm:rounded-3xl border ${status.bg} ${status.text} ${status.border} flex flex-col items-center justify-center shrink-0 shadow-xs min-w-[70px] sm:min-w-[100px]`}>
            <div className="mb-1">{status.icon}</div>
            <span className="text-[10px] sm:text-sm font-black font-cairo text-center leading-tight">{status.label}</span>
          </div>
        </div>

        {/* Description Box */}
        <div className="mb-6 relative">
          <p className={`text-gray-medium text-sm sm:text-lg leading-relaxed font-bold font-cairo bg-bg/40 p-5 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-border/40 shadow-inner min-h-[80px] wrap-break-word ${isRtl ? 'text-right' : 'text-left'}`}>
            {proposal.description}
          </p>
        </div>

        {/* Pricing & Duration Layout */}
        <div className={`grid grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-dashed border-border`}>
          <div className="flex flex-col sm:flex-row items-center sm:justify-start p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] bg-bg border border-border group-hover:border-primary/20 transition-all duration-500 shadow-xs text-center sm:text-right">
            <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-card-bg shadow-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 border border-border mb-3 sm:mb-0 ${isRtl ? 'sm:ml-5' : 'sm:mr-5'}`}>
              <Wallet size={20} className="sm:w-6 sm:h-6" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] sm:text-sm font-black text-gray-medium font-cairo mb-1 uppercase tracking-tight opacity-70 truncate">
                {isRtl ? "العرض المالي" : "Price"}
              </span>
              <div className="flex items-baseline justify-center sm:justify-start gap-1 sm:gap-2">
                 <span className="text-lg sm:text-2xl font-black text-heading font-cairo leading-none">{proposal.proposedPrice}</span>
                 <span className="text-[10px] sm:text-sm font-black text-gray-medium font-cairo">{t.common.riyal}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center sm:justify-start p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] bg-bg border border-border group-hover:border-primary/20 transition-all duration-500 shadow-xs text-center sm:text-right">
            <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-card-bg shadow-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 border border-border mb-3 sm:mb-0 ${isRtl ? 'sm:ml-5' : 'sm:mr-5'}`}>
              <Clock size={20} className="sm:w-6 sm:h-6" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] sm:text-sm font-black text-gray-medium font-cairo mb-1 uppercase tracking-tight opacity-70 truncate">
                {isRtl ? "الوقت المتوقع" : "Time"}
              </span>
              <div className="flex items-baseline justify-center sm:justify-start gap-1 sm:gap-2">
                 <span className="text-lg sm:text-2xl font-black text-heading font-cairo leading-none">{proposal.proposedDurationInDays}</span>
                 <span className="text-[10px] sm:text-sm font-black text-gray-medium font-cairo">{t.common.days}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accept Button Logic */}
        {isProjectOwner && proposal.status === "Pending" && (
          <div className="mt-8 pt-8 border-t border-border/60">
            <button
              className="relative w-full cursor-pointer overflow-hidden rounded-2xl font-black font-cairo text-lg group/btn shadow-xl shadow-primary/20 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500"
              onClick={handleAcceptProposal}
              disabled={accepting}
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary via-teal-500 to-primary bg-size-[200%_auto] animate-[gradient_3s_linear_infinite] group-hover/btn:scale-105" />
              
              <div className={`relative flex items-center justify-center gap-3 py-5 px-8 text-white ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                {accepting ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    <span className="tracking-wide">{isRtl ? "جاري التأكيد..." : "Confirming..."}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={24} strokeWidth={3} />
                    <span className="tracking-wide uppercase">{t.projectDetails.acceptBtn}</span>
                  </>
                )}
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
