import { useState } from "react";
import { Briefcase, Plus, Trash2, Loader2 } from "lucide-react";
import { useUserSkills, useDeleteSkill } from "@/hooks/profile/useSkills";
import { UserSkill } from "@/types/skills";
import dynamic from "next/dynamic";
import { useConfirmDialog } from "@/components/ui/ConfirmDialog";

// Dynamic import for modal - only loads when needed
const AddSkillsModal = dynamic(() => import("./AddSkillsModal"), {
  loading: () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
  ssr: false,
});

export default function ProfileSkillsSection() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: userSkillsData, isLoading } = useUserSkills();
  const { confirm, Dialog } = useConfirmDialog();

  const skillsList = userSkillsData?.skills || [];

  const deleteMutation = useDeleteSkill();

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "حذف المهارة",
      message: "هل أنت متأكد من حذف هذه المهارة؟",
      confirmText: "حذف",
      cancelText: "إلغاء",
      variant: "danger",
    });

    if (confirmed) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <>
      <section className="bg-card-bg rounded-4xl p-8 shadow-sm border border-border">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-heading flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
              <Briefcase size={24} />
            </div>
            المهارات
          </h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-primary/10 text-primary rounded-2xl font-black text-sm hover:bg-primary hover:text-white transition-all active:scale-[0.98] shadow-xs"
          >
            <Plus size={18} />
            إضافة مهارة
          </button>
        </div>

        <div className="flex items-center flex-wrap gap-4">
          {isLoading ? (
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-24 h-10 bg-bg animate-pulse rounded-2xl border border-border/50"
                />
              ))}
            </div>
          ) : skillsList.length > 0 ? (
            skillsList.map((skill: UserSkill) => (
              <div
                key={skill.id}
                className="group flex items-center gap-4 px-5 py-3 bg-bg border border-border rounded-2xl text-heading font-black text-[15px] hover:border-rose-500/30 hover:bg-rose-500/5 transition-all duration-300"
              >
                <span className="opacity-90">
                  {skill.skillNameAr || skill.skillNameEn}
                </span>
                <button
                  onClick={() => handleDelete(skill.id)}
                  disabled={deleteMutation.isPending}
                  className="text-gray-medium/40 hover:text-rose-500 transition-all hover:scale-110 active:scale-90 cursor-pointer disabled:opacity-50"
                >
                  {deleteMutation.isPending &&
                  deleteMutation.variables === skill.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-border/50 rounded-[32px] bg-bg/30 w-full group hover:border-primary/30 transition-colors duration-500">
               <p className="text-gray-medium text-center text-sm md:text-base font-bold max-w-sm leading-relaxed px-10">
                لم تقم بإضافة أي مهارات بعد. أضف مهاراتك لتبهر العملاء وتزيد من فرص اختيارك.
              </p>
            </div>
          )}
        </div>
      </section>

      <AddSkillsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <Dialog />
    </>
  );
}
