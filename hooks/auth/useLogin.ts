"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/auth";
import { loginSchema, type LoginFormData } from "@/lib/validation/loginSchema";
import { useAuthStore } from "@/stores/useAuthStore";
import { setCookie } from "@/utils/cookies";
import { toast } from "@/common/toast";

export function useLogin() {
  const router = useRouter();
 

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        setCookie("token", data.token, 7); // Set cookie for middleware
       
        useAuthStore.getState().setToken(data.token);
        toast.success("تم تسجيل الدخول بنجاح. مرحباً بك مجدداً!", "دخول ناجح");
      }
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message || "حدث خطأ أثناء تسجيل الدخول", "فشل الدخول");
      setError("root", {
        message: error.message || "فشل تسجيل الدخول. يرجى التحقق من بياناتك.",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isPending,
  };
}
