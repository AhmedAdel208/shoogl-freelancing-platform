"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  proposalSchema,
  type ProposalFormData,
  type ProposalFormInput,
} from "@/lib/validation/proposalSchema";
import { X, Send, Clock, Banknote, FileText, ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProposalFormData) => void;
  isSubmitting?: boolean;
  jobRequestId: number;
}

export default function ProposalModal({
  isOpen,
  onClose,
  onSubmit,
  jobRequestId,
  isSubmitting = false,
}: ProposalModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    mode: "onChange",
    defaultValues: {
      jobRequestId: Number(jobRequestId),
      description: "",
      proposedPrice: 0,
      proposedDurationInDays: 0,
    },
  });

  // Re-sync jobRequestId if it changes
  useEffect(() => {
    if (jobRequestId) {
      setValue("jobRequestId", Number(jobRequestId));
    }
  }, [jobRequestId, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data: ProposalFormData) => {
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with premium blur */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500"
        onClick={handleClose}
      />

      {/* Modal content */}
      <div 
        className="relative w-full max-w-xl bg-white rounded-[32px] shadow-[0_30px_70px_rgba(0,0,0,0.15)] border border-white overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-500" 
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="bg-linear-to-br from-primary/5 to-transparent p-7 pb-4 border-b border-slate-50 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Send size={22} className="rotate-180 mb-0.5" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 font-cairo tracking-tight">إرسال عرضك الآن</h2>
            </div>
            <button 
              onClick={handleClose}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100/50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-slate-500 text-[15px] font-bold font-cairo leading-relaxed max-w-sm">
            أقنع صاحب المشروع بمهاراتك وقدم عرضاً جذاباً يتناسب مع متطلباته.
          </p>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-7 space-y-6">
          
          {/* Description Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-slate-800 font-black font-cairo text-base">
                <FileText size={18} className="text-primary/60" />
                تفاصيل العرض
                <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] font-black font-cairo bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md">20 حرفاً على الأقل</span>
            </div>
            <textarea
              {...register("description")}
              rows={5}
              placeholder="اشرح خطة العمل، والمهارات التي تؤهلك لإنجاز المشروع بأفضل صورة..."
              className={`w-full resize-none rounded-2xl border ${errors.description ? 'border-rose-200 bg-rose-50/20' : 'border-slate-100 bg-slate-50/50'} p-4 text-[15px] font-bold font-cairo text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 focus:bg-white transition-all duration-300 placeholder:text-slate-300`}
            />
            {errors.description && (
              <p className="text-rose-500 text-xs font-black font-cairo flex items-center gap-1 mt-1 animate-in slide-in-from-top-1">
                <X size={12} strokeWidth={3} />
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price & Duration Grid */}
          <div className="grid grid-cols-2 gap-5">
             {/* Proposed Price */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-slate-700 font-black font-cairo text-sm">
                  <Banknote size={16} className="text-primary/60" />
                  السعر المقترح
                </label>
                <div className="relative group">
                  <input
                    type="number"
                    step="0.01"
                    {...register("proposedPrice", { valueAsNumber: true })}
                    placeholder="0.00"
                    className={`w-full rounded-2xl border ${errors.proposedPrice ? 'border-rose-200 bg-rose-50/20' : 'border-slate-100 bg-slate-50/50'} pr-5 pl-12 py-3.5 text-base font-black font-cairo text-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 focus:bg-white transition-all duration-300 placeholder:text-slate-300`}
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-xs font-cairo pointer-events-none group-focus-within:text-primary transition-colors">ريال</div>
                </div>
                {errors.proposedPrice && (
                  <p className="text-rose-500 text-[10px] font-black font-cairo mt-1">{errors.proposedPrice.message}</p>
                )}
             </div>

             {/* Proposed Duration */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-slate-700 font-black font-cairo text-sm">
                  <Clock size={16} className="text-primary/60" />
                  المدة المتوقعة
                </label>
                <div className="relative group">
                  <input
                    type="number"
                    {...register("proposedDurationInDays", { valueAsNumber: true })}
                    placeholder="0"
                    className={`w-full rounded-2xl border ${errors.proposedDurationInDays ? 'border-rose-200 bg-rose-50/20' : 'border-slate-100 bg-slate-50/50'} pr-5 pl-12 py-3.5 text-base font-black font-cairo text-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 focus:bg-white transition-all duration-300 placeholder:text-slate-300`}
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-xs font-cairo pointer-events-none group-focus-within:text-primary transition-colors">يـوم</div>
                </div>
                {errors.proposedDurationInDays && (
                  <p className="text-rose-500 text-[10px] font-black font-cairo mt-1">{errors.proposedDurationInDays.message}</p>
                )}
             </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
             <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="flex-2 relative overflow-hidden bg-primary text-white py-4 rounded-2xl font-black font-cairo text-base shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none group/btn cursor-pointer"
             >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="w-5 h-5 animate-spin" />
                      <span>جاري المعالجة...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} className="rotate-180" />
                      <span>تأكيد وإرسال العرض</span>
                    </>
                  )}
                </div>
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none" />
             </button>

             <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-slate-50 text-slate-400 py-4 rounded-2xl font-black font-cairo text-base hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer"
             >
                إلغاء
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const LoaderCircle = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
