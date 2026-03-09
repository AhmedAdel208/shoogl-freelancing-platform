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
    <section className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <FileText size={20} />
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
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={editedBio}
              onChange={(e) => {
                setEditedBio(e.target.value);
                adjustHeight();
              }}
              placeholder="اكتب نبذة عن خبراتك ومهاراتك..."
              className="w-full min-h-[180px] p-6 bg-slate-50/50 border border-slate-200 rounded-[24px] text-slate-700 font-bold text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary focus:outline-none transition-colors resize-none leading-relaxed overflow-hidden"
            />
            
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <span className={`text-[13px] font-black ${charCount > 10 ? 'text-primary' : 'text-slate-400'}`}>
                  {charCount > 10 ? 'ممتاز!' : ''}
                </span>
                <span className="text-[13px] font-bold text-slate-400 font-cairo">
                  {charCount} / 500 حرف
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    charCount > 500 ? 'bg-rose-500' : 'bg-primary'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h4 className="flex items-center gap-2 text-sm font-black text-slate-700 mb-3">
              <Lightbulb size={18} className="text-amber-500" />
              نصائح لكتابة سيرة ذاتية جيدة:
            </h4>
            <ul className="space-y-2 text-[13px] text-slate-500 font-bold list-disc pr-5 leading-relaxed">
              <li>اذكر خبراتك ومهاراتك الرئيسية</li>
              <li>أضف أمثلة على مشاريع سابقة</li>
              <li>كن واضحاً ومختصراً</li>
              <li>اذكر ما يميزك عن الآخرين</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
               onClick={handleSave}
               disabled={isUpdating}
               className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-black font-cairo hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isUpdating ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <Save size={18} />
                  <span>حفظ</span>
                </>
              )}
            </button>
            <button
               onClick={handleCancel}
               disabled={isUpdating}
               className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-600 py-4 rounded-2xl font-black font-cairo hover:bg-slate-200 transition-all active:scale-[0.98]"
            >
              <X size={18} />
              <span>إلغاء</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 hover:bg-white transition-colors duration-300">
          {bio ? (
            <p className="text-slate-600 font-bold leading-relaxed text-sm whitespace-pre-line">
              {bio}
            </p>
          ) : (
            <p className="text-slate-400 text-center text-sm font-bold w-full py-4 border-dashed border border-slate-200 rounded-xl">
              أضف نبذة تعريفية عنك لتزيد من فرص حصولك على مشاريع
            </p>
          )}
        </div>
      )}
    </section>
  );
}
