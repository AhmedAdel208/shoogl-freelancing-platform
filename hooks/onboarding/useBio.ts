"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/common/toast";
import { useUpdateBio } from "@/hooks/profile/useProfile";

export function useBio() {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const MAX_CHARS = 500;

  const updateBioMutation = useUpdateBio(() => {
    router.push("/"); 
  });

  const handleFinish = () => {
    if (!bio || bio.trim().length === 0) {
      toast.error("النبذة التعريفية لا يمكن أن تكون فارغة");
      return;
    }
    if (bio.trim().length < 10) {
      toast.error("النبذة التعريفية يجب أن تكون 10 أحرف على الأقل");
      return;
    }
    updateBioMutation.mutate(bio);
  };

  return {
    bio,
    setBio,
    MAX_CHARS,
    isSubmitting: updateBioMutation.isPending,
    handleFinish,
    remainingChars: MAX_CHARS - bio.length,
    progressPercentage: (bio.length / MAX_CHARS) * 100
  };
}
