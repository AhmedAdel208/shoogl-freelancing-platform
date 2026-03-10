"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/lib/api/auth";
import { useTimer } from "@/hooks/useTimer";
import { toast } from "@/common/toast";
import { useOtpInput } from "@/hooks/auth/useOtpInput";
import { VerifyOtpData } from "@/types/auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { setCookie } from "@/utils/cookies";

export function useVerify() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const phoneNumber = searchParams.get("phone") || "";
  const email = searchParams.get("email") || "";
  const userRole = searchParams.get("type") || "";

  const {
    code,
    inputsRef,
    handleChange,
    handleKeyDown,
    handlePaste,
    clearCode,
    fullCode,
  } = useOtpInput({ length: 6 });

  const { timer, resetTimer } = useTimer(30);

  // Verification Mutation
  const verifyMutation = useMutation({
    mutationFn: async () => {
      if (fullCode.length !== 6) throw new Error("يرجى إدخال الرمز كاملاً");

      const verifyPayload: VerifyOtpData = { otpCode: fullCode };
      if (phoneNumber) verifyPayload.phoneNumber = phoneNumber;
      if (email) verifyPayload.email = email;

      return authService.verifyOtp(verifyPayload);
    },
    onSuccess: (response) => {
      const token = response.token;
      if (token) {
        
        localStorage.setItem("token", token)
        setCookie("token", token, 7);
        useAuthStore.getState().setToken(token);
      }

      if (userRole === "client") {
        toast.success("تم تفعيل حسابك بنجاح! مرحباً بك في شغل");
        router.replace("/workers");
      } else {
        router.replace("/onboarding/skills");
      }
    },
  });

  // Resend OTP Mutation
  const resendMutation = useMutation({
    mutationFn: async () => {
      const resendPayload: VerifyOtpData = {} as VerifyOtpData;
      if (phoneNumber) resendPayload.phoneNumber = phoneNumber;
      if (email) resendPayload.email = email;

      return authService.resendOtp(resendPayload);
    },
    onSuccess: () => {
      resetTimer(30);
      clearCode();
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "فشل التحقق من الرمز";
      toast.error(errorMessage);
    },
  });

  const handleVerify = () => {
    verifyMutation.mutate();
  };

  const handleResend = () => {
    if (timer > 0 || resendMutation.isPending) return;
    resendMutation.mutate();
  };

  return {
    // Data
    phoneNumber,
    email,
    code,
    timer,
    fullCode,
    error: (verifyMutation.error as Error)?.message || "",
    isLoading: verifyMutation.isPending || resendMutation.isPending,
    isPending: verifyMutation.isPending,
    isResending: resendMutation.isPending,

    // Actions
    inputsRef,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleVerify,
    handleResend,
  };
}
