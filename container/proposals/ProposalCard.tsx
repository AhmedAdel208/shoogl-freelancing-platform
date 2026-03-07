"use client";

import { useRouter } from "next/navigation";
import { ProposalDisplay } from "@/lib/validation/proposalSchema";
import Image from "next/image";
import { proposalApi } from "@/lib/api/proposal";
import { useState } from "react";
import { Star, Clock, Wallet, CheckCircle2, Briefcase, XCircle, Loader2, MessageSquare } from "lucide-react";
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
        queryClient.invalidateQueries({ queryKey: ["proposals", proposal.jobRequestId] }),
        queryClient.invalidateQueries({ queryKey: ["project", proposal.jobRequestId] }),
        queryClient.invalidateQueries({ queryKey: ["my-proposals"] }),
      ]);
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

      <div className="p-7 md:p-9">
        {/* Header Section */}
        <div className={`flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className={`flex items-center gap-5 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
            <div 
              onClick={isProjectOwner ? handleContactFreelancer : undefined}
              className={`relative w-16 h-16 bg-bg rounded-2xl flex items-center justify-center shrink-0 ring-4 ring-border/30 shadow-xl transition-all duration-500 ${isProjectOwner ? 'cursor-pointer hover:ring-primary/30 group-hover:scale-105' : ''}`}
            >
              {proposal.freelancerAvatar ? (
                <Image
                  src={proposal.freelancerAvatar}
                  alt={proposal.freelancerName}
                  width={64}
                  height={64}
                  className="w-full h-full rounded-[14px] object-cover"
                />
              ) : (
                <span className="text-primary/40 text-2xl font-black font-cairo">
                  {proposal.freelancerName?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
              {/* Status Dot */}
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-emerald-500 border-4 border-card-bg rounded-full shadow-lg z-10" />
            </div>

            <div className={`flex flex-col ${isRtl ? 'items-start' : 'items-end'}`}>
              <div 
                onClick={isProjectOwner ? handleContactFreelancer : undefined}
                className={`flex items-center gap-2 group/name ${isProjectOwner ? 'cursor-pointer' : ''}`}
              >
                <h3 className="font-black text-heading text-xl md:text-2xl leading-tight font-cairo mb-2 group-hover/name:text-primary transition-colors">
                  {proposal.freelancerName}
                </h3>
                {isProjectOwner && (
                  <MessageSquare size={16} className="text-primary opacity-0 group-hover/name:opacity-100 transition-opacity" />
                )}
              </div>
              
              <div className={`flex flex-wrap items-center gap-3 text-sm font-bold ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/10 shadow-xs">
                  <Star className="text-amber-500 fill-amber-500" size={14} />
                  <span className="text-amber-600 font-black">
                    {proposal.freelancerRating?.toFixed(1) || "4.5"}
                  </span>
                </div>

                <span className="w-1.5 h-1.5 rounded-full bg-border" /> 

                <div className={`flex items-center gap-1.5 text-gray-medium ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                  <Briefcase size={14} className="opacity-60" />
                  <span className="mb-px whitespace-nowrap">{proposal.freelancerCompletedJobs || 0} {isRtl ? "مكتمل" : "Completed"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${status.bg} ${status.text} ${status.border} shrink-0 shadow-xs`}>
            {status.icon}
            <span className="text-sm font-black font-cairo tracking-wide">{status.label}</span>
          </div>
        </div>

        {/* Description Box */}
        <div className="mb-8 relative">
          <div className="absolute top-4 right-4 text-primary/5 -z-10">
            <MessageSquare size={120} />
          </div>
          <p className={`text-gray-medium text-base md:text-lg leading-relaxed font-bold font-cairo bg-bg/50 p-6 rounded-3xl border border-border/50 shadow-inner min-h-[100px] ${isRtl ? 'text-right' : 'text-left'}`}>
            {proposal.description}
          </p>
        </div>

        {/* Pricing & Duration Layout */}
        <div className={`flex flex-col sm:flex-row gap-5 pt-8 border-t border-dashed border-border ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className={`flex-1 flex items-center p-6 rounded-3xl bg-bg border border-border group-hover:border-primary/20 transition-all duration-500 shadow-xs ${isRtl ? 'flex-row' : 'flex-row-reverse text-left'}`}>
            <div className={`w-14 h-14 rounded-2xl bg-card-bg shadow-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 border border-border ${isRtl ? 'ml-5' : 'mr-5'}`}>
              <Wallet size={24} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-black text-gray-medium font-cairo mb-1 uppercase tracking-tight opacity-70">
                {isRtl ? "العرض المالي" : "Financial Offer"}
              </span>
              <div className={`flex items-baseline gap-2 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                 <span className="text-2xl font-black text-heading font-cairo leading-none">{proposal.proposedPrice}</span>
                 <span className="text-sm font-black text-gray-medium font-cairo uppercase">{t.common.riyal}</span>
              </div>
            </div>
          </div>
          
          <div className={`flex-1 flex items-center p-6 rounded-3xl bg-bg border border-border group-hover:border-primary/20 transition-all duration-500 shadow-xs ${isRtl ? 'flex-row' : 'flex-row-reverse text-left'}`}>
            <div className={`w-14 h-14 rounded-2xl bg-card-bg shadow-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 border border-border ${isRtl ? 'ml-5' : 'mr-5'}`}>
              <Clock size={24} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-black text-gray-medium font-cairo mb-1 uppercase tracking-tight opacity-70">
                {isRtl ? "الوقت المتوقع" : "Expected Time"}
              </span>
              <div className={`flex items-baseline gap-2 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                 <span className="text-2xl font-black text-heading font-cairo leading-none">{proposal.proposedDurationInDays}</span>
                 <span className="text-sm font-black text-gray-medium font-cairo uppercase">{t.common.days}</span>
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
