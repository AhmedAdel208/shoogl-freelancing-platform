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
      <section className="bg-card-bg rounded-[32px] p-8 shadow-sm border border-border">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black text-heading flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
              <Award size={24} />
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
          <div className="mb-10 p-8 bg-bg/50 rounded-[28px] border border-border space-y-5 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="space-y-2">
              <label className="text-sm font-black text-heading mr-1">عنوان الشهادة</label>
              <input
                type="text"
                placeholder="مثال: شهادة احترافية في تصميم الواجهات"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-5 py-4 bg-card-bg border border-border rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
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
                className="relative group p-6 bg-bg/40 border border-border rounded-[28px] hover:border-primary/30 hover:bg-primary/2 transition-all duration-300"
              >
                <button
                  onClick={() => handleDelete(cert.id || cert.Id)}
                  className="absolute top-6 left-6 text-gray-medium/40 hover:text-rose-500 transition-all hover:scale-110 active:scale-90"
                >
                  <Trash2 size={18} />
                </button>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-card-bg border border-border flex items-center justify-center text-primary shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <Award size={28} />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <h4 className="font-black text-heading text-base group-hover:text-primary transition-colors">{cert.title || cert.Title}</h4>
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
