"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "@/common/toast";
import { User, Mail, MessageSquare, Send } from "lucide-react";
import { submitContactForm } from "./contactAction";
import { useTranslation } from "@/hooks/useTranslation";

const initialState = {
  success: false,
  message: "",
  timestamp: Date.now(),
};

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { t, isRtl } = useTranslation();
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        formRef.current?.reset();
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  const labels = {
    title: isRtl ? "أرسل لنا رسالة" : "Send us a message",
    subtitle: isRtl ? "نسعد دائماً بالاستماع إليكم والإجابة على استفساراتكم" : "We are always happy to hear from you and answer your inquiries",
    name: isRtl ? "الاسم الكامل" : "Full Name",
    email: isRtl ? "البريد الإلكتروني" : "Email Address",
    subject: isRtl ? "الموضوع" : "Subject",
    message: isRtl ? "الرسالة" : "Message",
    placeholderName: isRtl ? "مثال: أحمد محمد" : "e.g. John Doe",
    placeholderEmail: "example@mail.com",
    placeholderSubject: isRtl ? "عما تريد الاستفسار؟" : "What is your inquiry about?",
    placeholderMessage: isRtl ? "اكتب تفاصيل رسالتك هنا..." : "Type your message details here...",
    submit: isRtl ? "إرسال الرسالة" : "Send Message",
    sending: isRtl ? "جاري الإرسال..." : "Sending..."
  };

  return (
    <div className="bg-card-bg rounded-[40px] p-8 md:p-14 transition-all duration-500 h-full">
      <div className={`flex items-center gap-5 mb-12 ${isRtl ? 'flex-row' : 'flex-row-reverse justify-end'}`}>
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
          <MessageSquare size={28} strokeWidth={2.5} />
        </div>
        <div className={isRtl ? 'text-right' : 'text-left'}>
          <h2 className="text-2xl md:text-3xl font-black text-heading font-cairo mb-2">{labels.title}</h2>
          <p className="text-gray-medium font-bold text-sm md:text-base font-cairo opacity-70">{labels.subtitle}</p>
        </div>
      </div>
      
      <form action={formAction} ref={formRef} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label htmlFor="name" className={`flex items-center gap-2 text-[13px] font-black text-heading font-cairo uppercase tracking-wider ${isRtl ? 'mr-1' : 'ml-1'}`}>
              <User size={16} className="text-primary/50" />
              {labels.name}
            </label>
            <div className="relative group">
              <input
                type="text"
                id="name"
                name="name"
                required
                className={`w-full bg-bg/50 border border-border rounded-2xl px-6 py-4.5 font-bold font-cairo text-heading outline-none transition-all focus:bg-card-bg focus:border-primary focus:ring-4 focus:ring-primary/5 hover:border-primary/30 ${isRtl ? 'text-right' : 'text-left'}`}
                placeholder={labels.placeholderName}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="email" className={`flex items-center gap-2 text-[13px] font-black text-heading font-cairo uppercase tracking-wider ${isRtl ? 'mr-1' : 'ml-1'}`}>
              <Mail size={16} className="text-primary/50" />
              {labels.email}
            </label>
            <div className="relative group">
              <input
                type="email"
                id="email"
                name="email"
                required
                className={`w-full bg-bg/50 border border-border rounded-2xl px-6 py-4.5 font-bold font-cairo text-heading outline-none transition-all focus:bg-card-bg focus:border-primary focus:ring-4 focus:ring-primary/5 hover:border-primary/30 ${isRtl ? 'text-right' : 'text-left'}`}
                placeholder={labels.placeholderEmail}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="subject" className={`flex items-center gap-2 text-[13px] font-black text-heading font-cairo uppercase tracking-wider ${isRtl ? 'mr-1' : 'ml-1'}`}>
             <MessageSquare size={16} className="text-primary/50" />
            {labels.subject}
          </label>
          <div className="relative group">
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className={`w-full bg-bg/50 border border-border rounded-2xl px-6 py-4.5 font-bold font-cairo text-heading outline-none transition-all focus:bg-card-bg focus:border-primary focus:ring-4 focus:ring-primary/5 hover:border-primary/30 ${isRtl ? 'text-right' : 'text-left'}`}
              placeholder={labels.placeholderSubject}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="message" className={`flex items-center gap-2 text-[13px] font-black text-heading font-cairo uppercase tracking-wider ${isRtl ? 'mr-1' : 'ml-1'}`}>
            <MessageSquare size={16} className="text-primary/50" />
            {labels.message}
          </label>
          <div className="relative group">
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className={`w-full bg-bg/50 border border-border rounded-[24px] px-6 py-5 font-bold font-cairo text-heading outline-none transition-all focus:bg-card-bg focus:border-primary focus:ring-4 focus:ring-primary/5 hover:border-primary/30 resize-none ${isRtl ? 'text-right' : 'text-left'}`}
              placeholder={labels.placeholderMessage}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full h-16 bg-primary text-white rounded-[20px] font-black font-cairo text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer group shadow-xl shadow-primary/20 hover:shadow-primary/30 mt-4 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {isPending ? (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{labels.sending}</span>
            </div>
          ) : (
            <>
              {!isRtl && <Send size={22} strokeWidth={2.5} className="group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform" />}
              <span className="tracking-wide uppercase">{labels.submit}</span>
              {isRtl && <Send size={22} strokeWidth={2.5} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
