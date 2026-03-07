"use client";

import EditIcon from "@/public/icons/EditIcon";
import TrashIcon from "@/public/icons/TrashIcon";
import DeleteConfirmModal from "@/components/ui/modals/DeleteConfirmModal";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Settings } from "lucide-react";

interface OwnerActionsProps {
  onEditProject: () => void;
  onDeleteProject: () => void;
  projectStatus?: string;
}

export default function OwnerActions({
  onEditProject,
  onDeleteProject,
  projectStatus,
}: OwnerActionsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isRtl } = useTranslation();

  const title = isRtl ? "إدارة المشروع" : "Project Management";
  const editLabel = isRtl ? "تعديل المشروع" : "Edit Project";
  const deleteLabel = isRtl ? "حذف المشروع" : "Delete Project";
  const warningText = isRtl 
    ? "لا يمكن تعديل أو حذف المشروع حالياً لأنه في مرحلة التنفيذ." 
    : "The project cannot be edited or deleted currently as it is in the implementation phase.";

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className={`flex items-center gap-3 ${isRtl ? 'flex-row' : 'flex-row-reverse justify-end'}`}>
          <h3 className="text-lg font-black text-heading font-cairo">
            {title}
          </h3>
          <div className="w-9 h-9 rounded-xl bg-card-bg border border-border flex items-center justify-center text-gray-medium shadow-xs">
            <Settings size={18} strokeWidth={2.5} />
          </div>
        </div>

        {/* Status Warning */}
        {projectStatus === "InProgress" ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 flex items-start gap-3 shadow-xs">
            <span className="text-amber-500 text-lg mt-0.5 animate-bounce">⚠️</span>
            <p className="text-amber-700 dark:text-amber-500 text-sm font-black font-cairo leading-relaxed">
              {warningText}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <button
              onClick={onEditProject}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-card-bg border border-primary/30 hover:border-primary text-primary hover:bg-primary/5 rounded-2xl font-black font-cairo transition-all duration-300 active:scale-[0.98] group/edit cursor-pointer shadow-sm shadow-primary/5"
            >
              <EditIcon className="w-5 h-5 transition-transform group-hover/edit:-rotate-12" />
              <span>{editLabel}</span>
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/10 hover:border-red-500 rounded-2xl font-black font-cairo transition-all duration-300 active:scale-[0.98] group/delete cursor-pointer shadow-sm shadow-red-500/5"
            >
              <TrashIcon className="w-5 h-5 transition-transform group-hover/delete:scale-110" />
              <span>{deleteLabel}</span>
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          onDeleteProject();
          setIsDeleteModalOpen(false);
        }}
      />
    </>
  );
}
