"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  proposalSchema,
  type ProposalFormData,
  type ProposalFormInput,
} from "@/lib/validation/proposalSchema";
import { Send, Clock, Banknote, FileText, Loader2, Sparkles} from "lucide-react";
import { useProposal } from "@/hooks/ads/useProposal";
import { ProposalSubmitData } from "@/lib/validation/proposalSchema";
import { useTranslation } from "@/hooks/useTranslation";

interface CreateProposalFormProps {
  jobRequestId: string;
  onSuccess?: (proposalId: number) => void;
}

export default function CreateProposalForm({
  jobRequestId,
  onSuccess,
}: CreateProposalFormProps) {

  const proposalMutation = useProposal();
  const { isRtl, t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ProposalFormInput, any, ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    mode: "onChange",
    defaultValues: {
      jobRequestId: Number(jobRequestId),
      description: "",
      proposedPrice: "",
      proposedDurationInDays: "",
    },
  });

  const router = useRouter();

  const handleFormSubmit = (data: ProposalFormData) => {
    const submitData: ProposalSubmitData = {
      jobRequestId: Number(data.jobRequestId),
      description: data.description,
      proposedPrice: data.proposedPrice,
      proposedDurationInDays: data.proposedDurationInDays,
    };

    proposalMutation.mutate(submitData, {
      onSuccess: (response) => {
        onSuccess?.(response.proposalId);
        reset();
        router.push("/requests?section=in-progress");
      },
    });
  };



  return (
    <div id="proposal-form-section" className="bg-card-bg rounded-[40px] border border-border shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Banner */}
      <div className={`bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-8 md:px-12 py-8 border-b border-border flex items-center justify-between gap-6 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex items-center gap-5 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className="w-14 h-14 rounded-2xl bg-card-bg shadow-lg flex items-center justify-center text-primary group border border-border/50 shrink-0">
             <Sparkles size={28} className="group-hover:rotate-12 transition-transform" />
          </div>
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <h3 className="text-2xl font-black text-heading font-cairo tracking-tight">
              {isRtl ? "أضف عرضك الآن" : "Add Your Proposal Now"}
            </h3>
            <p className="text-gray-medium text-base font-bold font-cairo opacity-70">
              {isRtl ? "ابدأ رحلتك مع هذا العميل بتقديم عرض احترافي" : "Start your journey with this client by providing a professional proposal"}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-8 md:p-12 space-y-9" dir={isRtl ? "rtl" : "ltr"}>
        {/* Description Section */}
        <div className="space-y-4">
          <label className={`flex items-center gap-3 text-heading font-black font-cairo text-lg ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
            <FileText size={22} className="text-primary/60" />
            {isRtl ? "تفاصيل العرض" : "Proposal Details"} <span className="text-rose-500">*</span>
          </label>
          <textarea
            {...register("description")}
            rows={6}
            placeholder={isRtl ? "اشرح خطة العمل، والمهارات التي تؤهلك لإنجاز المشروع بأفضل صورة..." : "Explain the work plan and the skills that qualify you to complete the project in the best possible way..."}
            className={`w-full resize-none rounded-3xl border-2 ${errors.description ? 'border-rose-500/20 bg-rose-500/5' : 'border-border bg-bg/50'} p-6 text-base font-bold font-cairo text-heading focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/40 focus:bg-card-bg transition-all duration-300 placeholder:text-gray-medium/20 shadow-inner ${isRtl ? 'text-right' : 'text-left'}`}
          />
          {errors.description && (
            <p className={`text-rose-500 text-xs font-black font-cairo flex items-center gap-2 mt-2 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Pricing & Time Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Price Input */}
           <div className="space-y-4">
              <label className={`flex items-center gap-3 text-heading font-black font-cairo text-base ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                <Banknote size={20} className="text-primary/60" />
                {isRtl ? "الميزانية المقترحة" : "Proposed Budget"}
              </label>
              <div className="relative group/field">
                <input
                  type="text"
                  inputMode="numeric"
                  {...register("proposedPrice")}
                  placeholder="0.00"
                  className={`w-full rounded-3xl border-2 ${errors.proposedPrice ? 'border-rose-500/20 bg-rose-500/5' : 'border-border bg-bg/50'} py-5 ${isRtl ? 'pr-6 pl-16 text-right' : 'pl-6 pr-16 text-left'} text-xl font-black font-cairo text-heading focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/40 focus:bg-card-bg transition-all duration-300 shadow-sm`}
                />
                <div className={`absolute ${isRtl ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 text-gray-medium font-black text-xs font-cairo pointer-events-none group-focus-within/field:text-primary transition-colors opacity-60`}>
                  {t.common.riyal}
                </div>
              </div>
              {errors.proposedPrice && <p className="text-rose-500 text-[11px] font-black font-cairo">{errors.proposedPrice.message}</p>}
           </div>

           {/* Duration Input */}
           <div className="space-y-4">
              <label className={`flex items-center gap-3 text-heading font-black font-cairo text-base ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                <Clock size={20} className="text-primary/60" />
                {isRtl ? "مدة التنفيذ" : "Execution Duration"}
              </label>
              <div className="relative group/field">
                <input
                  type="text"
                  inputMode="numeric"
                  {...register("proposedDurationInDays")}
                  placeholder="0"
                  className={`w-full rounded-3xl border-2 ${errors.proposedDurationInDays ? 'border-rose-500/20 bg-rose-500/5' : 'border-border bg-bg/50'} py-5 ${isRtl ? 'pr-6 pl-16 text-right' : 'pl-6 pr-16 text-left'} text-xl font-black font-cairo text-heading focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/40 focus:bg-card-bg transition-all duration-300 shadow-sm`}
                />
                <div className={`absolute ${isRtl ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 text-gray-medium font-black text-xs font-cairo pointer-events-none group-focus-within/field:text-primary transition-colors opacity-60`}>
                  {t.common.days}
                </div>
              </div>
              {errors.proposedDurationInDays && <p className="text-rose-500 text-[11px] font-black font-cairo">{errors.proposedDurationInDays.message}</p>}
           </div>
        </div>

        {/* Submit Button Section */}
        <div className={`pt-6 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-border mt-6 ${isRtl ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
           <div className="hidden lg:block">
              <p className="text-gray-medium text-sm font-bold font-cairo opacity-60">
                {isRtl ? "تأكد من مراجعة عرضك جيداً قبل الإرسال." : "Make sure to review your proposal carefully before sending."}
              </p>
           </div>
           
           <button
              type="submit"
              disabled={proposalMutation.isPending || !isValid}
              className="w-full lg:w-fit min-w-[280px] relative overflow-hidden bg-primary text-white py-5 px-12 rounded-2xl font-black font-cairo text-lg shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none group/btn cursor-pointer"
           >
              <div className={`relative z-10 flex items-center justify-center gap-4 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                {proposalMutation.isPending ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>{isRtl ? "جاري الإرسال..." : "Sending..."}</span>
                  </>
                ) : (
                  <>
                    <Send size={22} className={isRtl ? "rotate-180" : ""} />
                    <span className="tracking-wide uppercase">{isRtl ? "إرسال العرض للعميل" : "Send Proposal"}</span>
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] pointer-events-none" />
           </button>
        </div>
      </form>
    </div>
  );
}
