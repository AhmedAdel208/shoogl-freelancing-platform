"use client";

import { useState, useEffect } from "react";
import { Edit2, FileText, Save, X, Lightbulb, Loader2 } from "lucide-react";
import { useUpdateBio } from "@/hooks/profile/useProfile";
import { toast } from "@/common/toast";
import { useRef } from "react";

interface ProfileBioSectionProps {
  bio?: string;
}

export default function ProfileBioSection({ bio }: ProfileBioSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(bio || "");
  const { mutate: updateBio, isPending: isUpdating } = useUpdateBio();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditedBio(bio || "");
  }, [bio]);

  // Auto-expand function
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(180, textarea.scrollHeight)}px`;
    }
  };

  useEffect(() => {
    if (isEditing) {
      setTimeout(adjustHeight, 0);
    }
  }, [isEditing]);

  const handleSave = () => {
    if (!editedBio || editedBio.trim().length === 0) {
      toast.error("النبذة التعريفية لا يمكن أن تكون فارغة");
      return;
    }
    if (editedBio.trim().length < 10) {
      toast.error("النبذة التعريفية يجب أن تكون 10 أحرف على الأقل");
      return;
    }
    if (editedBio.length > 500) {
      toast.error("السيرة الذاتية لا يمكن أن تتجاوز 500 حرف");
      return;
    }
    updateBio(editedBio, {
      onSuccess: () => setIsEditing(false)
    });
  };

  const handleCancel = () => {
    setEditedBio(bio || "");
    setIsEditing(false);
  };

  const charCount = editedBio.length;
  const progressPercent = Math.min((charCount / 500) * 100, 100);

  return (
    <section className="bg-card-bg rounded-[32px] p-8 shadow-sm border border-border transition-all duration-300">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-black text-heading flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
            <FileText size={24} />
          </div>
          السيرة الذاتية
        </h2>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-xl font-black text-sm hover:bg-primary hover:text-white transition-all active:scale-[0.98]"
          >
            <Edit2 size={16} />
            تعديل
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="relative group">
            <textarea
              ref={textareaRef}
              value={editedBio}
              onChange={(e) => {
                setEditedBio(e.target.value);
                adjustHeight();
              }}
              placeholder="اكتب نبذة عن خبراتك ومهاراتك..."
              className="w-full min-h-[180px] p-8 bg-bg/50 border border-border rounded-[32px] text-heading font-bold text-base focus:bg-card-bg focus:ring-4 focus:ring-primary/10 focus:border-primary/50 focus:outline-none transition-all resize-none leading-relaxed overflow-hidden shadow-inner"
            />
            
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex justify-between items-center px-2">
                <span className={`text-[13px] font-black tracking-tight ${charCount > 10 ? 'text-primary' : 'text-gray-medium'}`}>
                  {charCount > 500 ? 'تجاوزت الحد المسموح' : charCount > 10 ? 'هذا رائع!' : 'اكتب المزيد...'}
                </span>
                <span className="text-[13px] font-bold text-gray-medium font-cairo">
                  {charCount} / 500 حرف
                </span>
              </div>
              <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    charCount > 500 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-primary shadow-[0_0_10px_rgba(26,170,173,0.4)]'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-bg/40 rounded-[28px] p-8 border border-border/50 group-hover:bg-bg/60 transition-colors">
            <h4 className="flex items-center gap-3 text-base font-black text-heading mb-4">
              <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
                <Lightbulb size={20} />
              </div>
              نصائح لكتابة سيرة ذاتية جيدة:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-medium font-bold pr-1">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>اذكر خبراتك ومهاراتك الرئيسية</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>أضف أمثلة على مشاريع سابقة</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>كن واضحاً ومختصراً في عرضك</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>اذكر ما يميزك عن الآخرين</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
               onClick={handleSave}
               disabled={isUpdating}
               className="flex-1 flex items-center justify-center gap-3 bg-primary text-white py-5 rounded-2xl font-black font-cairo hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50 group"
            >
              {isUpdating ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <>
                  <Save size={20} className="group-hover:scale-110 transition-transform" />
                  <span>حفظ التغييرات</span>
                </>
              )}
            </button>
            <button
               onClick={handleCancel}
               disabled={isUpdating}
               className="flex-1 flex items-center justify-center gap-3 bg-bg border-2 border-border text-gray-medium py-5 rounded-2xl font-black font-cairo hover:bg-card-bg hover:text-heading transition-all active:scale-[0.98]"
            >
              <X size={20} />
              <span>إلغاء</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-bg/40 rounded-[32px] p-10 border border-border/50 hover:bg-bg/60 hover:border-border transition-all duration-300 shadow-inner group">
          {bio ? (
            <p className="text-gray-dark font-bold leading-loose text-base md:text-lg whitespace-pre-line">
              {bio}
            </p>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-border/50 rounded-[28px] bg-card-bg/30">
              <p className="text-gray-medium text-center text-sm md:text-base font-bold max-w-[280px] leading-relaxed">
                أضف نبذة تعريفية عنك لتزيد من فرص حصولك على مشاريع وتحسن ثقة العملاء بك
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
