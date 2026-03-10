// container/actions/EditProjectPage.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProjectDetail } from "@/hooks/project/useProjectDetail";
import {
  editProjectSchema,
  EditProjectFormData,
} from "@/lib/validation/editProjectSchema";
import { useUpdateProject } from "@/hooks/project/useUpdateProject";
import { Button, FormInput } from "@/container/reusable/form";
import { Save } from "lucide-react";
import { formatDeadlineForInput } from "@/utils/date";
import Spinner from "@/common/Spinner";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  // Fetch real project data
  const {
    data: project,
    isLoading,
    error,
  } = useProjectDetail({
    id: projectId,
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<EditProjectFormData>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      budget: 0,
      durationInDays: 30,
      deadline: "",
    },
  });

  // Update form data when project data is loaded
  useEffect(() => {
    if (project && !isDirty) {
      reset({
        title: project.title || "",
        description: project.description || "",
        budget: Number(project.budget) || 0,
        durationInDays: project.durationInDays || 30,
        deadline: formatDeadlineForInput(project.deadline),
      });
    }
  }, [project, reset, isDirty]);

  const updateMutation = useUpdateProject();

  const onSubmit = (data: EditProjectFormData) => {
    updateMutation.mutate({ id: projectId, data });
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">فشل تحميل المشروع</h2>
          <p className="text-gray-400 mb-4">
            حدث خطأ أثناء تحميل بيانات المشروع
          </p>
          <Button
            onClick={handleCancel}
            variant="primary"
            className="mx-auto cursor-pointer"
          >
            العودة
          </Button>
        </div>
      </main>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card-bg rounded-3xl p-8 space-y-8 border border-border shadow-xl mb-12"
    >
      {/* Title */}
      <FormInput
        label="عنوان المشروع"
        type="text"
        placeholder="أدخل عنوان المشروع"
        required
        registration={register("title")}
        error={errors.title?.message}
        className="text-heading"
      />

      {/* Description */}
      <FormInput
        label="وصف المشروع"
        type="textarea"
        placeholder="أدخل وصف تفصيلي للمشروع"
        required
        registration={register("description")}
        error={errors.description?.message}
        rows={5}
        className="text-heading"
      />

      {/* Budget */}
      <FormInput
        label="الميزانية (ريال)"
        type="number"
        placeholder="أدخل الميزانية"
        required
        registration={register("budget", { valueAsNumber: true })}
        error={errors.budget?.message}
        className="text-heading"
      />

      {/* Duration */}
      <FormInput
        label="مدة المشروع (أيام)"
        type="number"
        placeholder="أدخل مدة المشروع بالأيام"
        required
        registration={register("durationInDays", { valueAsNumber: true })}
        error={errors.durationInDays?.message}
        className="text-heading"
      />

      {/* Deadline */}
      <FormInput
        label="الموعد النهائي (اختياري)"
        type="date"
        registration={register("deadline")}
        error={errors.deadline?.message}
        className="text-heading"
      />

      {/* Buttons */}
      <div className="flex gap-4 pt-4" dir="ltr">
        <Button
          type="submit"
          variant="primary"
          loading={updateMutation.isPending}
          icon={Save}
          className="flex-1"
        >
          حفظ التغييرات
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleCancel}
          className="flex-1"
        >
          إلغاء
        </Button>
      </div>
    </form>
  );
}
