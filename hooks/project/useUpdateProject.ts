"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobRequestService } from "@/lib/api/jobRequests";
import { EditProjectFormData } from "@/lib/validation/editProjectSchema";
import { toast } from "@/common/toast";
import { useRouter } from "next/navigation";

export function useUpdateProject() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditProjectFormData }) =>
      jobRequestService.updateJobRequest(id, data),
    onSuccess: (_, variables) => {
      toast.success("تم تحديث المشروع بنجاح");
      router.back();

      // Invalidate related queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["jobRequests"] });
    },
    onError: () => {
      toast.error("فشل تحديث المشروع");
    },
  });
}
