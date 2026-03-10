"use client";

import { useState } from "react";
import { Globe, Plus, Trash2, Loader2, Award } from "lucide-react";
import { useRemoveLanguage, useAddLanguage } from "@/hooks/profile/useProfile";
import { useConfirmDialog } from "@/components/ui/ConfirmDialog";
import { toast } from "@/common/toast";

interface ProfileLanguagesSectionProps {
  languages?: any[];
}


export default function ProfileLanguagesSection({ languages = [] }: 
  ProfileLanguagesSectionProps) {
    console.log(languages)
  const [isAdding, setIsAdding] = useState(false);
  const [newLang, setNewLang] = useState("");
  const [newLevel, setNewLevel] = useState("Native");
  
  const { confirm, Dialog } = useConfirmDialog();
  const addLangMutation = useAddLanguage();
  const removeLangMutation = useRemoveLanguage();

  const handleAdd = () => {
    if (!newLang.trim()) {
      toast.error("يرجى إدخال اسم اللغة");
      return;
    }
    addLangMutation.mutate({ languageName: newLang, proficiencyLevel: newLevel }, {
      onSuccess: () => {
        setIsAdding(false);
        setNewLang("");
      }
    });
  };

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "حذف اللغة",
      message: "هل أنت متأكد من حذف هذه اللغة؟",
      confirmText: "حذف",
      variant: "danger",
    });

    if (confirmed) {
      removeLangMutation.mutate(id);
    }
  };

  const levels = ["Native", "Fluent", "Conversational", "Basic"];

  return (
    <>
      <section className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
              <Globe size={20} />
            </div>
            اللغات
          </h2>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-xl font-black text-sm hover:bg-primary hover:text-white transition-all active:scale-[0.98]"
            >
              <Plus size={16} />
              إضافة لغة
            </button>
          )}
        </div>

        {isAdding && (
          <div className="mb-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="اسم اللغة (مثلاً: العربية)"
                value={newLang}
                onChange={(e) => setNewLang(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
              <select
                value={newLevel}
                onChange={(e) => setNewLevel(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm outline-none"
              >
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                disabled={addLangMutation.isPending}
                className="px-6 py-2.5 bg-primary text-white rounded-xl font-black text-sm disabled:opacity-50"
              >
                {addLangMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : "إضافة"}
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="px-6 py-2.5 bg-slate-200 text-slate-600 rounded-xl font-black text-sm"
              >
                إلغاء
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {languages.length > 0 ? (
            languages.map((lang: any) => (
              <div
                key={lang.id || lang.Id}
                className="group flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-sm hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors"
              >
                <span>{lang.languageName || lang.LanguageName}</span>
                <span className="text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-md">
                  {lang.proficiencyLevel || lang.ProficiencyLevel}
                </span>
                <button
                  onClick={() => handleDelete(lang.id || lang.Id)}
                  className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          ) : (
          ""
          )}
        </div>
      </section>
      <Dialog />
    </>
  );
}
