"use client";

import { Eye, Trash, Edit, Clock, Banknote, Calendar, Briefcase, Star, RefreshCw } from "lucide-react";
import React, { useState } from "react";
import EvaluationModal from "./EvaluationModal";
import { formatTimeAgo } from "@/utils/date";
import { useTranslation } from "@/hooks/useTranslation";

interface ProposalCardProps {
  offer: any;
  onDeleteProposal: (proposalId: number, jobRequestId?: number) => void;
  isClient?: boolean;
  onDeleteJobRequest?: (jobRequestId: number) => void;
  onEditJobRequest?: (jobRequestId: number) => void;
  onEvaluateFreelancer?: (jobRequestId: number, freelancerId: string, rating: number, comment: string) => void;
  onDeliverRequest?: (jobRequestId: number) => void;
  isEvaluating?: boolean;
}

export default function ProposalCard({ 
  offer, 
  onDeleteProposal, 
  isClient = false, 
  onDeleteJobRequest, 
  onEditJobRequest, 
  onDeliverRequest,
  onEvaluateFreelancer,
  isEvaluating = false
}: ProposalCardProps) {
  const [isEvalModalOpen, setIsEvalModalOpen] = useState(false);
  const { isRtl, t } = useTranslation();

  const handleViewDetails = () => {
    if (isClient) {
      window.location.href = `/announcements/${offer.id}`;
    } else {
      window.location.href = `/announcements/${offer.jobRequestId}`;
    }
  };

  const statusMap = {
    'Accepted': { 
      label: isRtl ? 'مقبول' : 'Accepted', 
      color: 'bg-primary/10 text-primary border-primary/20' 
    },
    'Rejected': { 
      label: isRtl ? 'مرفوض' : 'Rejected', 
      color: 'bg-red-500/10 text-red-500 border-red-500/20' 
    },
    'Pending': { 
      label: isRtl ? 'قيد الانتظار' : 'Pending', 
      color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
    },
    'InProgress': { 
      label: isRtl ? 'قيد التنفيذ' : 'In Progress', 
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' 
    },
    'Completed': { 
      label: isRtl ? 'مكتمل' : 'Completed', 
      color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
    },
  };

  const currentStatus = statusMap[offer.status as keyof typeof statusMap] || statusMap['Pending'];

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isClient) {
      onDeleteJobRequest?.(offer.id);
    } else {
      onDeleteProposal(offer.id, offer.jobRequestId);
    }
  };

  const handleDeliver = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isClient && (offer.status === 'Accepted' || offer.status === 'InProgress' || offer.status === 'Pending')) {
      const idToDeliver = offer.jobRequestId || offer.id;
      onDeliverRequest?.(idToDeliver);
    }
  };

  const handleOpenEval = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEvalModalOpen(true);
  };

  const handleEvalSubmit = (rating: number, comment: string) => {
    onEvaluateFreelancer?.(offer.id, offer.freelancerId || "", rating, comment);
    setIsEvalModalOpen(false);
  };

  return (
    <>
      <div 
        className={`group bg-card-bg rounded-[40px] border border-border p-6 md:p-10 hover:shadow-2xl transition-all duration-500 relative flex flex-col gap-8 overflow-hidden ${isRtl ? 'text-right' : 'text-left'}`} 
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Status Badge Top Row */}
        <div className={`flex ${isRtl ? 'justify-start' : 'justify-end'}`}>
          <span className={`px-6 py-2 rounded-full text-[11px] font-black border uppercase tracking-wider shadow-xs ${currentStatus.color}`}>
            {currentStatus.label}
          </span>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col gap-6 w-full max-w-full">
          <h3 className="text-2xl md:text-3xl font-black text-heading font-cairo leading-tight group-hover:text-primary transition-colors wrap-break-word ">
            {offer.title || offer.jobRequestTitle || (isRtl ? "طلب عمل" : "Job Request")}
          </h3>
          
          <p className="text-gray-medium text-base md:text-lg font-bold font-cairo leading-relaxed line-clamp-3 opacity-80wrap-break-word">
            {offer.description || (isRtl ? "لا يوجد وصف متاح لهذا الطلب" : "No description available for this request")}
          </p>

          {/* Info Cards Row */}
          <div className={`flex flex-wrap items-center gap-3 mt-2 ${isRtl ? 'justify-start' : 'justify-end'}`}>
            {/* Price */}
            <div className={`flex items-center gap-2 px-3 py-1.5 bg-bg/50 border border-border rounded-xl shadow-xs transition-transform hover:scale-105 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
              <Banknote className="w-4 h-4 text-primary" />
              <div className="flex items-center gap-1">
                <span className="text-heading font-black text-sm">{isClient ? (offer.budget ?? 0) : (offer.proposedPrice ?? 0)}</span>
                <span className="text-gray-medium text-[9px] font-black uppercase opacity-60 tracking-tighter">{t.common.riyal}</span>
              </div>
            </div>

            {/* Duration */}
            <div className={`flex items-center gap-2 px-3 py-1.5 bg-bg/50 border border-border rounded-xl shadow-xs transition-transform hover:scale-105 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
              <Clock className="w-4 h-4 text-blue-500" />
              <div className="flex items-center gap-1">
                <span className="text-heading font-black text-sm">{offer.durationInDays || offer.proposedDurationInDays || offer.duration || 0}</span>
                <span className="text-gray-medium text-[9px] font-black uppercase opacity-60 tracking-tighter">{t.common.days}</span>
              </div>
            </div>

            {/* Time Created */}
            <div className={`flex items-center gap-2 px-3 py-1.5 bg-bg/50 border border-border rounded-xl shadow-xs transition-transform hover:scale-105 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
              <Calendar className="w-4 h-4 text-gray-medium opacity-60" />
              <span className="text-gray-medium text-[9px] font-black uppercase tracking-tighter opacity-80 whitespace-nowrap">
                {offer.timeAgo || (offer.createdAt ? formatTimeAgo(offer.createdAt) : (isRtl ? "غير محدد" : "N/A"))}
                {!offer.timeAgo && offer.createdAt && !isRtl && " ago"}
              </span>
            </div>

            {/* Proposals Count (Client only) */}
            {isClient && (
              <div className={`flex items-center gap-2 px-3 py-1.5 bg-primary/5 border border-primary/10 rounded-xl shadow-xs transition-transform hover:scale-105 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                <Briefcase className="w-4 h-4 text-primary" />
                <div className="flex items-center gap-1">
                  <span className="text-primary font-black text-sm">{offer.proposalsCount ?? 0}</span>
                  <span className="text-primary/60 text-[9px] font-black uppercase tracking-tighter">{isRtl ? "عروض" : "Offers"}</span>
                </div>
              </div>
            )}
          </div>

          {/* Category/Skills Row */}
          {(offer.category || offer.skills?.length > 0) && (
            <div className={`flex flex-wrap gap-2.5 mt-3 ${isRtl ? 'justify-start' : 'justify-end'}`}>
              {offer.skills?.map((skill: any) => (
                <span key={skill.id} className="bg-bg border border-border text-gray-medium px-4 py-1.5 rounded-xl text-[11px] font-black transition-all hover:bg-primary/5 hover:border-primary/20 hover:text-primary cursor-default">
                  {isRtl ? skill.nameAr : skill.nameEn || skill.nameAr}
                </span>
              )) || (
                <span className="bg-bg border border-border border-dashed text-gray-medium px-5 py-2 rounded-2xl text-[11px] font-black tracking-wider uppercase opacity-80">
                  {offer.category || (isRtl ? "هوية بصرية" : "Branding")}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-border/60 ${isRtl ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
          {/* Modification Icons Area */}
          <div className={`flex gap-3 items-center ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
            {offer.status === 'Pending' && (
              <>
                {isClient ? (
                  <>
                    <button 
                      onClick={handleDelete}
                      className="p-3 bg-bg border border-border rounded-2xl text-gray-medium hover:text-red-500 hover:bg-red-500/5 hover:border-red-500/20 transition-all active:scale-95 shadow-xs"
                      title={isRtl ? "حذف" : "Delete"}
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onEditJobRequest?.(offer.id); }}
                      className="p-3 bg-bg border border-border rounded-2xl text-gray-medium hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all active:scale-95 shadow-xs"
                      title={isRtl ? "تعديل" : "Edit"}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleDelete}
                    className="flex items-center gap-2.5 text-red-500/80 hover:text-red-500 bg-red-500/5 border border-red-500/10 hover:border-red-500/30 px-6 py-2.5 rounded-xl font-black font-cairo text-sm transition-all active:scale-95 shadow-xs"
                  >
                    <span>{isRtl ? "سحب العرض" : "Withdraw Offer"}</span>
                    <Trash className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className={`flex flex-col xs:flex-row gap-3 items-center w-full sm:w-auto ${isRtl ? 'xs:flex-row' : 'xs:flex-row-reverse'}`}>
            <button 
              onClick={handleViewDetails}
              className="w-full xs:w-auto flex items-center justify-center gap-2.5 border-2 border-primary text-primary px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 shadow-xl shadow-primary/10 group/eye"
            >
              <Eye className="w-4.5 h-4.5 group-hover/eye:scale-110 transition-transform" />
              <span className="whitespace-nowrap">{isRtl ? "عرض التفاصيل" : "View Details"}</span>
            </button>

            {isClient && offer.status === 'Completed' && (
              <button 
                onClick={handleOpenEval}
                disabled={isEvaluating}
                className="w-full xs:w-auto flex items-center justify-center gap-2.5 bg-amber-500 text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-amber-600 transition-all duration-300 shadow-xl shadow-amber-500/20 active:scale-95"
              >
                <Star className="w-4.5 h-4.5 fill-white" />
                <span className="whitespace-nowrap">{isRtl ? "تقييم المستقل" : "Rate Freelancer"}</span>
              </button>
            )}

            {!isClient && (offer.status === 'InProgress' || offer.status === 'Accepted') && (
              <button 
                onClick={handleDeliver}
                className="w-full xs:w-auto flex items-center justify-center gap-2.5 bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 active:scale-95 group"
              >
                <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
                <span className="whitespace-nowrap">{isRtl ? "تسليم الطلب" : "Deliver Service"}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <EvaluationModal
        isOpen={isEvalModalOpen}
        onClose={() => setIsEvalModalOpen(false)}
        onSubmit={handleEvalSubmit}
        isSubmitting={isEvaluating}
      />
    </>
  );
}
