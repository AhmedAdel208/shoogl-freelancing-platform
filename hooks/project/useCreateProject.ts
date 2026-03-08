"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { jobRequestService } from "@/lib/api/jobRequests";
import { useAllSkills } from "@/hooks/profile/useSkills";
import {
  createProjectSchema,
  type CreateProjectFormData,
} from "@/lib/validation/projectSchema";
import { Skill } from "@/types/skills";
import { toast } from "@/common/toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export function useCreateProject() {
  const router = useRouter();
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Fetch Skills
  const { data: skillsData, isLoading: isSkillsLoading } = useAllSkills();

  const availableSkills =
    skillsData?.categories.flatMap((cat) => cat.skills) || [];

  const form = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
      skillIds: [],
    },
  });

  const {
    setValue,
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
  } = form;

  const nextStep = async () => {
    const fieldsToValidate =
      step === 1
        ? (["title", "description", "skillIds"] as const)
        : (["budget", "duration", "deadline"] as const);

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep((prev) => Math.min(prev + 1, 2));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Create Project Mutation
  const createMutation = useMutation({
    mutationFn: (formData: FormData) =>
      jobRequestService.createJobRequest(formData),
    onSuccess: () => {
      toast.success("تم نشر طلبك بنجاح!");
      router.push("/announcements");
    },
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as
        | { message?: string }
        | undefined;
      toast.error(errorData?.message || "فشل إرسال الطلب");
    },
  });

  const onSubmit = (data: CreateProjectFormData) => {
    const formData = new FormData();
    formData.append("Title", data.title);
    formData.append("Description", data.description);
    formData.append("Budget", data.budget.toString());
    formData.append("DurationInDays", data.duration.toString());

    const deadlineDate = new Date(data.deadline);
    formData.append("Deadline", deadlineDate.toISOString());

    data.skillIds.forEach((id) => {
      formData.append("SkillIds", id.toString());
    });

    files.forEach((file) => {
      formData.append("Attachments", file);
    });

    createMutation.mutate(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleSkill = (skill: Skill) => {
    const isSelected = selectedSkills.some((s) => s.id === skill.id);
    let newSelected: Skill[];
    if (isSelected) {
      newSelected = selectedSkills.filter((s) => s.id !== skill.id);
    } else {
      newSelected = [...selectedSkills, skill];
    }
    setSelectedSkills(newSelected);
    setValue(
      "skillIds",
      newSelected.map((s) => s.id),
      { shouldValidate: true },
    );
  };

  return {
    form,
    availableSkills,
    selectedSkills,
    files,
    isSkillsLoading,
    isModalOpen,
    setIsModalOpen,
    isSubmitting: createMutation.isPending,
    toggleSkill,
    handleFileChange,
    removeFile,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    step,
    nextStep,
    prevStep,
    errors,
  };
}
