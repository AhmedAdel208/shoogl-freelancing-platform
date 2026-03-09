"use client";

import { useState } from "react";
import { Award, Plus, Trash2, Loader2, Calendar, User } from "lucide-react";
import { useRemoveCertificate, useAddCertificate } from "@/hooks/profile/useProfile";
import { useConfirmDialog } from "@/components/ui/ConfirmDialog";
import { toast } from "@/common/toast";

interface ProfileCertificatesSectionProps {
  certificates?: any[];
}

export default function ProfileCertificatesSection({ certificates = [] }: ProfileCertificatesSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issueDate: "",
  });
  const [file, setFile] = useState<File | null>(null);
  
  const { confirm, Dialog } = useConfirmDialog();
  const addCertMutation = useAddCertificate();
  const removeCertMutation = useRemoveCertificate();

  const handleAdd = () => {
    if (!formData.title.trim()) {
      toast.error("يرجى إدخال عنوان الشهادة");
      return;
    }
    
    addCertMutation.mutate({
      ...formData,
      certificateFile: file || undefined
    }, {
      onSuccess: () => {
        setIsAdding(false);
        setFormData({ title: "", issuer: "", issueDate: "" });
        setFile(null);
      }
    });
  };

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "حذف الشهادة",
      message: "هل أنت متأكد من حذف هذه الشهادة؟",
      confirmText: "حذف",
      variant: "danger",
    });

    if (confirmed) {
      removeCertMutation.mutate(id);
    }
  };

  return (
    <>
      <section className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
              <Award size={20} />
            </div>
            الشهادات
          </h2>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-xl font-black text-sm hover:bg-primary hover:text-white transition-all active:scale-[0.98]"
            >
              <Plus size={16} />
              إضافة شهادة
            </button>
          )}
        </div>

        {isAdding && (
          <div className="mb-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-2">
            <input
              type="text"
              placeholder="عنوان الشهادة"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm outline-none"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="الجهة المانحة"
                value={formData.issuer}
                onChange={(e) => setFormData({...formData, issuer: e.target.value})}
                className="px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm outline-none"
              />
              <input
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                className="px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-slate-500 mr-2">صورة الشهادة (اختياري)</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAdd}
                disabled={addCertMutation.isPending}
                className="px-6 py-2.5 bg-primary text-white rounded-xl font-black text-sm disabled:opacity-50"
              >
                {addCertMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : "إضافة"}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.length > 0 ? (
            certificates.map((cert: any) => (
              <div
                key={cert.id || cert.Id}
                className="relative group p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-purple-200 hover:bg-purple-50/30 transition-all"
              >
                <button
                  onClick={() => handleDelete(cert.id || cert.Id)}
                  className="absolute top-4 left-4 text-slate-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-purple-400 shrink-0 shadow-sm">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-sm mb-1">{cert.title || cert.Title}</h4>
                    {(cert.issuer || cert.Issuer) && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold mb-1">
                        <User size={12} />
                        <span>{cert.issuer || cert.Issuer}</span>
                      </div>
                    )}
                    {(cert.issueDate || cert.IssueDate) && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                        <Calendar size={12} />
                        <span>{new Date(cert.issueDate || cert.IssueDate).toLocaleDateString('ar-SA')}</span>
                      </div>
                    )}
                  </div>
                </div>
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
